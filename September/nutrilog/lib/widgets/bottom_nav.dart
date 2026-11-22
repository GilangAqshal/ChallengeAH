import 'package:flutter/material.dart';
import '../core/theme.dart';

/// Nav bar oranye 77px dengan "gundukan" melengkung di atas item yang aktif
/// (Home, Scan, Activity, Profile) - mengikuti komponen "new dashmenu" di Figma.
class DashNav extends StatelessWidget {
  final int index;
  final ValueChanged<int> onChanged;
  const DashNav({super.key, required this.index, required this.onChanged});

  static const _icons = [Icons.home_outlined, Icons.photo_camera_outlined, Icons.directions_run, Icons.person_outline];
  static const _labels = ['Home', 'Scan', 'Activity', 'Profile'];

  @override
  Widget build(BuildContext context) {
    final w = MediaQuery.of(context).size.width;
    final bottom = MediaQuery.of(context).padding.bottom;
    final slot = w / 4;
    return SizedBox(
      height: 93 + bottom,
      child: Stack(children: [
        Positioned.fill(
          child: CustomPaint(painter: _NavPainter(centerX: slot * index + slot / 2)),
        ),
        for (var i = 0; i < 4; i++)
          Positioned(
            left: slot * i,
            width: slot,
            top: 0,
            height: 93,
            child: GestureDetector(
              behavior: HitTestBehavior.opaque,
              onTap: () => onChanged(i),
              child: i == index
                  ? Column(children: [
                      Container(
                        margin: const EdgeInsets.only(top: 2),
                        width: 46,
                        height: 46,
                        decoration: const BoxDecoration(color: AppColors.orangeDeep, shape: BoxShape.circle),
                        child: Icon(_icons[i], color: Colors.white, size: 28),
                      ),
                      const SizedBox(height: 4),
                      Text(_labels[i],
                          style: AppText.montserrat(14, weight: FontWeight.w600, color: Colors.white)),
                    ])
                  : Padding(
                      padding: const EdgeInsets.only(top: 34),
                      child: Align(
                        alignment: Alignment.topCenter,
                        child: Icon(_icons[i], color: const Color(0x66FFFFFF), size: 30),
                      ),
                    ),
            ),
          ),
      ]),
    );
  }
}

class _NavPainter extends CustomPainter {
  final double centerX;
  _NavPainter({required this.centerX});

  @override
  void paint(Canvas canvas, Size size) {
    const top = 24.0; // bar mulai y=24, puncak gundukan di y=0
    const half = 55.0; // setengah lebar gundukan (110px)
    final p = Path()
      ..moveTo(0, top)
      ..lineTo(centerX - half, top)
      ..cubicTo(centerX - half + 22, top, centerX - 40, 0, centerX, 0)
      ..cubicTo(centerX + 40, 0, centerX + half - 22, top, centerX + half, top)
      ..lineTo(size.width, top)
      ..lineTo(size.width, size.height)
      ..lineTo(0, size.height)
      ..close();
    canvas.drawShadow(p, Colors.black, 2, false);
    canvas.drawPath(p, Paint()..color = AppColors.orange);
  }

  @override
  bool shouldRepaint(_NavPainter old) => old.centerX != centerX;
}
