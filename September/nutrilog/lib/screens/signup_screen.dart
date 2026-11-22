import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../core/supabase_service.dart';
import '../core/theme.dart';
import '../widgets/form_widgets.dart';

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({super.key});
  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  final _user = TextEditingController();
  final _email = TextEditingController();
  final _pass = TextEditingController();
  final _birth = TextEditingController();
  final _phone = TextEditingController();
  DateTime? _birthDate;
  String _country = '+62';
  bool _loading = false;

  static const _countries = ['+62', '+60', '+65', '+66', '+1', '+44', '+61', '+81', '+82', '+91'];

  Future<void> _pickDate() async {
    final now = DateTime.now();
    final d = await showDatePicker(
      context: context,
      initialDate: DateTime(now.year - 20),
      firstDate: DateTime(1920),
      lastDate: now,
      builder: (c, child) => Theme(
        data: Theme.of(c).copyWith(colorScheme: const ColorScheme.light(primary: AppColors.orange)),
        child: child!,
      ),
    );
    if (d != null) {
      _birthDate = d;
      _birth.text = DateFormat('dd/MM/yyyy').format(d);
    }
  }

  Future<void> _register() async {
    if (_user.text.trim().isEmpty ||
        !_email.text.contains('@') ||
        _pass.text.length < 6 ||
        _birthDate == null) {
      showMsg(context, 'Lengkapi data (password minimal 6 karakter)');
      return;
    }
    setState(() => _loading = true);
    try {
      await AuthService.signUp(
        username: _user.text,
        email: _email.text,
        password: _pass.text,
        birthDate: _birthDate!,
        phone: '$_country${_phone.text.trim()}',
      );
      if (!mounted) return;
      // Jika "Confirm email" aktif di Supabase, pengguna harus cek email dulu.
      showMsg(context, 'Akun dibuat. Jika diminta, cek email untuk verifikasi.');
      Navigator.pop(context);
    } on AuthException catch (e) {
      if (mounted) showMsg(context, e.message);
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return AuthScaffold(
      blueTone: true,
      child: Column(children: [
        const SizedBox(height: 28),
        Text('Sign up', style: AppText.montserrat(32, weight: FontWeight.w700, color: AppColors.title)),
        const SizedBox(height: 16),
        Row(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text('Already have an account?  ', style: AppText.montserrat(12, weight: FontWeight.w500, color: AppColors.grey)),
          GestureDetector(
            onTap: () => Navigator.pop(context),
            child: Text('Login', style: AppText.montserrat(12, weight: FontWeight.w700, color: AppColors.orange)),
          ),
        ]),
        const SizedBox(height: 22),
        AppTextField(label: 'Username', hint: 'enter username', controller: _user),
        const SizedBox(height: 10),
        AppTextField(label: 'Email', hint: 'enter email', controller: _email, keyboardType: TextInputType.emailAddress),
        const SizedBox(height: 10),
        AppTextField(label: 'Password', hint: 'enter password', controller: _pass, obscure: true),
        const SizedBox(height: 10),
        AppTextField(
          label: 'Birth of date',
          hint: '.',
          controller: _birth,
          readOnly: true,
          onTap: _pickDate,
          suffix: const Icon(Icons.calendar_today_outlined, size: 16, color: AppColors.hint),
        ),
        const SizedBox(height: 10),
        Align(alignment: Alignment.centerLeft, child: Text('Phone Number', style: AppText.jakarta(12))),
        const SizedBox(height: 6),
        Row(children: [
          SizedBox(
            width: 96,
            child: AppDropdown(
              label: '',
              value: _country,
              items: _countries,
              onChanged: (v) => setState(() => _country = v!),
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: AppTextField(
                label: '', hint: 'phone number', controller: _phone, keyboardType: TextInputType.phone),
          ),
        ]),
        const SizedBox(height: 24),
        OrangeButton(text: 'Register', onPressed: _register, loading: _loading),
      ]),
    );
  }
}
