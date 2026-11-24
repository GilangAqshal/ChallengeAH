import 'package:flutter/material.dart';

import '../services/services.dart';
import '../core/theme.dart';
import '../widgets/form_widgets.dart';

/// Alur 3 layar sesuai Figma: Forgot Password -> Verify Code -> Change Password (+ Success).
class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});
  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  final _email = TextEditingController();
  bool _loading = false;

  Future<void> _send() async {
    if (!_email.text.contains('@')) return showMsg(context, 'Email tidak valid');
    setState(() => _loading = true);
    try {
      await AuthService.sendResetCode(_email.text);
      if (!mounted) return;
      Navigator.push(context,
          MaterialPageRoute(builder: (_) => VerifyCodeScreen(email: _email.text.trim())));
    } catch (e) {
      if (mounted) showMsg(context, e.toString().replaceFirst('Exception: ', ''));
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) => AuthScaffold(
        child: Column(children: [
          Align(
              alignment: Alignment.centerLeft,
              child: InkWell(onTap: () => Navigator.pop(context), child: const Icon(Icons.arrow_back))),
          const SizedBox(height: 12),
          Text('Forgot Password', style: AppText.montserrat(26, weight: FontWeight.w700, color: AppColors.title)),
          const SizedBox(height: 12),
          Text('Masukkan email akunmu. Kami kirim kode verifikasi.',
              textAlign: TextAlign.center,
              style: AppText.montserrat(12, weight: FontWeight.w500, color: AppColors.grey)),
          const SizedBox(height: 28),
          AppTextField(label: 'Email', hint: 'enter email', controller: _email, keyboardType: TextInputType.emailAddress),
          const SizedBox(height: 28),
          OrangeButton(text: 'Send Code', onPressed: _send, loading: _loading),
        ]),
      );
}

class VerifyCodeScreen extends StatefulWidget {
  final String email;
  const VerifyCodeScreen({super.key, required this.email});
  @override
  State<VerifyCodeScreen> createState() => _VerifyCodeScreenState();
}

class _VerifyCodeScreenState extends State<VerifyCodeScreen> {
  final _code = TextEditingController();
  bool _loading = false;

  Future<void> _verify() async {
    setState(() => _loading = true);
    try {
      await AuthService.verifyResetCode(widget.email, _code.text.trim());
      if (!mounted) return;
      Navigator.push(context, MaterialPageRoute(builder: (_) => const ChangePasswordScreen()));
    } catch (e) {
      if (mounted) showMsg(context, e.toString().replaceFirst('Exception: ', ''));
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) => AuthScaffold(
        child: Column(children: [
          Align(
              alignment: Alignment.centerLeft,
              child: InkWell(onTap: () => Navigator.pop(context), child: const Icon(Icons.arrow_back))),
          const SizedBox(height: 12),
          Text('Verify Code', style: AppText.montserrat(26, weight: FontWeight.w700, color: AppColors.title)),
          const SizedBox(height: 12),
          Text('Kode dikirim ke ${widget.email}',
              textAlign: TextAlign.center,
              style: AppText.montserrat(12, weight: FontWeight.w500, color: AppColors.grey)),
          const SizedBox(height: 28),
          AppTextField(label: 'Code', hint: 'enter code', controller: _code, keyboardType: TextInputType.number),
          const SizedBox(height: 16),
          GestureDetector(
            onTap: () async {
              await AuthService.sendResetCode(widget.email);
              if (mounted) showMsg(context, 'Kode dikirim ulang');
            },
            child: Text('Kirim ulang kode',
                style: AppText.inter(12, weight: FontWeight.w600, color: AppColors.orange)),
          ),
          const SizedBox(height: 28),
          OrangeButton(text: 'Verify', onPressed: _verify, loading: _loading),
        ]),
      );
}

class ChangePasswordScreen extends StatefulWidget {
  const ChangePasswordScreen({super.key});
  @override
  State<ChangePasswordScreen> createState() => _ChangePasswordScreenState();
}

class _ChangePasswordScreenState extends State<ChangePasswordScreen> {
  final _new = TextEditingController();
  final _confirm = TextEditingController();
  bool _loading = false;

  Future<void> _save() async {
    if (_new.text.length < 6) return showMsg(context, 'Password minimal 6 karakter');
    if (_new.text != _confirm.text) return showMsg(context, 'Konfirmasi password tidak sama');
    setState(() => _loading = true);
    try {
      await AuthService.changePassword(_new.text);
      if (!mounted) return;
      Navigator.pushReplacement(
          context, MaterialPageRoute(builder: (_) => const PasswordChangedScreen()));
    } catch (e) {
      if (mounted) showMsg(context, e.toString().replaceFirst('Exception: ', ''));
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) => AuthScaffold(
        child: Column(children: [
          const SizedBox(height: 12),
          Text('Change Password', style: AppText.montserrat(26, weight: FontWeight.w700, color: AppColors.title)),
          const SizedBox(height: 28),
          AppTextField(label: 'New Password', hint: 'enter new password', controller: _new, obscure: true),
          const SizedBox(height: 14),
          AppTextField(label: 'Confirm Password', hint: 'confirm password', controller: _confirm, obscure: true),
          const SizedBox(height: 28),
          OrangeButton(text: 'Save', onPressed: _save, loading: _loading),
        ]),
      );
}

class PasswordChangedScreen extends StatelessWidget {
  const PasswordChangedScreen({super.key});

  @override
  Widget build(BuildContext context) => AuthScaffold(
        child: Column(children: [
          const SizedBox(height: 24),
          const Icon(Icons.check_circle, color: AppColors.orange, size: 96),
          const SizedBox(height: 20),
          Text('Password Changed', style: AppText.montserrat(24, weight: FontWeight.w700, color: AppColors.title)),
          const SizedBox(height: 12),
          Text('Password kamu berhasil diganti.',
              style: AppText.montserrat(12, weight: FontWeight.w500, color: AppColors.grey)),
          const SizedBox(height: 40),
          OrangeButton(
            text: 'Back to Login',
            onPressed: () async {
              await AuthService.logout();
              if (context.mounted) Navigator.of(context).popUntil((r) => r.isFirst);
            },
          ),
        ]),
      );
}
