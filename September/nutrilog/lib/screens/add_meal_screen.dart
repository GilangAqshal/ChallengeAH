import 'dart:async';
import 'package:flutter/material.dart';

import '../services/services.dart';
import '../core/theme.dart';
import '../widgets/app_assets.dart';
import '../widgets/form_widgets.dart';

/// Layar "Add Meals": X, logo, kolom Search Food, daftar Suggestions dengan tombol +.
class AddMealScreen extends StatefulWidget {
  final DateTime? day;
  const AddMealScreen({super.key, this.day});
  @override
  State<AddMealScreen> createState() => _AddMealScreenState();
}

class _AddMealScreenState extends State<AddMealScreen> {
  final _search = TextEditingController();
  List<Map<String, dynamic>> _foods = [];
  Timer? _debounce;

  @override
  void initState() {
    super.initState();
    _query('');
  }

  Future<void> _query(String q) async {
    final r = await MealService.searchFoods(q);
    if (mounted) setState(() => _foods = r);
  }

  Future<void> _add(Map<String, dynamic> f) async {
    await MealService.addMeal(f['id'] as String, day: widget.day);
    if (mounted) showMsg(context, '${f['name']} ditambahkan');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(18, 12, 18, 0),
            child: Row(children: [
              InkWell(onTap: () => Navigator.pop(context), child: Text('X', style: AppText.montserrat(20))),
              const Spacer(),
              const AppLogo(size: 34),
              const Spacer(),
              const SizedBox(width: 14),
            ]),
          ),
          const SizedBox(height: 30),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 48),
            child: Container(
              height: 46,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(10),
                boxShadow: const [BoxShadow(color: Color(0x40000000), blurRadius: 4, offset: Offset(0, 4))],
              ),
              child: TextField(
                controller: _search,
                onChanged: (v) {
                  _debounce?.cancel();
                  _debounce = Timer(const Duration(milliseconds: 300), () => _query(v));
                },
                style: AppText.montserrat(14),
                decoration: InputDecoration(
                  hintText: 'Search Food',
                  hintStyle: AppText.montserrat(14, color: AppColors.hint),
                  border: InputBorder.none,
                  contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 13),
                ),
              ),
            ),
          ),
          const SizedBox(height: 28),
          const Divider(height: 1, color: Color(0xFFBDBDBD)),
          Align(
            alignment: Alignment.centerLeft,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(18, 24, 18, 12),
              child: Text('Suggestions', style: AppText.montserrat(14)),
            ),
          ),
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(horizontal: 18),
              itemCount: _foods.length,
              separatorBuilder: (_, __) => const SizedBox(height: 10),
              itemBuilder: (_, i) {
                final f = _foods[i];
                return Container(
                  height: 54,
                  padding: const EdgeInsets.only(left: 11, right: 9),
                  decoration: BoxDecoration(
                    color: const Color(0xFFEEEEEE),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: Row(children: [
                    Expanded(
                      child: Column(mainAxisAlignment: MainAxisAlignment.center, crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(f['name'], style: AppText.montserrat(14)),
                        Text('${(f['kcal'] as num).round()}cal, 100g',
                            style: AppText.montserrat(13, color: AppColors.mutedText)),
                      ]),
                    ),
                    InkWell(
                      onTap: () => _add(f),
                      child: Container(
                        width: 30,
                        height: 30,
                        decoration: const BoxDecoration(color: AppColors.orange, shape: BoxShape.circle),
                        child: const Icon(Icons.add, color: Colors.white, size: 20),
                      ),
                    ),
                  ]),
                );
              },
            ),
          ),
        ]),
      ),
    );
  }
}
