const stokProduk = ["Lampu", "Kabel", "Saklar"];

const cekGudang = (index) => {
    if(index < stokProduk.length){
        return `Barang ${stokProduk[index]} tersedia di rak no ${index}`
    }else{
        return `Maaf, rak nomor ${index} masih kosong`;
    }
}
stokProduk.push("Obeng");
stokProduk[1] = ("Cable");

console.log(cekGudang(3));