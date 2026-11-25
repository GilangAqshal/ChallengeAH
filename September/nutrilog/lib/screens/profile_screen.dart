import 'package:flutter/material.dart';
import '../services/services.dart';
import '../core/theme.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});
  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  Map<String, dynamic>? _p;
  @override
  void initState() { super.initState(); _load(); }
  Future<void> _load() async { final p = await ProfileService.myProfile(); if (mounted) setState(() => _p = p); }
  String _num(dynamic v, String unit) => v == null ? 'Belum diatur' : '${(v as num) % 1 == 0 ? v.toInt() : v} $unit';

  @override
  Widget build(BuildContext context) {
    final p = _p;
    return Container(
      color: AppColors.pageBg,
      child: SafeArea(bottom: false, child: ListView(
        keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
        padding: const EdgeInsets.fromLTRB(20, 20, 20, 28),
        children: [
          Text('Profile', style: AppText.jakarta(24, weight: FontWeight.w800, color: AppColors.ink)),
          const SizedBox(height: 5),
          Text('Kelola informasi dan target kesehatanmu', style: AppText.inter(12, color: AppColors.grey)),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(gradient: const LinearGradient(colors: [Color(0xFFFFA05F), Color(0xFFFF7B35)], begin: Alignment.topLeft, end: Alignment.bottomRight), borderRadius: BorderRadius.circular(24), boxShadow: const [BoxShadow(color: Color(0x22F36A0B), blurRadius: 18, offset: Offset(0, 8))]),
            child: Row(children: [
              const CircleAvatar(radius: 34, backgroundColor: Colors.white, child: Icon(Icons.person_rounded, size: 42, color: AppColors.orangeDeep)),
              const SizedBox(width: 14),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(p?['username'] ?? 'Admin NutriLog', style: AppText.jakarta(17, weight: FontWeight.w800, color: Colors.white)),
                const SizedBox(height: 3),
                Text('Member • Demo Account', style: AppText.inter(11, color: Colors.white.withOpacity(.9))),
              ])),
              const Icon(Icons.verified_rounded, color: Colors.white, size: 22),
            ]),
          ),
          const SizedBox(height: 22),
          _sectionTitle('Personal information'),
          const SizedBox(height: 10),
          _infoCard([
            _Info(Icons.height_rounded, 'Height', _num(p?['height_cm'], 'cm')),
            _Info(Icons.monitor_weight_outlined, 'Weight', _num(p?['weight_kg'], 'kg')),
            _Info(Icons.wc_rounded, 'Gender', p?['gender'] == null ? 'Belum diatur' : (p!['gender'] == 'male' ? 'Male' : 'Female')),
            _Info(Icons.flag_outlined, 'Goal', (p?['goal'] ?? 'Maintain Weight').toString()),
          ]),
          const SizedBox(height: 20),
          _sectionTitle('Account'),
          const SizedBox(height: 10),
          _actionTile(Icons.photo_library_outlined, 'Gallery', 'Kelola foto profil', () => _message('Galeri akan tersedia pada pengembangan berikutnya.')),
          const SizedBox(height: 10),
          _actionTile(Icons.settings_outlined, 'Settings', 'Preferensi aplikasi', () => _message('Pengaturan akan segera tersedia.')),
          const SizedBox(height: 10),
          _actionTile(Icons.logout_rounded, 'Log out', 'Keluar dari akun demo', () async {
            await AuthService.logout();
            if (context.mounted) Navigator.pushNamedAndRemoveUntil(context, '/login', (route) => false);
          }, danger: true),
        ],
      )),
    );
  }

  Widget _sectionTitle(String text) => Text(text, style: AppText.jakarta(15, weight: FontWeight.w800, color: AppColors.ink));
  Widget _infoCard(List<_Info> items) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 4),
    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(18), boxShadow: const [BoxShadow(color: Color(0x0B20232B), blurRadius: 14, offset: Offset(0, 4))]),
    child: Column(children: [for (var i = 0; i < items.length; i++) ...[
      if (i > 0) const Divider(height: 1, color: Color(0xFFF0ECE8)),
      Padding(padding: const EdgeInsets.symmetric(vertical: 13), child: Row(children: [
        Container(width: 36, height: 36, decoration: BoxDecoration(color: const Color(0xFFFFF1E8), borderRadius: BorderRadius.circular(11)), child: Icon(items[i].icon, color: AppColors.orangeDeep, size: 19)),
        const SizedBox(width: 12),
        Expanded(child: Text(items[i].label, style: AppText.inter(12, color: AppColors.grey))),
        Text(items[i].value, style: AppText.jakarta(12, weight: FontWeight.w700, color: AppColors.ink)),
      ])),
    ]]),
  );
  Widget _actionTile(IconData icon, String title, String subtitle, VoidCallback onTap, {bool danger = false}) => Material(
    color: Colors.white,
    borderRadius: BorderRadius.circular(16),
    child: InkWell(borderRadius: BorderRadius.circular(16), onTap: onTap, child: Padding(padding: const EdgeInsets.all(14), child: Row(children: [
      Container(width: 38, height: 38, decoration: BoxDecoration(color: danger ? const Color(0xFFFFEEEE) : const Color(0xFFFFF1E8), borderRadius: BorderRadius.circular(12)), child: Icon(icon, color: danger ? Colors.redAccent : AppColors.orangeDeep, size: 20)),
      const SizedBox(width: 12),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(title, style: AppText.jakarta(13, weight: FontWeight.w700, color: danger ? Colors.redAccent : AppColors.ink)), const SizedBox(height: 2), Text(subtitle, style: AppText.inter(10, color: AppColors.grey))])),
      Icon(Icons.chevron_right_rounded, color: AppColors.grey),
    ]))),
  );
  void _message(String text) => ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(text)));
}

class _Info { final IconData icon; final String label, value; const _Info(this.icon, this.label, this.value); }
