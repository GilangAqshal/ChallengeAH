// 🟢 Challenge 2: Valentine’s Discou
// Sekarang kita naik level ke Logic Conditional yang sedikit lebih kompleks. Di sini kita akan main "diskon bertingkat".
// Skenarionya: Gilang mau beli bunga buat "seseorang". Karena ini bulan Februari, toko bunga kasih promo gila-gilaan.
// Kriteria:
// Diskon Februari: Kalau isFebruary itu true DAN totalPurchase lebih dari 100.000, dia dapet diskon 15%.
// Diskon Member: SETELAH diskon pertama dihitung, kalau dia punya isMember, dia dapet diskon tambahan 5% dari harga yang sudah didiskon tadi.
// Variabel Kunci yang harus kamu pakai:
// totalPurchase (misal: 200000)
// isFebruary (boolean)
// isMember (boolean)
// finalPrice (hasil akhir)

const prosesNilai = (isValentine) => {
    // Object Desctruction
    const {name, isFebruary, isMember} = isValentine;
    let totalPurchase = 200000;

    if(isFebruary === true && isMember === true){
        const discountAmount = (totalPurchase * 20)/100;
        const finalPrice = totalPurchase - discountAmount;
        return `${isValentine.name} mendapatkan discount sebesar ${finalPrice} `;
    }else if(isFebruary === true){
        const discountAmount = (totalPurchase * 15)/100;
        const finalPrice = totalPurchase - discountAmount;
        return `${isValentine.name} mendapatkan discount sebesar ${finalPrice} `;
    }else if(isMember === true){
        const discountAmount = (totalPurchase * 5)/100;
        const finalPrice = totalPurchase - discountAmount;
        return `${isValentine.name} mendapatkan discount sebesar ${finalPrice} `;
    }
}

const isValentine = [
  { name: "Gilang", isFebruary: true, isMember: true },
  { name: "Ilham", isFebruary: false, isMember: true },
  { name: "Aqshal", isFebruary: true, isMember: false },
];
console.log(prosesNilai(isValentine[0]));
console.log(prosesNilai(isValentine[1]));
console.log(prosesNilai(isValentine[2]));