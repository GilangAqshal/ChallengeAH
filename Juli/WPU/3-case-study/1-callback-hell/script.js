function bacaFile(namaFile, callback) {
  setTimeout(() => {
    const data = 'Data dari file';
    console.log(`Data dari file ${namaFile} dibaca.`);
    callback(data);
  }, 1000);
}

function prosesData(data, callback) {
  setTimeout(() => {
    const hasil = data.toUpperCase();
    console.log('Data diproses:', hasil);
    callback(hasil);
  }, 1000);
}

function tampilkanHasil(hasil, callback) {
  setTimeout(() => {
    console.log('Hasil pemrosesan:', hasil);
    callback();
  }, 1000);
}

// Memanggil fungsi-fungsi dengan callback
bacaFile('data.txt', (data) => {
  prosesData(data, (hasil) => {
    tampilkanHasil(hasil, () => {
      console.log('Selesai!');
    });
  });
});
