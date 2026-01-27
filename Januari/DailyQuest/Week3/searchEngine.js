const dataBarang = ["Baut", "Paku", "Cat", "Kuas", "Semen"];

const tampilkanBarang = (namaBarang) => {
  for (let i = 0; i < dataBarang.length; i++) {
    if(dataBarang[i] === namaBarang){
        return `Barang ketemu`;
    }
  }
  return `barang tidak tersedia`;
};

console.log(tampilkanBarang("Mouse"));
