import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../core/supabase_service.dart';
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
        height: 148,
        margin: const EdgeInsets.only(bottom: 20),
        decoration: BoxDecoration(
          color: AppColors.cardBg,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: AppColors.orangeBorder),
        ),
        child: Stack(children: [
          Positioned(left: 15, top: 8, child: Text('$index.', style: AppText.kurale(32))),
          Positioned(
            left: 47,
            top: 10,
            right: 60,
            child: Text(meal.name, style: AppText.montserrat(14), maxLines: 2, overflow: TextOverflow.ellipsis),
          ),
          Positioned(left: 26, top: 64, child: _macro(meal.protein, 'Protein', AppColors.protein, 30, 16)),
          Positioned(left: 156, top: 64, child: _macro(meal.fat, 'Fats', AppColors.fats, 20, 14)),
          Positioned(left: 254, top: 64, child: _macro(meal.carbs, 'Carbs', AppColors.carbs, 40, 14)),
          Positioned(
            left: 12,
            top: 120,
            child: Row(children: [
              const Icon(Icons.local_fire_department, size: 16, color: AppColors.orange),
              const SizedBox(width: 2),
              Text('${meal.kcal.round()}kcal',
                  style: AppText.poppins(12, color: AppColors.kcalText, letterSpacing: .24)),
            ]),
          ),
        ]),
      ),
    );
  }

  /// Bar vertikal setinggi 36 (abu) yang terisi dari bawah sesuai gram (maks [full] g).
  Widget _macro(double g, String label, Color c, double full, double labelSize) {
    final fill = (g / full).clamp(0.0, 1.0) * 36;
    return Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
      SizedBox(
        width: 5,
        height: 36,
        child: Stack(alignment: Alignment.bottomCenter, children: [
          Container(color: const Color(0xFFEDEDED)),
          Container(height: fill, color: c),
        ]),
      ),
      const SizedBox(width: 2),
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text('${g.round()}g', style: AppText.poppins(12, weight: FontWeight.w700, letterSpacing: .24)),
        Text(label, style: AppText.poppins(labelSize, color: const Color(0xB3000000), letterSpacing: .3)),
      ]),
    ]);
  }
}
