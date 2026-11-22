import 'package:flutter/material.dart';

import '../core/supabase_service.dart';
import '../core/theme.dart';
import '../widgets/nutrition_widgets.dart';
import 'add_meal_screen.dart';

/// "Daily Nutrition": deret tanggal, ringkasan makro + cincin kalori, daftar makanan.
class ActivityScreen extends StatefulWidget {
  final ValueNotifier<int> reload;
  const ActivityScreen({super.key, required this.reload});
  @override
  State<ActivityScreen> createState() => _ActivityScreenState();
}

class _ActivityScreenState extends State<ActivityScreen> {
  DateTime _day = DateTime.now();
  List<MealEntry> _meals = [];
  int _water = 0;
  double _target = 2800;

  static const _months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  @override
  void initState() {
    super.initState();
    widget.reload.addListener(_load);
    _load();
  }

  @override
  void dispose() {
    widget.reload.removeListener(_load);
    super.dispose();
  }

  Future<void> _load() async {
    final r = await Future.wait([
      MealService.mealsOn(_day),
      MealService.waterOn(_day),
      ProfileService.myProfile(),
    ]);
    if (!mounted) return;
    setState(() {
      _meals = r[0] as List<MealEntry>;
      _water = r[1] as int;
      _target = (((r[2] as Map<String, dynamic>?)?['daily_kcal_target'] ?? 2800) as num).toDouble();
    });
  }

  @override
  Widget build(BuildContext context) {
    final t = DayTotals.of(_meals);
    final k = _target / 2800;
    final today = DateTime.now();
    // 7 hari terakhir sampai hari ini + 1 hari ke depan, seperti strip tanggal di Figma.
    final days = List.generate(9, (i) => DateTime(today.year, today.month, today.day).subtract(Duration(days: 7 - i)));

    return SafeArea(
      bottom: false,
      child: ListView(padding: const EdgeInsets.fromLTRB(0, 20, 0, 24), children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 37),
          child: Text('Daily\nNutrition', style: AppText.montserrat(24, weight: FontWeight.w700).copyWith(height: 1.15)),
        ),
        const SizedBox(height: 18),
        SizedBox(
          height: 66,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            reverse: true, // mulai dari hari terbaru
            padding: const EdgeInsets.symmetric(horizontal: 30),
            itemCount: days.length,
            separatorBuilder: (_, __) => const SizedBox(width: 14),
            itemBuilder: (_, idx) {
              final d = days[days.length - 1 - idx];
              final sel = dateKey(d) == dateKey(_day);
              return GestureDetector(
                onTap: () {
                  setState(() => _day = d);
                  _load();
                },
                child: Container(
                  width: 68,
                  decoration: BoxDecoration(
                    color: sel ? AppColors.fats : const Color(0xFFF1F1F1),
                    borderRadius: BorderRadius.circular(12),
                    border: sel ? Border.all(color: const Color(0xFFF9B7A8), width: 3) : null,
                  ),
                  child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                    Text(_months[d.month - 1],
                        style: AppText.montserrat(18, weight: FontWeight.w700, color: sel ? Colors.white : const Color(0xFF5B5B5B))),
                    Text('${d.day}',
                        style: AppText.montserrat(18, weight: FontWeight.w700, color: sel ? Colors.white : const Color(0xFFB0B0B0))),
                  ]),
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 22),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 22),
          child: Row(children: [
            Expanded(
              child: Wrap(runSpacing: 22, spacing: 18, children: [
                MacroBar(label: 'Protein', caption: '${t.protein.round()}/${(120 * k).round()}g', value: t.protein, max: 120 * k, color: AppColors.protein, width: 70),
                MacroBar(label: 'Carbs', caption: '${t.carbs.round()}/${(400 * k).round()}g', value: t.carbs, max: 400 * k, color: AppColors.carbs, width: 70),
                MacroBar(label: 'Fats', caption: '${t.fat.round()}/${(70 * k).round()}g', value: t.fat, max: 70 * k, color: AppColors.fats, width: 70),
                MacroBar(label: 'Water', caption: '$_water/2500ml', value: _water.toDouble(), max: 2500, color: AppColors.water, width: 75),
              ]),
            ),
            KcalRing(consumed: t.kcal, target: _target),
          ]),
        ),
        const SizedBox(height: 26),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 23),
          child: Column(children: [
            for (var i = 0; i < _meals.length; i++)
              MealCard(
                index: i + 1,
                meal: _meals[i],
                onLongPress: () async {
                  await MealService.deleteMeal(_meals[i].id);
                  _load();
                },
              ),
            TextButton.icon(
              onPressed: () async {
                await Navigator.push(
                    context, MaterialPageRoute(builder: (_) => AddMealScreen(day: _day)));
                _load();
              },
              icon: const Icon(Icons.add_circle, color: AppColors.orange),
              label: Text('Add meal for this day', style: AppText.montserrat(13, color: AppColors.orange)),
            ),
          ]),
        ),
      ]),
    );
  }
}
