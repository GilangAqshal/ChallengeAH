import 'package:flutter/material.dart';
import '../core/theme.dart';

/// Navigasi bawah yang lebih ringkas dan konsisten untuk layar ponsel.
class DashNav extends StatelessWidget {
  final int index;
  final ValueChanged<int> onChanged;
  const DashNav({super.key, required this.index, required this.onChanged});

  static const _icons = [
    Icons.home_rounded,
    Icons.qr_code_scanner_rounded,
    Icons.directions_run_rounded,
    Icons.person_rounded,
  ];
  static const _labels = ['Home', 'Scan', 'Activity', 'Profile'];

  @override
  Widget build(BuildContext context) {
    final bottom = MediaQuery.of(context).padding.bottom;
    return SizedBox(
      height: 76 + bottom,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Positioned.fill(
            child: CustomPaint(
              painter: _NavPainter(activeCenter: index),
            ),
          ),
          for (var i = 0; i < _icons.length; i++)
            Positioned.fill(
              left: MediaQuery.of(context).size.width / 4 * i,
              right: MediaQuery.of(context).size.width / 4 * (3 - i),
              child: Semantics(
                button: true,
                selected: i == index,
                label: _labels[i],
                child: Material(
                  color: Colors.transparent,
                  child: InkWell(
                    onTap: () => onChanged(i),
                    borderRadius: BorderRadius.circular(24),
                    child: SizedBox(
                      height: 76,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          const SizedBox(height: 1),
                          AnimatedContainer(
                            duration: const Duration(milliseconds: 180),
                            curve: Curves.easeOut,
                            width: i == index ? 38 : 34,
                            height: i == index ? 38 : 34,
                            decoration: BoxDecoration(
                              color: i == index ? AppColors.orangeDeep : Colors.transparent,
                              shape: BoxShape.circle,
                            ),
                            child: Icon(
                              _icons[i],
                              size: i == index ? 22 : 21,
                              color: i == index ? Colors.white : Colors.white.withAlpha(190),
                            ),
                          ),
                          const SizedBox(height: 3),
                          AnimatedOpacity(
                            duration: const Duration(milliseconds: 160),
                            opacity: i == index ? 1 : 0,
                            child: Text(
                              _labels[i],
                              maxLines: 1,
                              style: AppText.montserrat(
                                10,
                                weight: FontWeight.w700,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _NavPainter extends CustomPainter {
  final int activeCenter;
  const _NavPainter({required this.activeCenter});

  @override
  void paint(Canvas canvas, Size size) {
    const top = 18.0;
    const half = 45.0;
    final slot = size.width / 4;
    final centerX = slot * activeCenter + slot / 2;
    final p = Path()
      ..moveTo(0, top)
      ..lineTo(centerX - half, top)
      ..cubicTo(centerX - half + 18, top, centerX - 36, 0, centerX, 0)
      ..cubicTo(centerX + 36, 0, centerX + half - 18, top, centerX + half, top)
      ..lineTo(size.width, top)
      ..lineTo(size.width, size.height)
      ..lineTo(0, size.height)
      ..close();
    canvas.drawShadow(p, Colors.black.withAlpha(35), 5, false);
    canvas.drawPath(p, Paint()..color = AppColors.orange);
  }

  @override
  bool shouldRepaint(covariant _NavPainter oldDelegate) =>
      oldDelegate.activeCenter != activeCenter;
}
