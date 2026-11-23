import 'demo_store.dart';

class ProfileService {
  static Future<Map<String, dynamic>?> myProfile() async => DemoStore.profile();

  static Future<void> savePersonalData({required double weightKg, required double heightCm,
    required String activityLevel, required String goal, required String gender,
    required int dailyKcal}) async {
    final p = await DemoStore.profile();
    p.addAll({'weight_kg': weightKg, 'height_cm': heightCm,
      'activity_level': activityLevel, 'goal': goal, 'gender': gender,
      'daily_kcal_target': dailyKcal, 'onboarded': true});
    await DemoStore.saveProfile(p);
  }

  static int calcDailyKcal({required double weightKg, required double heightCm,
    required int age, required String gender, required String activityLevel,
    required String goal}) {
    final bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + (gender == 'male' ? 5 : -161);
    const factors = {'Sedentary': 1.2, 'Lightly Active': 1.375,
      'Moderately Active': 1.55, 'Very Active': 1.725};
    var tdee = bmr * (factors[activityLevel] ?? 1.2);
    if (goal == 'Lose Weight') tdee -= 500;
    if (goal == 'Gain Weight') tdee += 500;
    return tdee.round();
  }
}
