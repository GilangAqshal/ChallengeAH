import 'package:flutter/material.dart';

import '../services/services.dart';
import '../core/theme.dart';
import '../widgets/form_widgets.dart';
import '../widgets/nutrition_widgets.dart';
import 'add_meal_screen.dart';

class HomeScreen extends StatefulWidget {
  final ValueNotifier<int> reload;
  const HomeScreen({super.key, required this.reload});
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  Map<String, dynamic>? _profile;
  List<MealEntry> _meals = [];
  int _water = 0;
  bool _loading = true;

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
    final today = DateTime.now();
    final results = await Future.wait([
      ProfileService.myProfile(),
      MealService.mealsOn(today),
      MealService.waterOn(today),
    ]);
    if (!mounted) return;
    setState(() {
      _profile = results[0] as Map<String, dynamic>?;
      _meals = results[1] as List<MealEntry>;
      _water = results[2] as int;
      _loading = false;
    });
  }

  Future<void> _addMeal() async {
    await Navigator.push(context, MaterialPageRoute(builder: (_) => const AddMealScreen()));
    _load();
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Center(child: CircularProgressIndicator(color: AppColors.orange));
    }
    final target = ((_profile?['daily_kcal_target'] ?? 2800) as num).toDouble();
    final k = target / 2800; // target makro dari Figma (120/70/400 g) diskalakan ke kebutuhan kalori
    final t = DayTotals.of(_meals);
    final name = (_profile?['username'] ?? '') as String;

    return Container(
      color: AppColors.pageBg,
      child: SafeArea(
      bottom: false,
      child: RefreshIndicator(
        color: AppColors.orange,
        onRefresh: _load,
        child: ListView(physics: const AlwaysScrollableScrollPhysics(), keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag, padding: const EdgeInsets.fromLTRB(20, 18, 20, 28), children: [
          // Header: avatar, Welcome + nama, lonceng
          Row(children: [
            const CircleAvatar(
              radius: 31,
              backgroundColor: Color(0xFFE8E6E2),
              child: Icon(Icons.person, size: 44, color: Color(0xFFBDB9B2)),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text('Welcome', style: AppText.kurale(16, color: const Color(0x80000000))),
                Text(name, style: AppText.kurale(19)),
              ]),
            ),
            Container(
              width: 38,
              height: 38,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.orange),
              ),
              child: Stack(alignment: Alignment.center, children: [
                const Icon(Icons.notifications_none, size: 22, color: Color(0xFF1B1F4B)),
                Positioned(
                  right: 4,
                  top: 4,
                  child: Container(
                      width: 9,
                      height: 9,
                      decoration: const BoxDecoration(color: Colors.red, shape: BoxShape.circle)),
                ),
              ]),
            ),
          ]),
          const SizedBox(height: 24),
          Container(padding: const EdgeInsets.symmetric(vertical: 18), decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), boxShadow: const [BoxShadow(color: Color(0x0D20232B), blurRadius: 16, offset: Offset(0, 6))]), child: Center(child: KcalArc(consumed: t.kcal, target: target))),
          const SizedBox(height: 18),
          Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            MacroBar(label: 'Protein', caption: '${t.protein.round()}/${(120 * k).round()}g', value: t.protein, max: 120 * k, color: AppColors.protein, width: 65),
            MacroBar(label: 'Fats', caption: '${t.fat.round()}/${(70 * k).round()}g', value: t.fat, max: 70 * k, color: AppColors.fats, width: 65),
            MacroBar(label: 'Carbs', caption: '${t.carbs.round()}/${(400 * k).round()}g', value: t.carbs, max: 400 * k, color: AppColors.carbs, width: 65),
            MacroBar(label: 'Water', caption: '$_water/2500ml', value: _water.toDouble(), max: 2500, color: AppColors.water, width: 75),
          ]),
          const SizedBox(height: 26),
          SectionAddTitle(title: 'Add Meals', onTap: _addMeal),
          const SizedBox(height: 14),
          if (_meals.isEmpty)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 24),
              child: Center(
                  child: Text('Belum ada makanan hari ini.\nTap + untuk menambah.',
                      textAlign: TextAlign.center,
                      style: AppText.montserrat(12, color: AppColors.mutedText))),
            ),
          for (var i = 0; i < _meals.length; i++)
            MealCard(
              index: i + 1,
              meal: _meals[i],
              onLongPress: () async {
                await MealService.deleteMeal(_meals[i].id);
                _load();
              },
            ),
          SectionAddTitle(
            title: 'Add Water',
            onTap: () async {
              await MealService.addWater(250);
              _load();
              if (mounted) showMsg(context, '+250 ml air');
            },
          ),
          const SizedBox(height: 18),
          Container(
            height: 90,
            margin: EdgeInsets.zero,
            padding: const EdgeInsets.symmetric(horizontal: 12),
            decoration: BoxDecoration(
              color: AppColors.cardBg,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: const Color(0xFFAEDEE6)),
            ),
            child: Row(children: [
              const Icon(Icons.water_drop, color: AppColors.water, size: 34),
              const SizedBox(width: 12),
              Expanded(
                child: Column(mainAxisAlignment: MainAxisAlignment.center, crossAxisAlignment: CrossAxisAlignment.start, children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(2),
                    child: LinearProgressIndicator(
                      value: (_water / 2500).clamp(0.0, 1.0),
                      minHeight: 4,
                      backgroundColor: AppColors.track,
                      color: AppColors.water,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(_water >= 2500 ? 'Target tercapai!' : 'Long way to go. Keep it up!',
                      style: AppText.montserrat(12)),
                ]),
              ),
              Text('${(_water / 1000).toStringAsFixed(1)}L',
                  style: AppText.poppins(16, color: const Color(0xB3000000), letterSpacing: .32)),
            ]),
          ),
        ]),
      ),
    ),
    );
  }
}
