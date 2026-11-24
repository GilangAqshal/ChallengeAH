import 'dart:math' as math;
import 'package:flutter/material.dart';

/// Logo "G" Google 4 warna, digambar dengan kode (tanpa aset).
class GoogleLogo extends StatelessWidget {
  final double size;
  const GoogleLogo({super.key, this.size = 18});

  @override
  Widget build(BuildContext context) =>
      CustomPaint(size: Size(size, size), painter: _GoogleLogoPainter());
}

class _GoogleLogoPainter extends CustomPainter {
  static const _blue = Color(0xFF4285F4);
  static const _red = Color(0xFFEA4335);
  static const _yellow = Color(0xFFFBBC05);
  static const _green = Color(0xFF34A853);

  @override
  void paint(Canvas canvas, Size size) {
    final r = size.width / 2;
    final sw = size.width * 0.22;
    final rect = Rect.fromCircle(center: Offset(r, r), radius: r - sw / 2);
    double rad(double deg) => deg * math.pi / 180;

    void arc(Color c, double fromDeg, double toDeg) => canvas.drawArc(
          rect,
          rad(fromDeg),
          rad(toDeg - fromDeg),
          false,
          Paint()
            ..style = PaintingStyle.stroke
            ..strokeWidth = sw
            ..color = c,
        );

    // Sudut searah jarum jam dari posisi jam 3.
    arc(_blue, 0, 45);
    arc(_green, 45, 150);
    arc(_yellow, 150, 225);
    arc(_red, 225, 320);
    // Garis horizontal biru di tengah.
    canvas.drawRect(
        Rect.fromLTWH(r, r - sw / 2, r, sw), Paint()..color = _blue);
  }

  @override
  bool shouldRepaint(covariant CustomPainter old) => false;
}
