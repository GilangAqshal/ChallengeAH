import 'package:flutter/material.dart';
import '../core/theme.dart';

class ScanScreen extends StatelessWidget {
  const ScanScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppColors.ink,
      child: SafeArea(bottom: false, child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 22, 20, 24),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text('Food Scanner', style: AppText.jakarta(23, weight: FontWeight.w800, color: Colors.white)),
          const SizedBox(height: 5),
          Text('Kenali makanan dan catat nutrisinya', style: AppText.inter(12, color: Colors.white70)),
          const SizedBox(height: 24),
          Expanded(child: Container(
            width: double.infinity,
            decoration: BoxDecoration(color: const Color(0xFF343B49), borderRadius: BorderRadius.circular(28), border: Border.all(color: Colors.white.withOpacity(.08))),
            child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              Container(width: 210, height: 210, decoration: BoxDecoration(border: Border.all(color: AppColors.orange, width: 3), borderRadius: BorderRadius.circular(28)), child: Stack(children: [
                const Center(child: Icon(Icons.restaurant_rounded, color: Colors.white24, size: 92)),
                Positioned(top: 0, left: 0, child: _corner()),
                Positioned(top: 0, right: 0, child: Transform.rotate(angle: 1.5708, child: _corner())),
                Positioned(bottom: 0, left: 0, child: Transform.rotate(angle: -1.5708, child: _corner())),
                Positioned(bottom: 0, right: 0, child: Transform.rotate(angle: 3.1416, child: _corner())),
              ])),
              const SizedBox(height: 24),
              Text('Arahkan kamera ke makanan', style: AppText.jakarta(15, weight: FontWeight.w700, color: Colors.white)),
              const SizedBox(height: 7),
              Padding(padding: const EdgeInsets.symmetric(horizontal: 30), child: Text('Fitur kamera akan diaktifkan setelah tahap UI selesai.', textAlign: TextAlign.center, style: AppText.inter(11, color: Colors.white60))),
            ]),
          )),
          const SizedBox(height: 18),
          Row(children: [
            Expanded(child: _scanAction(Icons.photo_library_outlined, 'Gallery')),
            const SizedBox(width: 12),
            Expanded(child: _scanAction(Icons.qr_code_scanner_rounded, 'Barcode')),
          ]),
        ]),
      )),
    );
  }

  Widget _corner() => Container(width: 26, height: 26, decoration: const BoxDecoration(border: Border(top: BorderSide(color: AppColors.orange, width: 5), left: BorderSide(color: AppColors.orange, width: 5)), borderRadius: BorderRadius.only(topLeft: Radius.circular(20))));
  Widget _scanAction(IconData icon, String label) => Container(height: 52, decoration: BoxDecoration(color: Colors.white.withOpacity(.1), borderRadius: BorderRadius.circular(16), border: Border.all(color: Colors.white24)), child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [Icon(icon, color: Colors.white, size: 19), const SizedBox(width: 8), Text(label, style: AppText.jakarta(12, weight: FontWeight.w700, color: Colors.white))]));
}
