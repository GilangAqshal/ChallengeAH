const formatRupiah = (price) => {
    return `Rp${price.toString()}`; // Ubah Number jadi String agar bisa digabung
}

console.log(formatRupiah(250000)); // Ekspektasi: Rp250000