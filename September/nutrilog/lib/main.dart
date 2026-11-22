import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'core/supabase_service.dart';
import 'core/theme.dart';
import 'screens/login_screen.dart';
import 'screens/personal_data_screen.dart';
import 'screens/shell_screen.dart';
import 'screens/splash_screen.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Supabase.initialize(url: supabaseUrl, anonKey: supabaseAnonKey);
  runApp(const NutriLogApp());
}

class NutriLogApp extends StatelessWidget {
  const NutriLogApp({super.key});

  @override
  Widget build(BuildContext context) => MaterialApp(
        title: 'NutriLog',
        debugShowCheckedModeBanner: false,
        theme: buildTheme(),
        home: const SplashScreen(next: AuthGate()),
      );
}

/// Memilih layar awal: belum login -> Login; sudah login tapi belum isi data
/// pribadi -> Personal Data; selain itu -> Home.
class AuthGate extends StatelessWidget {
  const AuthGate({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<AuthState>(
      stream: db.auth.onAuthStateChange,
      builder: (context, _) {
        if (db.auth.currentSession == null) return const LoginScreen();
        return FutureBuilder<Map<String, dynamic>?>(
          future: ProfileService.myProfile(),
          builder: (context, snap) {
            if (snap.connectionState != ConnectionState.done) {
              return const Scaffold(
                  body: Center(child: CircularProgressIndicator(color: AppColors.orange)));
            }
            final onboarded = snap.data?['onboarded'] == true;
            return onboarded ? const ShellScreen() : const PersonalDataScreen();
          },
        );
      },
    );
  }
}
