import 'package:flutter/material.dart';

import '../core/supabase_service.dart';
import '../core/theme.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});
  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  Map<String, dynamic>? _p;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final p = await ProfileService.myProfile();
    if (mounted) setState(() => _p = p);
  }

  String _num(dynamic v, String unit) =>
      v == null ? '-' : '${(v as num) % 1 == 0 ? v.toInt() : v}$unit';

  @override
  Widget build(BuildContext context) {
    final p = _p;
    return SafeArea(
      bottom: false,
      child: ListView(padding: const EdgeInsets.fromLTRB(22, 24, 22, 24), children: [
        Row(children: [
          const SizedBox(width: 24),
          Expanded(
            child: Center(
              child: Text('Your Profile', style: AppText.montserrat(20, weight: FontWeight.w600, color: AppColors.title)),
            ),
          ),
          const Icon(Icons.settings_outlined, color: AppColors.title),
        ]),
        const SizedBox(height: 20),
        Center(
          child: Stack(children: [
            const CircleAvatar(
              radius: 46,
              backgroundColor: Color(0xFFE8E6E2),
              child: Icon(Icons.person, size: 64, color: Color(0xFFBDB9B2)),
            ),
            Positioned(
              right: 0,
              bottom: 0,
              child: Container(
                width: 22,
                height: 22,
                decoration: BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                    border: Border.all(color: AppColors.orange.withAlpha(120))),
                child: const Icon(Icons.edit_outlined, size: 12, color: AppColors.orange),
              ),
            ),
          ]),
        ),
        const SizedBox(height: 10),
        Center(child: Text(p?['username'] ?? '', style: AppText.montserrat(16, weight: FontWeight.w500, color: AppColors.grey))),
        const SizedBox(height: 28),
        Text('Personal Data', style: AppText.montserrat(13, weight: FontWeight.w500, color: const Color(0xFF444444))),
        const SizedBox(height: 8),
        _row(Icons.height, 'Height', _num(p?['height_cm'], 'Cm')),
        _row(Icons.monitor_weight_outlined, 'Weight', _num(p?['weight_kg'], 'Kg')),
        _row(Icons.male, 'Gender', p?['gender'] == null ? '-' : (p!['gender'] == 'male' ? 'Male' : 'Female')),
        _row(Icons.track_changes, 'Goals', p?['goal'] ?? '-'),
        _row(Icons.photo_outlined, 'Gallery', null),
        _row(Icons.logout, 'Logout', null, onTap: () => AuthService.logout()),
      ]),
    );
  }

  Widget _row(IconData icon, String label, String? value, {VoidCallback? onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.only(bottom: 14),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(8),
          boxShadow: const [BoxShadow(color: Color(0x40000000), blurRadius: 4, offset: Offset(0, 4))],
        ),
        child: Row(children: [
          Icon(icon, color: AppColors.orange, size: 28),
          const SizedBox(width: 14),
          Expanded(
            child: value == null
                ? Text(label, style: AppText.montserrat(14, color: AppColors.grey))
                : Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(label, style: AppText.montserrat(14, color: AppColors.grey)),
                    Text(value, style: AppText.montserrat(14, weight: FontWeight.w600, color: const Color(0xFF333333))),
                  ]),
          ),
          const Icon(Icons.arrow_forward, size: 20, color: Color(0xFF1B1F4B)),
        ]),
      ),
    );
  }
}
