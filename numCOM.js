const hargaKaos = 100000;
const jumlahBeli = 3;
const totalBelanja = hargaKaos * jumlahBeli;

const diskon = 50000;

const dapatDiskon = totalBelanja > 250000;

if (dapatDiskon){
    const totalAkhir = hargaKaos * jumlahBeli - diskon;
    console.log("=====Selamat Datang di Toko Bajuy=====");
    console.log(`Harga Kaos = ${hargaKaos}`);
    console.log(`Jumlah Baju = ${jumlahBeli}`);
    console.log(`Diskon = ${diskon}`);
    console.log(`Total Akhir = ${totalAkhir}`);
    console.log("==========================");
}else{
    console.log(`Total belanja = ${totalBelanja}`);
}