# NutriLog — Local Demo Mode

Project ini sementara menggunakan penyimpanan lokal browser/perangkat melalui SharedPreferences, tanpa koneksi Supabase.

## Akun demo
- Username: `admin`
- Password: `admin`

## Jalankan di Chrome
```bash
flutter pub get
flutter run -d chrome --web-port 3000
```

## Halaman
- `/login`, `/signup`, `/forgot-password`
- `/home`, `/scan`, `/activity`, `/profile`, `/add-meal`, `/personal-data`

## Catatan
- Profil, catatan makanan contoh, dan air disimpan lokal dengan SharedPreferences.
- Data hanya tersimpan di browser/perangkat yang digunakan; membersihkan data browser dapat menghapusnya.
- Login Google/Facebook, reset password email, dan registrasi backend belum aktif pada mode demo.
- Data ini bukan akun aman untuk produksi. Jangan gunakan kredensial demo sebagai sistem autentikasi publik.
- Setelah UI selesai, ganti service lokal dengan Supabase dan aktifkan Row Level Security.
