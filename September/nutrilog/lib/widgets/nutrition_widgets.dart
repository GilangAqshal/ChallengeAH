import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../services/services.dart';
import '../core/theme.dart';

/// Busur setengah lingkaran kalori (Home) - diameter 224 seperti di Figma.
class KcalArc extends StatelessWidget {
  final double consumed, target;
  const KcalArc({super.key, required this.consumed, required this.target});

  @override
  Widget build(BuildContext context) {
    final p = target <= 0 ? 0.0 : (consumed / target).clamp(0.0, 1.0);
    return SizedBox(
      width: 224,
      height: 140,
      child: Stack(alignment: Alignment.topCenter, children: [
        CustomPaint(size: const Size(224, 112), painter: _ArcPainter(p)),
        Positioned(
          top: 28,
          child: Column(children: [
            const Icon(Icons.local_fire_department, color: AppColors.orange, size: 36),
            Text('${consumed.round()}Kcal', style: AppText.montserrat(16)),
            Text('of ${target.round()} kcal',
                style: AppText.montserrat(16, color: const Color(0x33000000))),
          ]),
        ),
      ]),
    );
  }
}

class _ArcPainter extends CustomPainter {
  final double progress;
  _ArcPainter(this.progress);

  @override
  void paint(Canvas canvas, Size size) {
    const stroke = 22.0;
    final rect = Rect.fromCircle(
        center: Offset(size.width / 2, size.height), radius: size.width / 2 - stroke / 2);
    final track = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke
      ..strokeCap = StrokeCap.round
      ..color = AppColors.arcTrack;
    canvas.drawArc(rect, math.pi, math.pi, false, track);
    if (progress > 0) {
      canvas.drawArc(rect, math.pi, math.pi * progress, false, track..color = AppColors.arcProgress);
      final a = math.pi + math.pi * progress;
      final c = Offset(rect.center.dx + rect.width / 2 * math.cos(a),
          rect.center.dy + rect.height / 2 * math.sin(a));
      canvas.drawCircle(c, 7, Paint()..color = Colors.white);
    }
  }

  @override
  bool shouldRepaint(_ArcPainter old) => old.progress != progress;
}

/// Cincin penuh (layar Activity).
class KcalRing extends StatelessWidget {
  final double consumed, target;
  const KcalRing({super.key, required this.consumed, required this.target});

  @override
  Widget build(BuildContext context) {
    final p = target <= 0 ? 0.0 : (consumed / target).clamp(0.0, 1.0);
    return SizedBox(
      width: 122,
      height: 122,
      child: Stack(alignment: Alignment.center, children: [
        SizedBox(
          width: 122,
          height: 122,
          child: CircularProgressIndicator(
            value: 1,
            strokeWidth: 12,
            color: AppColors.arcTrack,
          ),
        ),
        SizedBox(
          width: 122,
          height: 122,
          child: CircularProgressIndicator(
            value: p,
            strokeWidth: 12,
            strokeCap: StrokeCap.round,
            color: AppColors.arcProgress,
          ),
        ),
        Column(mainAxisSize: MainAxisSize.min, children: [
          const Icon(Icons.local_fire_department, color: AppColors.orange, size: 26),
          Text('${consumed.round()}/${target.round()}\nkcal',
              textAlign: TextAlign.center,
              style: AppText.montserrat(10, color: AppColors.mutedText)),
        ]),
      ]),
    );
  }
}

/// Satu kolom makro: label, bar tipis, "49/120g".
class MacroBar extends StatelessWidget {
  final String label, caption;
  final double value, max;
  final Color color;
  final double width;
  const MacroBar(
      {super.key,
      required this.label,
      required this.caption,
      required this.value,
      required this.max,
      required this.color,
      this.width = 68});

  @override
  Widget build(BuildContext context) {
    final p = max <= 0 ? 0.0 : (value / max).clamp(0.0, 1.0);
    return SizedBox(
      width: width,
      child: Column(children: [
        Text(label, style: AppText.montserrat(14, weight: FontWeight.w600)),
        const SizedBox(height: 6),
        ClipRRect(
          borderRadius: BorderRadius.circular(3),
          child: Stack(children: [
            Container(height: 4, color: AppColors.track),
            FractionallySizedBox(
                widthFactor: p, child: Container(height: 4, color: color)),
          ]),
        ),
        const SizedBox(height: 6),
        Text(caption, style: AppText.montserrat(12, weight: FontWeight.w500, color: AppColors.mutedText)),
      ]),
    );
  }
}

/// Kartu "1. Boiled Egg..." dengan border oranye 1px dan tiga bar vertikal.
class MealCard extends StatelessWidget {
  final int index;
  final MealEntry meal;
  final VoidCallback? onLongPress;
  const MealCard({super.key, required this.index, required this.meal, this.onLongPress});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onLongPress: onLongPress,
      child: Container(
        width: double.infinity,
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(18),
          border: Border.all(color: const Color(0xFFFFE1CF)),
          boxShadow: const [BoxShadow(color: Color(0x0D20232B), blurRadius: 14, offset: Offset(0, 5))],
        ),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Container(width: 36, height: 36, decoration: BoxDecoration(color: const Color(0xFFFFF0E7), borderRadius: BorderRadius.circular(12)), child: const Icon(Icons.restaurant_rounded, color: AppColors.orangeDeep, size: 19)),
            const SizedBox(width: 10),
            Expanded(child: Text(meal.name, maxLines: 1, overflow: TextOverflow.ellipsis, style: AppText.jakarta(14, weight: FontWeight.w700, color: AppColors.ink))),
            Text('${meal.kcal.round()} kcal', style: AppText.jakarta(13, weight: FontWeight.w800, color: AppColors.orangeDeep)),
          ]),
          const SizedBox(height: 14),
          Row(children: [
            Expanded(child: _macroTile('Protein', meal.protein, AppColors.protein)),
            const SizedBox(width: 8),
            Expanded(child: _macroTile('Fat', meal.fat, AppColors.fats)),
            const SizedBox(width: 8),
            Expanded(child: _macroTile('Carbs', meal.carbs, AppColors.carbs)),
          ]),
          const SizedBox(height: 6),
          Text('Tekan dan tahan untuk menghapus makanan', style: AppText.inter(10, color: AppColors.hint)),
        ]),
      ),
    );
  }

  Widget _macroTile(String label, double value, Color color) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 8),
    decoration: BoxDecoration(color: const Color(0xFFFFFAF6), borderRadius: BorderRadius.circular(11)),
    child: Row(children: [
      Container(width: 7, height: 7, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
      const SizedBox(width: 6),
      Expanded(child: Text(label, style: AppText.inter(10, color: AppColors.grey))),
      Text('${value.round()}g', style: AppText.jakarta(11, weight: FontWeight.w800, color: AppColors.ink)),
    ]),
  );
}

/// Judul seksi dengan tombol + bulat oranye ("Add Meals", "Add Water").
class SectionAddTitle extends StatelessWidget {
  final String title;
  final VoidCallback onTap;
  const SectionAddTitle({super.key, required this.title, required this.onTap});

  @override
  Widget build(BuildContext context) => GestureDetector(
        onTap: onTap,
        child: Row(children: [
          const SizedBox(width: 11),
          Container(
            width: 30,
            height: 30,
            decoration: const BoxDecoration(color: AppColors.orange, shape: BoxShape.circle),
            child: const Icon(Icons.add, color: Colors.white, size: 22),
          ),
          const SizedBox(width: 10),
          Text(title, style: AppText.kurale(32)),
        ]),
      );
}
