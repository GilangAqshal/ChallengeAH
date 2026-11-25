import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../core/theme.dart';
import 'app_assets.dart';

const _inputShadow = [
  BoxShadow(color: Color(0x40000000), blurRadius: 4, offset: Offset(0, 4)),
  BoxShadow(color: Color(0x3DE4E5E7), blurRadius: 2, offset: Offset(0, 1)),
];

/// Latar + kartu putih bersudut 26px (Login, Sign up, Personal Data, Forgot Password).
/// Latar memakai gambar dari Figma bila ada di assets, jika tidak, gradient pengganti.
class AuthScaffold extends StatelessWidget {
  final Widget child;
  final bool blueTone;
  const AuthScaffold({super.key, required this.child, this.blueTone = false});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      backgroundColor: AppColors.orange,
      body: Stack(fit: StackFit.expand, children: [
        DecoratedBox(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: blueTone
                  ? const [Color(0xFFFFE8D9), Color(0xFFFFA66F), Color(0xFF8AB8D0), Color(0xFFFFE1CD)]
                  : const [Color(0xFFFFD7BB), Color(0xFFFF9148), Color(0xFFFFB27E), Color(0xFFFFE8DA)],
              stops: const [0, .38, .72, 1],
            ),
          ),
        ),
        SafeArea(
          child: LayoutBuilder(builder: (context, constraints) {
            return SingleChildScrollView(
              keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
              padding: const EdgeInsets.fromLTRB(20, 22, 20, 24),
              child: ConstrainedBox(
                constraints: BoxConstraints(minHeight: constraints.maxHeight - 46),
                child: Center(
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 390),
                    child: Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 26),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(.97),
                        borderRadius: BorderRadius.circular(28),
                        boxShadow: const [BoxShadow(color: Color(0x263D2417), blurRadius: 28, offset: Offset(0, 14))],
                      ),
                      child: child,
                    ),
                  ),
                ),
              ),
            );
          }),
        ),
      ]),
    );
  }
}

class AppTextField extends StatefulWidget {
  final String label, hint;
  final TextEditingController controller;
  final bool obscure;
  final TextInputType? keyboardType;
  final Widget? suffix;
  final bool readOnly;
  final VoidCallback? onTap;

  const AppTextField({
    super.key,
    required this.label,
    required this.hint,
    required this.controller,
    this.obscure = false,
    this.keyboardType,
    this.suffix,
    this.readOnly = false,
    this.onTap,
  });

  @override
  State<AppTextField> createState() => _AppTextFieldState();
}

class _AppTextFieldState extends State<AppTextField> {
  late bool _hidden = widget.obscure;

  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      if (widget.label.isNotEmpty) ...[
        Text(widget.label, style: AppText.jakarta(12)),
        const SizedBox(height: 6),
      ],
      Container(
        height: 46,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: AppColors.inputBorder),
          boxShadow: _inputShadow,
        ),
        child: TextField(
          controller: widget.controller,
          autofocus: false,
          onTapOutside: (_) => FocusManager.instance.primaryFocus?.unfocus(),
          obscureText: _hidden,
          keyboardType: widget.keyboardType,
          readOnly: widget.readOnly,
          onTap: widget.onTap,
          style: AppText.montserrat(14, color: Colors.black),
          decoration: InputDecoration(
            hintText: widget.hint,
            hintStyle: AppText.montserrat(14, color: AppColors.hint),
            border: InputBorder.none,
            contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 13),
            suffixIcon: widget.obscure
                ? IconButton(
                    icon: Icon(_hidden ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                        size: 16, color: AppColors.hint),
                    onPressed: () => setState(() => _hidden = !_hidden),
                  )
                : widget.suffix,
          ),
        ),
      ),
    ]);
  }
}

/// Dropdown bergaya sama dengan kolom input (Level Activity, Goals, Country).
class AppDropdown extends StatelessWidget {
  final String label;
  final String? hint;
  final String? value;
  final List<String> items;
  final ValueChanged<String?> onChanged;
  const AppDropdown(
      {super.key,
      required this.label,
      required this.items,
      required this.value,
      required this.onChanged,
      this.hint});

  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      if (label.isNotEmpty) ...[
        Text(label, style: AppText.jakarta(12)),
        const SizedBox(height: 6),
      ],
      Container(
        height: 46,
        padding: const EdgeInsets.symmetric(horizontal: 14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: AppColors.inputBorder),
          boxShadow: _inputShadow,
        ),
        child: DropdownButtonHideUnderline(
          child: DropdownButton<String>(
            isExpanded: true,
            value: value,
            hint: hint == null ? null : Text(hint!, style: AppText.montserrat(13, color: Colors.black)),
            icon: const Icon(Icons.arrow_drop_down, color: AppColors.orange, size: 28),
            style: AppText.montserrat(13, color: Colors.black),
            items: items.map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
            onChanged: onChanged,
          ),
        ),
      ),
    ]);
  }
}

class OrangeButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final bool loading;
  const OrangeButton({super.key, required this.text, this.onPressed, this.loading = false});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 50,
      width: double.infinity,
      decoration: BoxDecoration(
        color: AppColors.orange,
        borderRadius: BorderRadius.circular(8),
        boxShadow: const [BoxShadow(color: Color(0x40000000), blurRadius: 2, offset: Offset(0, 4))],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(8),
          onTap: loading ? null : onPressed,
          child: Center(
            child: loading
                ? const SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                : Text(text, style: AppText.montserrat(14, weight: FontWeight.w500, color: Colors.white)),
          ),
        ),
      ),
    );
  }
}

class SocialButton extends StatelessWidget {
  final String text;
  final Widget icon;
  final VoidCallback onPressed;
  const SocialButton({super.key, required this.text, required this.icon, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 48,
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: AppColors.socialBorder),
        boxShadow: const [BoxShadow(color: Color(0x40000000), blurRadius: 2, offset: Offset(0, 4))],
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(10),
        onTap: onPressed,
        child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
          icon,
          const SizedBox(width: 10),
          Text(text, style: AppText.inter(14, weight: FontWeight.w600, color: AppColors.socialText)),
        ]),
      ),
    );
  }
}

class OrDivider extends StatelessWidget {
  const OrDivider({super.key});
  @override
  Widget build(BuildContext context) => Row(children: [
        const Expanded(child: Divider(color: Color(0xFFCFCFCF))),
        Padding(
            padding: const EdgeInsets.symmetric(horizontal: 22),
            child: Text('Or', style: AppText.inter(12))),
        const Expanded(child: Divider(color: Color(0xFFCFCFCF))),
      ]);
}

void showMsg(BuildContext context, String msg) => ScaffoldMessenger.of(context)
    .showSnackBar(SnackBar(content: Text(msg), behavior: SnackBarBehavior.floating));
