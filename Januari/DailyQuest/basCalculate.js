const hitungDiskon = (harga, persen) => {
    let potongan = harga * (persen/100);
    total = harga - potongan;
    return total;
};
console.log(hitungDiskon(100000, 20));