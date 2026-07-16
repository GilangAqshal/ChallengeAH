// 1. Destructuring Object
const user = { nama: "Budi", umur: 21, email: "budi@mail.com" };

// Alih-alih menulis: const nama = user.nama; const umur = user.umur;
const { nama, umur } = user;
console.log(nama, umur); // Output: Budi 21

// 2. Destructuring Array (Sering dipakai di React Hooks seperti useState)
const buah = ["Apel", "Mangga"];
const [buahPertama, buahKedua] = buah;
console.log(buahPertama); // Output: Apel
console.log("-------------------------------------------"); // Output: Apel

// 💻 Tantangan Praktik 3:
// Diberikan sebuah objek konfigurasi database Supabase berikut:
const supabaseConfig = {
  url: "https://xyz.supabase.co",
  apiKey: "secret_key_123",
  timeout: 5000,
};
// Ekstrak (destructure) variabel url dan apiKey dari objek di atas dalam satu baris kode saja.
const { url, apiKey } = supabaseConfig;
console.log(url, apiKey);
