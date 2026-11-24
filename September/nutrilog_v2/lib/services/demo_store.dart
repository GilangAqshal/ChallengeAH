import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

/// Penyimpanan lokal sementara untuk review UI sebelum backend Supabase dibuat.
/// Akun demo tetap: admin / admin.
class DemoStore {
  static const _loggedKey = 'nutrilog_demo_logged_in';
  static const _userKey = 'nutrilog_demo_username';
  static const _profileKey = 'nutrilog_demo_profile';
  static const _mealsKey = 'nutrilog_demo_meals';
  static const _waterKey = 'nutrilog_demo_water';

  static Future<bool> isLoggedIn() async =>
      (await SharedPreferences.getInstance()).getBool(_loggedKey) ?? false;

  static Future<void> login(String username) async {
    final p = await SharedPreferences.getInstance();
    await p.setBool(_loggedKey, true);
    await p.setString(_userKey, username);
    await p.setString(_profileKey, jsonEncode({
      'username': username, 'birth_date': '2000-01-01',
      'weight_kg': 60, 'height_cm': 165, 'gender': 'female',
      'goal': 'Maintain Weight', 'activity_level': 'Moderately Active',
      'daily_kcal_target': 2000, 'onboarded': true,
    }));
    if (!p.containsKey(_mealsKey)) await p.setString(_mealsKey, '[]');
    if (!p.containsKey(_waterKey)) await p.setString(_waterKey, '{}');
  }

  static Future<void> logout() async {
    final p = await SharedPreferences.getInstance();
    await p.setBool(_loggedKey, false);
  }

  static Future<Map<String, dynamic>> profile() async {
    final p = await SharedPreferences.getInstance();
    final raw = p.getString(_profileKey);
    if (raw == null) return {'username': p.getString(_userKey) ?? 'admin', 'daily_kcal_target': 2000};
    return Map<String, dynamic>.from(jsonDecode(raw));
  }

  static Future<void> saveProfile(Map<String, dynamic> profile) async {
    final p = await SharedPreferences.getInstance();
    await p.setString(_profileKey, jsonEncode(profile));
  }

  static Future<List<Map<String, dynamic>>> meals() async {
    final p = await SharedPreferences.getInstance();
    final raw = p.getString(_mealsKey) ?? '[]';
    return (jsonDecode(raw) as List).map((e) => Map<String, dynamic>.from(e)).toList();
  }

  static Future<void> saveMeals(List<Map<String, dynamic>> rows) async {
    final p = await SharedPreferences.getInstance();
    await p.setString(_mealsKey, jsonEncode(rows));
  }

  static Future<int> water(String date) async {
    final p = await SharedPreferences.getInstance();
    final values = jsonDecode(p.getString(_waterKey) ?? '{}') as Map<String, dynamic>;
    return (values[date] as num?)?.toInt() ?? 0;
  }

  static Future<void> addWater(int ml, String date) async {
    final p = await SharedPreferences.getInstance();
    final values = jsonDecode(p.getString(_waterKey) ?? '{}') as Map<String, dynamic>;
    values[date] = ((values[date] as num?)?.toInt() ?? 0) + ml;
    await p.setString(_waterKey, jsonEncode(values));
  }
}
