const dataHewan = {
  burung: { jenis: "Unggas", bisaTerbang: true },
  ular: { jenis: "Reptil", bisaTerbang: false },
};

const cekKarakteristik = (namaHewan) => {
  // Ambil data hewan dari object berdasarkan parameter namaHewan
  const hewan = dataHewan[namaHewan];

  // Jika nama hewan tidak ditemukan di dalam dataHewan
  if (!hewan) {
    return "Hewan tidak terdaftar di kebun binatang!";
  }

  if (hewan.jenis === "Reptil") {
    return "stttt";
  } else if (hewan.jenis === "Unggas") {
    return "kicau";
  } else {
    return "tidak muncul";
  }
  // --- SELESAI ---
};

console.log(cekKarakteristik("ular")); // Output yang diharapkan: "Hati-hati, hewan ini melata!"
console.log(cekKarakteristik("burung")); // Output yang diharapkan: "Burung ini sedang terbang tinggi!"
console.log(cekKarakteristik("kucing")); // Output yang diharapkan: "Hewan tidak terdaftar di kebun binatang!"

// const name = "gilang";

// const hello = () => {
//   console.log(`Hello my name is ${name} berkicau`);
// };

// hello();
