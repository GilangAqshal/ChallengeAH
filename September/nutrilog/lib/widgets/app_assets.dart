import 'package:flutter/material.dart';
import '../core/theme.dart';

/// Memuat gambar dari folder assets; jika berkasnya belum ada, tampilkan [fallback].
/// Jadi cukup taruh hasil ekspor Figma dengan nama yang tepat - kode tidak perlu diubah.
class AppImage extends StatelessWidget {
  final String asset;
  final Widget fallback;
  final BoxFit fit;
  final double? width, height;
  const AppImage(this.asset,
      {super.key, required this.fallback, this.fit = BoxFit.contain, this.width, this.height});

  @override
  Widget build(BuildContext context) => Image.asset(
        asset,
        width: width,
        height: height,
        fit: fit,
        errorBuilder: (_, __, ___) => fallback,
      );
}

/// Nama berkas aset yang dicari aplikasi (ekspor dari Figma, PNG @3x).
class Assets {
  static const logo = 'assets/icons/logo.png'; // layer "logo_removw 1 (Traced)"
  static const bgLogin = 'assets/images/bg_login.png'; // frame "BG1" (latar oranye)
  static const bgSignup = 'assets/images/bg_signup.png'; // latar oranye-biru
}

/// Logo api NutriLog.
class AppLogo extends StatelessWidget {
  final double size;
  const AppLogo({super.key, this.size = 40});

  @override
  Widget build(BuildContext context) => AppImage(
        Assets.logo,
        width: size,
        height: size,
        fallback: Icon(Icons.local_fire_department, color: AppColors.orange, size: size),
      );
}
