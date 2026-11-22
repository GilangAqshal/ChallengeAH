# NutriLog – Flutter + Supabase

Panduan dari nol sampai aplikasi jalan. Ikuti urutannya.

## Langkah 1 – Pasang Flutter
1. Unduh Flutter SDK dari https://docs.flutter.dev/get-started/install lalu ikuti petunjuk OS kamu.
2. Jalankan `flutter doctor` dan perbaiki semua tanda ✗ (Android Studio + Android SDK, atau Xcode untuk iOS).

## Langkah 2 – Buat project dan salin kode
1. `flutter create --org com.nutrilog nutrilog`
2. Salin isi folder ini ke project tadi: ganti `pubspec.yaml`, ganti folder `lib/`, tambahkan folder `supabase/` dan `assets/`.
3. `flutter pub get`

## Langkah 3 – Buat project Supabase
1. Daftar di https://supabase.com → **New project** (catat password database).
2. Buka **SQL Editor → New query**, tempel seluruh isi `supabase/schema.sql`, klik **Run**.
   Ini membuat tabel `profiles`, `foods`, `meal_logs`, `water_logs`, trigger profil otomatis, aturan keamanan (RLS), dan 10 data makanan awal.
3. Buka **Project Settings → API**, salin **Project URL** dan **anon public key**.
4. Tempel keduanya di `lib/core/supabase_service.dart` (`supabaseUrl`, `supabaseAnonKey`).
   Jangan pernah memakai `service_role` key di aplikasi.

## Langkah 4 – Atur autentikasi
Di Supabase **Authentication**:
- **Providers → Email**: aktif. Untuk uji coba cepat, matikan *Confirm email* supaya daftar langsung bisa login.
- **URL Configuration → Redirect URLs**: tambah `io.supabase.nutrilog://login-callback/`.
- **Email Templates → Reset Password**: ganti isi link dengan kode, mis. `Kode verifikasi: {{ .Token }}`. Layar *Verify Code* memakai kode ini.
- **Google**: buat OAuth Client di Google Cloud Console, isi Client ID/Secret di Providers → Google.
- **Facebook**: buat app di Meta for Developers, isi App ID/Secret di Providers → Facebook.
  (Login Google/Facebook bisa dikerjakan belakangan; login username/password jalan tanpa keduanya.)

## Langkah 5 – Deep link untuk Google/Facebook
**Android** – di `android/app/src/main/AndroidManifest.xml`, dalam `<activity ...>` tambahkan:
```xml
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="io.supabase.nutrilog" android:host="login-callback" />
</intent-filter>
```
**iOS** – di `ios/Runner/Info.plist` tambahkan `CFBundleURLTypes` dengan URL scheme `io.supabase.nutrilog`.

## Langkah 6 – Ekspor aset dari Figma (supaya tampilan persis)
Kode sudah memakai warna, font, ukuran, dan radius dari Figma. Aset gambar harus kamu ekspor karena tidak bisa diunduh otomatis:
1. Di Figma pilih layer lalu panel kanan bawah **Export** → SVG/PNG @3x.
2. Yang perlu diekspor: `logo_removw 1 (Traced)` (logo api), latar kabur `BG1` (Login/Sign up), ikon Google & Facebook, ikon nav (home, kamera, lari, profil), ikon lonceng, avatar.
3. Simpan ke `assets/images/` dan `assets/icons/`, aktifkan blok `assets:` di `pubspec.yaml`.
4. Ganti placeholder: `Icon(Icons.local_fire_department…)` → `Image.asset('assets/icons/logo.png')`, dan gradient di `AuthScaffold` → `Image.asset('assets/images/bg_login.png', fit: BoxFit.cover)`.
   (Untuk SVG tambahkan paket `flutter_svg`.)

## Langkah 7 – Jalankan
```
flutter run
```
Alur uji: Splash → Sign up → (Login) → Personal Data → Home → tombol + Add Meals → tambah makanan → kembali, kalori & makro ter-update → tab Activity (pilih tanggal) → tab Profile → Logout.

## Struktur kode
| Berkas | Isi |
|---|---|
| `lib/core/theme.dart` | warna & gaya teks dari Figma (#FE8B41, Montserrat, Kurale, Poppins, Inter, Plus Jakarta Sans) |
| `lib/core/supabase_service.dart` | semua panggilan Supabase (auth, profil, makanan, air) |
| `lib/widgets/` | input, tombol, kartu makanan, busur kalori, nav bar melengkung |
| `lib/screens/` | splash, login, signup, forgot/verify/change password, personal data, home, add meal, activity, profile, scan |
| `supabase/schema.sql` | tabel, trigger, RLS, data awal |

## Yang sudah & belum
Sudah: Splash, Login (username), Sign up, Forgot → Verify Code → Change Password → Success, Personal Data (hitung target kalori), Home (busur kalori, makro, air, daftar makanan), Add Meals (cari + tambah), Activity (pilih tanggal), Profile (+Logout), tampilan Scan.

Belum (fase berikutnya): kamera/pengenalan makanan & scan barcode, Info Nutrition, Galeri, Settings, ganti foto profil (pakai Supabase Storage), Edit Weight/Height/Goals, Inbox/notifikasi, halaman Kebijakan Privasi & Ketentuan Layanan, dialog "Facebook Login" kustom, picker bulan/kalender kustom.

## Catatan penting
- Nilai gizi di `schema.sql` adalah perkiraan per 100 g – cocokkan dengan sumber resmi (mis. TKPI).
- `get_email_by_username` dapat dipanggil tanpa login (diperlukan agar login via username jalan). Untuk produksi, pertimbangkan login via email atau Edge Function dengan rate limit.
- Tekan lama kartu makanan untuk menghapusnya.
