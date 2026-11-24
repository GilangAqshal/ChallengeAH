import 'package:flutter/material.dart';
import '../widgets/bottom_nav.dart';
import 'activity_screen.dart';
import 'home_screen.dart';
import 'profile_screen.dart';
import 'scan_screen.dart';

/// Kerangka dengan nav bar oranye: Home / Scan / Activity / Profile.
class ShellScreen extends StatefulWidget {
  final int initialIndex;
  const ShellScreen({super.key, this.initialIndex = 0});
  @override
  State<ShellScreen> createState() => _ShellScreenState();
}

class _ShellScreenState extends State<ShellScreen> {
  late int _i = widget.initialIndex.clamp(0, 3);
  // Dipakai untuk memaksa Home/Activity memuat ulang saat tab dibuka.
  final _reload = ValueNotifier<int>(0);

  @override
  Widget build(BuildContext context) {
    final pages = [
      HomeScreen(reload: _reload),
      const ScanScreen(),
      ActivityScreen(reload: _reload),
      const ProfileScreen(),
    ];
    return Scaffold(
      backgroundColor: Colors.white,
      body: IndexedStack(index: _i, children: pages),
      bottomNavigationBar: DashNav(
        index: _i,
        onChanged: (v) {
          setState(() => _i = v);
          _reload.value++;
        },
      ),
    );
  }
}
