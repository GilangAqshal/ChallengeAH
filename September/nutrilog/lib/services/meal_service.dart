import '../models/meal.dart';
import 'demo_store.dart';
import 'supabase_client.dart';

class MealService {
  static const _foods = <Map<String, dynamic>>[
    {'id':'rice','name':'White Rice','kcal':130,'protein':2.7,'fat':0.3,'carbs':28.2},
    {'id':'egg','name':'Boiled Egg','kcal':155,'protein':13,'fat':11,'carbs':1.1},
    {'id':'chicken','name':'Grilled Chicken','kcal':165,'protein':31,'fat':3.6,'carbs':0},
    {'id':'banana','name':'Banana','kcal':89,'protein':1.1,'fat':0.3,'carbs':22.8},
    {'id':'oat','name':'Oatmeal','kcal':68,'protein':2.4,'fat':1.4,'carbs':12},
    {'id':'tempeh','name':'Tempeh','kcal':193,'protein':20.3,'fat':10.8,'carbs':7.6},
  ];

  static Future<List<Map<String, dynamic>>> searchFoods(String query) async =>
      _foods.where((f) => f['name'].toString().toLowerCase().contains(query.trim().toLowerCase())).toList();

  static Future<void> addMeal(String foodId, {double grams = 100, DateTime? day}) async {
    final food = _foods.firstWhere((f) => f['id'] == foodId);
    final rows = await DemoStore.meals();
    rows.add({'id': DateTime.now().microsecondsSinceEpoch.toString(), 'food_id': foodId, 'name': food['name'],
      'kcal': food['kcal'], 'protein': food['protein'], 'fat': food['fat'],
      'carbs': food['carbs'], 'grams': grams,
      'eaten_on': dateKey(day ?? DateTime.now())});
    await DemoStore.saveMeals(rows);
  }

  static Future<void> deleteMeal(String id) async {
    final rows = await DemoStore.meals();
    rows.removeWhere((r) => r['id'] == id);
    await DemoStore.saveMeals(rows);
  }

  static Future<List<MealEntry>> mealsOn(DateTime day) async {
    final rows = await DemoStore.meals();
    return rows.where((r) => r['eaten_on'] == dateKey(day)).map((r) {
      final factor = (r['grams'] as num).toDouble() / 100;
      return MealEntry(r['id'].toString(), r['name'].toString(),
        (r['kcal'] as num).toDouble()*factor,
        (r['protein'] as num).toDouble()*factor,
        (r['fat'] as num).toDouble()*factor,
        (r['carbs'] as num).toDouble()*factor);
    }).toList();
  }

  static Future<int> waterOn(DateTime day) => DemoStore.water(dateKey(day));
  static Future<void> addWater(int ml, {DateTime? day}) =>
      DemoStore.addWater(ml, dateKey(day ?? DateTime.now()));
}
