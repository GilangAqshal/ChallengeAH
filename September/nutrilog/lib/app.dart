import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'services/demo_store.dart';

import 'core/theme.dart';
import 'screens/login_screen.dart';
import 'screens/signup_screen.dart';
import 'screens/forgot_password_screen.dart';
import 'screens/activity_screen.dart';
import 'screens/home_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/scan_screen.dart';
import 'screens/add_meal_screen.dart';
import 'screens/personal_data_screen.dart';
import 'screens/shell_screen.dart';
import 'screens/splash_screen.dart';
import 'services/services.dart';

String get _initialRoute {
  final path = Uri.base.path;
  const known = {
    '/', '/login', '/signup', '/forgot-password', '/personal-data',
    '/home', '/scan', '/activity', '/profile', '/add-meal',
  };
  return known.contains(path) ? path : '/';
}

class NutriLogApp extends StatelessWidget {
  const NutriLogApp({super.key});

  @override
  Widget build(BuildContext context) => MaterialApp(
        title: 'NutriLog',
        debugShowCheckedModeBanner: false,
        theme: buildTheme(),
        builder: (context, child) => _PhoneFrame(child: child!),
        initialRoute: _initialRoute,
        routes: {
          '/': (_) => const SplashScreen(next: AuthGate()),
          '/login': (_) => const LoginScreen(),
          '/signup': (_) => const SignUpScreen(),
          '/forgot-password': (_) => const ForgotPasswordScreen(),
          '/personal-data': (_) => const PersonalDataScreen(),
          '/home': (_) => const ShellScreen(initialIndex: 0),
          '/scan': (_) => const ShellScreen(initialIndex: 1),
          '/activity': (_) => const ShellScreen(initialIndex: 2),
          '/profile': (_) => const ShellScreen(initialIndex: 3),
          '/add-meal': (_) => const AddMealScreen(),
        },
      );
}

/// Di layar lebar (preview web/desktop) aplikasi dibatasi selebar HP (maks 430px)
/// dan diletakkan di tengah, supaya proporsinya sama dengan desain Figma 393x852.
/// Di HP sungguhan pembungkus ini tidak mengubah apa pun.
class _PhoneFrame extends StatelessWidget {
  final Widget child;
  const _PhoneFrame({required this.child});

  @override
  Widget build(BuildContext context) {
    final mq = MediaQuery.of(context);
    final w = math.min(mq.size.width, 440.0);
    return ColoredBox(
      color: const Color(0xFF20232B),
      child: Center(
        child: SizedBox(
          width: w,
          height: mq.size.height,
          child: MediaQuery(
            data: mq.copyWith(size: Size(w, mq.size.height)),
            child: ClipRect(child: child),
          ),
        ),
      ),
    );
  }
}

/// Memilih layar awal: belum login -> Login; sudah login tapi data pribadi
/// belum diisi -> Personal Data; selain itu -> Home.
class AuthGate extends StatelessWidget {
  const AuthGate({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<bool>(
      future: DemoStore.isLoggedIn(),
      builder: (context, snap) {
        if (snap.connectionState != ConnectionState.done) {
          return const Scaffold(body: Center(child: CircularProgressIndicator(color: AppColors.orange)));
        }
        return snap.data == true ? const ShellScreen() : const LoginScreen();
      },
    );
  }
}
