# NutriLog V2.4 — UI Refresh (Local Demo)

Versi ini memperbarui tampilan Flutter untuk tahap review UI sebelum backend Supabase dibuat.

## Perubahan UI
- Layout portrait dibatasi maksimal 440 px saat preview di browser dan tetap memakai tinggi viewport penuh.
- Area luar preview menggunakan latar gelap netral, bukan putih kosong.
- Halaman autentikasi menggunakan gradient penuh dan kartu yang responsif serta dapat di-scroll.
- Halaman Home, Activity, Profile, Scan, dan Add Meal menggunakan latar hangat, kartu konsisten, jarak yang lebih rapi, dan komponen responsif.
- Kartu makanan dibuat fleksibel agar tidak overflow pada layar kecil.
- Navigasi bawah dibuat lebih ringkas.
- Tidak ada TextField yang autofocus. Keyboard hanya muncul ketika pengguna mengetuk kolom input; mengetuk area lain atau menggulir dapat menutup fokus.
- Login demo otomatis mengisi `admin` / `admin`.

## Cara memasang
1. Backup folder `lib` project lama.
2. Ekstrak ZIP ini.
3. Salin folder `lib` dari `nutrilog_v2` ke folder project Flutter kamu, misalnya `D:\Project\nutrilog_app`.
4. Pertahankan folder `android`, `ios`, `web`, `windows`, dan `supabase` yang sudah ada. Jika ingin memperbarui README, salin file ini juga.
5. Jalankan:

```powershell
flutter pub get
flutter run -d chrome --web-port 3000
```

## Akun demo
- Username: `admin`
- Password: `admin`

Data demo disimpan lokal menggunakan SharedPreferences browser. Data tidak tersinkron ke perangkat lain dan bukan autentikasi untuk produksi.

## Rute preview
- `/login`
- `/signup`
- `/forgot-password`
- `/personal-data`
- `/home`
- `/scan`
- `/activity`
- `/profile`
- `/add-meal`

## Batasan tahap UI
- Login Google/Facebook, email reset password, kamera, barcode, dan galeri belum terhubung ke backend/perangkat.
- Supabase belum dikonfigurasi. Fitur demo lokal dipakai untuk meninjau alur dan UI terlebih dahulu.
- Kode sudah diperiksa struktur dan delimiter-nya, tetapi belum dapat dijalankan dengan Flutter di lingkungan pembuat ZIP. Jalankan `flutter run` di komputer pengembangan dan kirim pesan error jika ada.
