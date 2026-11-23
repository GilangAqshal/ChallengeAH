import 'demo_store.dart';

/// Auth lokal sementara. Nanti implementasi ini dapat diganti Supabase Auth.
class AuthService {
  static Future<void> loginWithUsername(String username, String password) async {
    if (username.trim().toLowerCase() != 'admin' || password != 'admin') {
      throw Exception('Username atau password salah. Gunakan admin / admin.');
    }
    await DemoStore.login('admin');
  }

  static Future<void> signUp({required String username, required String email,
    required String password, required DateTime birthDate, required String phone}) async {
    throw Exception('Registrasi lokal sementara dinonaktifkan. Gunakan akun demo admin / admin.');
  }

  static Future<void> signInWithGoogle() async =>
      throw Exception('Login Google tersedia setelah Supabase dikonfigurasi.');
  static Future<void> signInWithFacebook() async =>
      throw Exception('Login Facebook tersedia setelah Supabase dikonfigurasi.');
  static Future<void> sendResetCode(String email) async =>
      throw Exception('Reset password email tersedia setelah backend dibuat.');
  static Future<void> verifyResetCode(String email, String code) async =>
      throw Exception('Verifikasi email tersedia setelah backend dibuat.');
  static Future<void> changePassword(String newPassword) async =>
      throw Exception('Ubah password tersedia setelah backend dibuat.');
  static Future<void> logout() => DemoStore.logout();
}
