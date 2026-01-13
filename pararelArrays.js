const listBarang = ["Kopi", "Gula", "Susu"];
const liatHarga = [5000, 7000, 3000];

const cekNama = (nama) => {
  for (let i = 0; i < listBarang.length; i++) {
    if (listBarang[i] === nama) {
      return `Harga ${listBarang[i]} adalah Rp.${liatHarga[i]}`;
    }
  }
  return `barang tidak tersedia`;
};

console.log(cekNama("Kopi"));