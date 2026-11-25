import 'dart:async';
import 'package:flutter/material.dart';
import '../services/services.dart';
import '../core/theme.dart';
import '../widgets/app_assets.dart';
import '../widgets/form_widgets.dart';

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
  void initState() { super.initState(); _query(''); }
  @override
  void dispose() { _debounce?.cancel(); _search.dispose(); super.dispose(); }
  Future<void> _query(String q) async { final r = await MealService.searchFoods(q); if (mounted) setState(() => _foods = r); }
  Future<void> _add(Map<String, dynamic> f) async { await MealService.addMeal(f['id'] as String, day: widget.day); if (mounted) showMsg(context, '${f['name']} ditambahkan'); }

  @override
  Widget build(BuildContext context) => Scaffold(
    backgroundColor: AppColors.pageBg,
    body: SafeArea(child: Column(children: [
      Padding(padding: const EdgeInsets.fromLTRB(20, 16, 20, 16), child: Row(children: [
        IconButton(onPressed: () => Navigator.pop(context), icon: const Icon(Icons.arrow_back_rounded)),
        const SizedBox(width: 4),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text('Add Meal', style: AppText.jakarta(21, weight: FontWeight.w800, color: AppColors.ink)), Text('Pilih makanan untuk dicatat hari ini', style: AppText.inter(11, color: AppColors.grey))])),
        const AppLogo(size: 32),
      ])),
      Padding(padding: const EdgeInsets.symmetric(horizontal: 18), child: Container(
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), boxShadow: const [BoxShadow(color: Color(0x0D20232B), blurRadius: 12, offset: Offset(0, 4))]),
        child: TextField(controller: _search, autofocus: false, onTapOutside: (_) => FocusManager.instance.primaryFocus?.unfocus(), onChanged: (v) { _debounce?.cancel(); _debounce = Timer(const Duration(milliseconds: 250), () => _query(v)); }, decoration: InputDecoration(prefixIcon: const Icon(Icons.search_rounded, color: AppColors.orangeDeep), hintText: 'Cari makanan...', hintStyle: AppText.inter(12, color: AppColors.hint), border: InputBorder.none, contentPadding: const EdgeInsets.symmetric(vertical: 15))),
      )),
      Padding(padding: const EdgeInsets.fromLTRB(20, 22, 20, 12), child: Row(children: [Text('Food suggestions', style: AppText.jakarta(15, weight: FontWeight.w800, color: AppColors.ink)), const Spacer(), Text('${_foods.length} pilihan', style: AppText.inter(10, color: AppColors.grey))])),
      Expanded(child: ListView.separated(
        keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
        padding: const EdgeInsets.fromLTRB(18, 0, 18, 24), itemCount: _foods.length,
        separatorBuilder: (_, __) => const SizedBox(height: 10),
        itemBuilder: (_, i) { final f = _foods[i]; return Container(padding: const EdgeInsets.all(13), decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(17), boxShadow: const [BoxShadow(color: Color(0x09000000), blurRadius: 10, offset: Offset(0, 3))]), child: Row(children: [
          Container(width: 44, height: 44, decoration: BoxDecoration(color: const Color(0xFFFFF0E6), borderRadius: BorderRadius.circular(14)), child: const Icon(Icons.restaurant_rounded, color: AppColors.orangeDeep)),
          const SizedBox(width: 12),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(f['name'], style: AppText.jakarta(13, weight: FontWeight.w700, color: AppColors.ink)), const SizedBox(height: 3), Text('${(f['kcal'] as num).round()} kcal • per 100 g', style: AppText.inter(10, color: AppColors.grey))])),
          InkWell(onTap: () => _add(f), borderRadius: BorderRadius.circular(12), child: Container(width: 36, height: 36, decoration: BoxDecoration(color: AppColors.orange, borderRadius: BorderRadius.circular(12)), child: const Icon(Icons.add_rounded, color: Colors.white))),
        ])); },
      )),
    ])),
  );
}
