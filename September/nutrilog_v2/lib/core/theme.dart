import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Warna diambil langsung dari desain Figma NutriLog.
class AppColors {
  static const orange = Color(0xFFFE8B41); // tombol, nav bar
  static const orangeBorder = Color(0xFFFE7F2D); // border kartu makanan
  static const orangeDeep = Color(0xFFF36A0B); // lingkaran menu aktif
  static const headline = Color(0xFF111827);
  static const title = Color(0xFF243B4A); // "Sign up", "Personal Data"
  static const grey = Color(0xFF6C7278);
  static const hint = Color(0xFF898A8D);
  static const inputBorder = Color(0xFFEDF1F3);
  static const socialBorder = Color(0xFFEFF0F6);
  static const socialText = Color(0xFF1A1C1E);
  static const cardBg = Color(0xFFFBFBFB);
  static const mutedText = Color(0xFF878488);
  static const kcalText = Color(0xFF9A9999);

  // Makro nutrisi
  static const protein = Color(0xFF6DC27A);
  static const fats = Color(0xFFF4735A);
  static const carbs = Color(0xFFF9D45C);
  static const water = Color(0xFF2D6FE8);
  static const track = Color(0xFFE6E6E6);
  static const arcTrack = Color(0xFFF5D5CE);
  static const arcProgress = Color(0xFFF4735A);
}

class AppText {
  static TextStyle montserrat(double size,
          {FontWeight weight = FontWeight.w400,
          Color color = Colors.black,
          double? letterSpacing}) =>
      GoogleFonts.montserrat(
          fontSize: size,
          fontWeight: weight,
          color: color,
          letterSpacing: letterSpacing);

  static TextStyle jakarta(double size,
          {FontWeight weight = FontWeight.w500,
          Color color = AppColors.grey}) =>
      GoogleFonts.plusJakartaSans(
          fontSize: size, fontWeight: weight, color: color, letterSpacing: -0.24);

  static TextStyle inter(double size,
          {FontWeight weight = FontWeight.w400,
          Color color = AppColors.grey}) =>
      GoogleFonts.inter(
          fontSize: size, fontWeight: weight, color: color, letterSpacing: -0.12);

  static TextStyle kurale(double size, {Color color = Colors.black}) =>
      GoogleFonts.kurale(fontSize: size, color: color);

  static TextStyle poppins(double size,
          {FontWeight weight = FontWeight.w400,
          Color color = Colors.black,
          double? letterSpacing}) =>
      GoogleFonts.poppins(
          fontSize: size,
          fontWeight: weight,
          color: color,
          letterSpacing: letterSpacing);
}

ThemeData buildTheme() => ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: Colors.white,
      colorScheme: ColorScheme.fromSeed(seedColor: AppColors.orange),
      textTheme: GoogleFonts.montserratTextTheme(),
    );
