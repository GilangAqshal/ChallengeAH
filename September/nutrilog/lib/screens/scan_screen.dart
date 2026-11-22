import 'package:flutter/material.dart';
import '../core/theme.dart';

/// Tampilan "Scan Food" (frame Scan1 di Figma). Kamera & pengenalan makanan
/// belum tersambung - itu fase berikutnya (lihat README, bagian "Langkah selanjutnya").
class ScanScreen extends StatelessWidget {
  const ScanScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: const Color(0xFF2B2B2B),
      child: SafeArea(
        child: Column(children: [
          const SizedBox(height: 28),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 10),
            decoration: BoxDecoration(color: Colors.black, borderRadius: BorderRadius.circular(30)),
            child: const Row(mainAxisSize: MainAxisSize.min, children: [
              Icon(Icons.fastfood, color: AppColors.orange, size: 24),
              SizedBox(width: 28),
              Icon(Icons.qr_code_scanner, color: Colors.white, size: 24),
            ]),
          ),
          const Spacer(),
          Container(
            width: 310,
            height: 300,
            decoration: BoxDecoration(
              border: Border.all(color: AppColors.orange, width: 6),
              borderRadius: BorderRadius.circular(22),
            ),
          ),
          const SizedBox(height: 20),
          Text('Scanning Food...', style: AppText.montserrat(13, weight: FontWeight.w700, color: Colors.white)),
          const Spacer(),
        ]),
      ),
    );
  }
}
