import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../core/supabase_service.dart';
import '../core/theme.dart';
import '../widgets/form_widgets.dart';
import 'shell_screen.dart';

class PersonalDataScreen extends StatefulWidget {
  const PersonalDataScreen({super.key});
  @override
  State<PersonalDataScreen> createState() => _PersonalDataScreenState();
}

class _PersonalDataScreenState extends State<PersonalDataScreen> {
  final _weight = TextEditingController();
  final _height = TextEditingController();
  String? _activity, _goal, _gender;
  bool _loading = false;

  static const activities = ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'];
  static const goals = ['Lose Weight', 'Maintain Weight', 'Gain Weight'];

  Future<void> _next() async {
    final w = double.tryParse(_weight.text.replaceAll(',', '.'));
    final h = double.tryParse(_height.text.replaceAll(',', '.'));
    if (w == null || h == null || _activity == null || _goal == null || _gender == null) {
      return showMsg(context, 'Lengkapi semua data');
    }
    setState(() => _loading = true);
    try {
      final profile = await ProfileService.myProfile();
      final birth = DateTime.tryParse('${profile?['birth_date']}') ?? DateTime(2000);
      final now = DateTime.now();
      var age = now.year - birth.year;
      if (now.month < birth.month || (now.month == birth.month && now.day < birth.day)) age--;

      await ProfileService.savePersonalData(
        weightKg: w,
        heightCm: h,
        activityLevel: _activity!,
        goal: _goal!,
        gender: _gender!,
        dailyKcal: ProfileService.calcDailyKcal(
            weightKg: w, heightCm: h, age: age, gender: _gender!, activityLevel: _activity!, goal: _goal!),
      );
      if (!mounted) return;
      Navigator.of(context)
          .pushReplacement(MaterialPageRoute(builder: (_) => const ShellScreen()));
    } on PostgrestException catch (e) {
      if (mounted) showMsg(context, e.message);
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return AuthScaffold(
      blueTone: true,
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Center(child: Text('Personal Data', style: AppText.montserrat(32, weight: FontWeight.w700, color: AppColors.title))),
        const SizedBox(height: 22),
        AppTextField(label: 'Weight (KG)', hint: '...Kg', controller: _weight, keyboardType: TextInputType.number),
        const SizedBox(height: 14),
        AppTextField(label: 'Height (CM)', hint: '...Cm', controller: _height, keyboardType: TextInputType.number),
        const SizedBox(height: 14),
        AppDropdown(label: 'Level Activity', items: activities, value: _activity, onChanged: (v) => setState(() => _activity = v)),
        const SizedBox(height: 14),
        AppDropdown(label: 'Goals', items: goals, value: _goal, onChanged: (v) => setState(() => _goal = v)),
        const SizedBox(height: 14),
        Text('Gender', style: AppText.jakarta(12)),
        const SizedBox(height: 6),
        Row(children: [
          _radio('female', 'Female'),
          const SizedBox(width: 30),
          _radio('male', 'Male'),
        ]),
        const SizedBox(height: 20),
        OrangeButton(text: 'Next', onPressed: _next, loading: _loading),
      ]),
    );
  }

  Widget _radio(String value, String label) => GestureDetector(
        onTap: () => setState(() => _gender = value),
        child: Row(children: [
          Container(
            width: 22,
            height: 22,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: AppColors.orange, width: 1.5),
            ),
            child: _gender == value
                ? Center(
                    child: Container(
                        width: 12,
                        height: 12,
                        decoration: const BoxDecoration(color: AppColors.orange, shape: BoxShape.circle)))
                : null,
          ),
          const SizedBox(width: 6),
          Text(label, style: AppText.montserrat(12, weight: FontWeight.w500, color: AppColors.grey)),
        ]),
      );
}
