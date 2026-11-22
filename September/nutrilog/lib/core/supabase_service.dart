import 'package:intl/intl.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

/// Ganti dengan nilai dari Supabase Dashboard > Project Settings > API.
const supabaseUrl = 'https://GANTI-DENGAN-PROJECT-ID.supabase.co';
const supabaseAnonKey = 'GANTI-DENGAN-ANON-KEY';

/// Deep link untuk OAuth (Google/Facebook). Harus sama dengan di AndroidManifest/Info.plist
/// dan didaftarkan di Supabase > Authentication > URL Configuration > Redirect URLs.
const oauthRedirect = 'io.supabase.nutrilog://login-callback/';

SupabaseClient get db => Supabase.instance.client;

String dateKey(DateTime d) => DateFormat('yyyy-MM-dd').format(d);

class AuthService {
  /// Desain login memakai USERNAME. Supabase Auth memakai email, jadi username
  /// diterjemahkan ke email lewat fungsi SQL `get_email_by_username`.
  static Future<void> loginWithUsername(String username, String password) async {
    final email = await db
        .rpc('get_email_by_username', params: {'p_username': username.trim()});
    if (email == null) {
      throw const AuthException('Username tidak ditemukan');
    }
    await db.auth.signInWithPassword(email: email as String, password: password);
  }

  static Future<void> signUp({
    required String username,
    required String email,
    required String password,
    required DateTime birthDate,
    required String phone,
  }) async {
    await db.auth.signUp(
      email: email.trim(),
      password: password,
      // Trigger `handle_new_user` di schema.sql memindahkan ini ke tabel profiles.
      data: {
        'username': username.trim(),
        'birth_date': dateKey(birthDate),
        'phone': phone.trim(),
      },
    );
  }

  static Future<void> signInWithGoogle() =>
      db.auth.signInWithOAuth(OAuthProvider.google, redirectTo: oauthRedirect);

  static Future<void> signInWithFacebook() =>
      db.auth.signInWithOAuth(OAuthProvider.facebook, redirectTo: oauthRedirect);

  // Alur Forgot Password -> Verify Code -> Change Password
  static Future<void> sendResetCode(String email) =>
      db.auth.resetPasswordForEmail(email.trim());

  static Future<void> verifyResetCode(String email, String code) =>
      db.auth.verifyOTP(email: email.trim(), token: code, type: OtpType.recovery);

  static Future<void> changePassword(String newPassword) =>
      db.auth.updateUser(UserAttributes(password: newPassword));

  static Future<void> logout() => db.auth.signOut();
}

class ProfileService {
  static Future<Map<String, dynamic>?> myProfile() async {
    final uid = db.auth.currentUser?.id;
    if (uid == null) return null;
    return db.from('profiles').select().eq('id', uid).maybeSingle();
  }

  static Future<void> savePersonalData({
    required double weightKg,
    required double heightCm,
    required String activityLevel,
    required String goal,
    required String gender,
    required int dailyKcal,
  }) async {
    final uid = db.auth.currentUser!.id;
    await db.from('profiles').update({
      'weight_kg': weightKg,
      'height_cm': heightCm,
      'activity_level': activityLevel,
      'goal': goal,
      'gender': gender,
      'daily_kcal_target': dailyKcal,
      'onboarded': true,
    }).eq('id', uid);
  }

  /// Rumus Mifflin-St Jeor x faktor aktivitas, disesuaikan tujuan.
  static int calcDailyKcal({
    required double weightKg,
    required double heightCm,
    required int age,
    required String gender,
    required String activityLevel,
    required String goal,
  }) {
    final bmr = 10 * weightKg +
        6.25 * heightCm -
        5 * age +
        (gender == 'male' ? 5 : -161);
    const factors = {
      'Sedentary': 1.2,
      'Lightly Active': 1.375,
      'Moderately Active': 1.55,
      'Very Active': 1.725,
    };
    var tdee = bmr * (factors[activityLevel] ?? 1.2);
    if (goal == 'Lose Weight') tdee -= 500;
    if (goal == 'Gain Weight') tdee += 500;
    return tdee.round();
  }
}

class MealService {
  static Future<List<Map<String, dynamic>>> searchFoods(String query) async {
    final q = db.from('foods').select();
    final res = query.trim().isEmpty
        ? await q.order('name').limit(30)
        : await q.ilike('name', '%${query.trim()}%').order('name').limit(30);
    return List<Map<String, dynamic>>.from(res);
  }

  static Future<void> addMeal(String foodId, {double grams = 100, DateTime? day}) async {
    await db.from('meal_logs').insert({
      'user_id': db.auth.currentUser!.id,
      'food_id': foodId,
      'grams': grams,
      'eaten_on': dateKey(day ?? DateTime.now()),
    });
  }

  static Future<void> deleteMeal(String id) =>
      db.from('meal_logs').delete().eq('id', id);

  /// Daftar makanan yang dimakan pada [day], lengkap dengan nutrisi yang sudah
  /// dikalikan porsi (grams / 100).
  static Future<List<MealEntry>> mealsOn(DateTime day) async {
    final rows = await db
        .from('meal_logs')
        .select('id, grams, foods(name, kcal, protein, fat, carbs)')
        .eq('user_id', db.auth.currentUser!.id)
        .eq('eaten_on', dateKey(day))
        .order('created_at');
    return (rows as List).map((r) => MealEntry.fromRow(r)).toList();
  }

  static Future<int> waterOn(DateTime day) async {
    final rows = await db
        .from('water_logs')
        .select('ml')
        .eq('user_id', db.auth.currentUser!.id)
        .eq('logged_on', dateKey(day));
    return (rows as List).fold<int>(0, (s, r) => s + (r['ml'] as int));
  }

  static Future<void> addWater(int ml, {DateTime? day}) async {
    await db.from('water_logs').insert({
      'user_id': db.auth.currentUser!.id,
      'ml': ml,
      'logged_on': dateKey(day ?? DateTime.now()),
    });
  }
}

class MealEntry {
  final String id;
  final String name;
  final double kcal, protein, fat, carbs;

  MealEntry(this.id, this.name, this.kcal, this.protein, this.fat, this.carbs);

  factory MealEntry.fromRow(Map<String, dynamic> r) {
    final f = r['foods'] as Map<String, dynamic>;
    final k = ((r['grams'] as num).toDouble()) / 100;
    double n(String key) => ((f[key] as num).toDouble()) * k;
    return MealEntry(
        r['id'] as String, f['name'] as String, n('kcal'), n('protein'), n('fat'), n('carbs'));
  }
}

class DayTotals {
  final double kcal, protein, fat, carbs;
  DayTotals(this.kcal, this.protein, this.fat, this.carbs);

  factory DayTotals.of(List<MealEntry> meals) => DayTotals(
        meals.fold(0.0, (s, m) => s + m.kcal),
        meals.fold(0.0, (s, m) => s + m.protein),
        meals.fold(0.0, (s, m) => s + m.fat),
        meals.fold(0.0, (s, m) => s + m.carbs),
      );
}
