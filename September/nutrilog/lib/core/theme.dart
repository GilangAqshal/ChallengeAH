import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  static const orange = Color(0xFFFF8A3D);
  static const orangeBorder = Color(0xFFFFA36C);
  static const orangeDeep = Color(0xFFF36A0B);
  static const headline = Color(0xFF172033);
  static const title = Color(0xFF243B4A);
  static const grey = Color(0xFF6C7278);
  static const hint = Color(0xFF9A9DA3);
  static const inputBorder = Color(0xFFE8E9ED);
  static const socialBorder = Color(0xFFE9EAF0);
  static const socialText = Color(0xFF1A1C1E);
  static const cardBg = Color(0xFFFFFFFF);
  static const pageBg = Color(0xFFFFF7F1);
  static const mutedText = Color(0xFF878488);
  static const protein = Color(0xFF63B978);
  static const fats = Color(0xFFF07861);
  static const carbs = Color(0xFFF2C94C);
  static const water = Color(0xFF438DEB);
  static const track = Color(0xFFE9E9EC);
  static const arcTrack = Color(0xFFFFE2D4);
  static const arcProgress = Color(0xFFF4735A);
  static const ink = Color(0xFF243044);
}

class AppText {
  static TextStyle montserrat(double size, {FontWeight weight = FontWeight.w400, Color color = Colors.black, double? letterSpacing}) =>
      GoogleFonts.montserrat(fontSize: size, fontWeight: weight, color: color, letterSpacing: letterSpacing);
  static TextStyle jakarta(double size, {FontWeight weight = FontWeight.w500, Color color = AppColors.grey}) =>
      GoogleFonts.plusJakartaSans(fontSize: size, fontWeight: weight, color: color, letterSpacing: -0.24);
  static TextStyle inter(double size, {FontWeight weight = FontWeight.w400, Color color = AppColors.grey}) =>
      GoogleFonts.inter(fontSize: size, fontWeight: weight, color: color, letterSpacing: -0.12);
  static TextStyle kurale(double size, {Color color = Colors.black}) => GoogleFonts.kurale(fontSize: size, color: color);
  static TextStyle poppins(double size, {FontWeight weight = FontWeight.w400, Color color = Colors.black, double? letterSpacing}) =>
      GoogleFonts.poppins(fontSize: size, fontWeight: weight, color: color, letterSpacing: letterSpacing);
}

ThemeData buildTheme() => ThemeData(
  useMaterial3: true,
  scaffoldBackgroundColor: AppColors.pageBg,
  colorScheme: ColorScheme.fromSeed(seedColor: AppColors.orange, surface: AppColors.pageBg),
  textTheme: GoogleFonts.plusJakartaSansTextTheme(),
  appBarTheme: const AppBarTheme(backgroundColor: AppColors.pageBg, foregroundColor: AppColors.ink, elevation: 0, centerTitle: false),
  inputDecorationTheme: const InputDecorationTheme(filled: true, fillColor: Colors.white),
  snackBarTheme: SnackBarThemeData(behavior: SnackBarBehavior.floating, backgroundColor: AppColors.ink, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14))),
);
