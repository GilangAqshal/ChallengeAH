const dataBarang = ["Baut", "Paku", "Cat", "Kuas", "Semen"];

const tampilkanBarang = (index) => {
    for(let i = index; i < dataBarang.length; i++){
        console.log(`Barang ke-${i + 1} adalah ${dataBarang[i]}`);
    }
}

tampilkanBarang(0);
