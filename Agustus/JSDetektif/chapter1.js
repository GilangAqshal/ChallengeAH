// jam 02.15 hujan -day 1 jadi detektif

// TKP: Toko Perhiasan Lumière Gold
// Waktu Kejadian: 23.45 WIB
// Kejadian: Pembobolan brankas menggunakan PIN rahasia tanpa kerusakan fisik.
// Tersangka:
// Bambang (Kasir Toko): Mengaku sudah pulang jam 22.00 WIB.
// Citra (Manajer Operasional): Mengaku sedang berada di rumah sepanjang malam.
// Bukti Awal:
// Struk kopi otomatis menunjukkan ID Transaksi pencuri: 1054.
// Total belanjaan kopi pencuri di cafe sebelah TKP: 75000.
// Total saldo tersisa di kartu anggota pencuri setelah transaksi: 25000.
// Informasi Penting: Saldo awal kartu milik pencuri sebelum membeli kopi adalah hasil penjumlahan dari total belanja dan sisa saldo.

// Misssion :
// Gunakan kode JavaScript dasar untuk menghitung saldo awal kartu anggota pencuri dan mencocokkan ID Transaksi untuk mengidentifikasi siapa pemilik kartu tersebut.

const namaToko = "Lumiere Gold";
let statusKasus = "Open";
statusKasus = "Under Investigation";
const Crime = "Pembobolan Brankas Lumiere Gold";

const nameDetektif = "Rookie";
const umur = 24;
const isSolved = false;

// --- DATA BUKTI TKP ---
const transactionID = 1054;
const coffeePrice = 75000;
const remainingBalance = 25000;

// --- DATA PROFIL TERSANGKA ---
const Suspect1 = "Bambang";
const bambangID = 1020;
const bambangInitialBalance = 80000;

const Suspect2 = "Citra";
const citraID = 1054;
const citraInitialBalance = 100000;

// Jumlah Saldo awal
const suspectInitialBalance = coffeePrice + remainingBalance;

// compare id Transasksi bambang dan citra
const isBambangCulPrit = transactionID === bambangID; // false
const isCitraCulPrit = transactionID === citraID; // true

// Citra id nya sama sekarng akan saya compare dengan saldo awal
const isBalanceMatching = suspectInitialBalance === citraInitialBalance;

// console.log(`Saldo awal pencuri adalah ${suspectInitialBalance}.
//     ID Tansaksi Bambang Tidak Cocok karena dia ${isBambangCulPrit}
//     ID Transaksi CItra Cocok karena dia ${isCitraCulPrit}
//     Saldo awal dengan saldo citra cocok juga berikut resultnya ${isBalanceMatching}
//     Berdasarkan seluruh bukti tersangkannya adalah ${Suspect2}
//     `);

console.log(`
    1.CASE ID : ${citraID}
    2.CRIME   : ${Crime}
    3.CULPRIT : ${Suspect2}
    4.PRIMARY EVIDENCE     : ID transaksi 1054 dan saldo awal kartu sebesar Rp100.000 yang cocok dengan data Citra.
    5.INVESTIGATION METHOD : Kode JavaScript menghitung saldo awal pencuri menggunakan penjumlahan total belanja dan saldo tersisa, kemudian membandingkan ID transaksi serta saldo awal dengan data kedua tersangka menggunakan operator ===.
    6.FINAL CONCLUSION     : Citra merupakan tersangka yang paling cocok dengan seluruh bukti digital yang ditemukan. ID transaksinya sama dengan ID transaksi pencuri dan saldo awal kartunya juga sesuai dengan hasil perhitungan.
    `);
