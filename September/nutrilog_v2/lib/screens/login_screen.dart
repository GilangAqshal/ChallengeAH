import 'package:flutter/material.dart';

import '../services/services.dart';
import '../core/theme.dart';
import '../widgets/app_assets.dart';
import '../widgets/brand_icons.dart';
import '../widgets/form_widgets.dart';
import 'forgot_password_screen.dart';
import 'signup_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _user = TextEditingController();
  final _pass = TextEditingController();
  bool _remember = false;
  bool _loading = false;

  Future<void> _login() async {
    if (_user.text.trim().isEmpty || _pass.text.isEmpty) {
      showMsg(context, 'Isi username dan password');
      return;
    }
    setState(() => _loading = true);
    try {
      await AuthService.loginWithUsername(_user.text, _pass.text);
      if (mounted) Navigator.pushNamedAndRemoveUntil(context, '/home', (route) => false);
    } catch (e) {
      if (mounted) showMsg(context, e.toString().replaceFirst('Exception: ', ''));
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return AuthScaffold(
      child: Column(children: [
        Row(mainAxisAlignment: MainAxisAlignment.center, children: [
          const AppLogo(size: 38),
          const SizedBox(width: 4),
          Text('Login', style: AppText.montserrat(32, weight: FontWeight.w700, color: AppColors.headline, letterSpacing: -0.64)),
        ]),
        const SizedBox(height: 24),
        Text('Join us for a better health!',
            style: AppText.montserrat(12, weight: FontWeight.w500, color: AppColors.grey)),
        const SizedBox(height: 24),
        AppTextField(label: 'Username', hint: 'enter username', controller: _user),
        const SizedBox(height: 16),
        AppTextField(label: 'Password', hint: 'enter password', controller: _pass, obscure: true),
        const SizedBox(height: 10),
        Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
          GestureDetector(
            onTap: () => setState(() => _remember = !_remember),
            child: Row(children: [
              SizedBox(
                width: 14,
                height: 14,
                child: Checkbox(
                  value: _remember,
                  onChanged: (v) => setState(() => _remember = v ?? false),
                  activeColor: AppColors.orange,
                  materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  visualDensity: VisualDensity.compact,
                  side: const BorderSide(color: AppColors.grey),
                ),
              ),
              const SizedBox(width: 5),
              Text('Remember me', style: AppText.inter(12, weight: FontWeight.w500)),
            ]),
          ),
          GestureDetector(
            onTap: () => Navigator.push(
                context, MaterialPageRoute(builder: (_) => const ForgotPasswordScreen())),
            child: Text('Forgot Password?',
                style: AppText.inter(12, weight: FontWeight.w600, color: AppColors.orange)),
          ),
        ]),
        const SizedBox(height: 24),
        OrangeButton(text: 'Login', onPressed: _login, loading: _loading),
        const SizedBox(height: 16),
        OrangeButton(
            text: 'Sign up',
            onPressed: () => Navigator.push(
                context, MaterialPageRoute(builder: (_) => const SignUpScreen()))),
        const SizedBox(height: 12),
        const OrDivider(),
        const SizedBox(height: 10),
        SocialButton(
          text: 'Continue with Google',
          icon: const GoogleLogo(size: 18),
          onPressed: () => AuthService.signInWithGoogle(),
        ),
        const SizedBox(height: 10),
        SocialButton(
          text: 'Continue with Facebook',
          icon: const Icon(Icons.facebook, size: 18, color: Color(0xFF1877F2)),
          onPressed: () => AuthService.signInWithFacebook(),
        ),
      ]),
    );
  }
}
