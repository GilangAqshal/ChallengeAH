const listBarang = ["Kopi", "Gula", "Susu"];
const liatHarga = [5000, 7000, 3000];

const beliBarang = (nama, jumlah) => {
  for (let i = 0; i < listBarang.length; i++) {
    if (listBarang[i] === nama) {
        let total = liatHarga[i] * jumlah;
        return `Harga ${listBarang[i]} adalah Rp.${total}`;
    }
  }
  return `barang tidak tersedia`;
};

console.log(beliBarang("Kopi", 2));