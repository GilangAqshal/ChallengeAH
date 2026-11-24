/// Satu makanan yang dimakan, nutrisinya sudah dikali porsi (gram / 100).
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
