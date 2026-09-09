// Log Keluar Gerbang Pelabuhan
const gateLogs = [
  {
    truckPlate: "B 9012 KJL",
    containerID: "CTR-A-101",
    weight: 3200,
    exitTime: "01.15",
  },
  {
    truckPlate: "B 4410 PQR",
    containerID: "CTR-B-204",
    weight: 4800,
    exitTime: "01.45",
  },
  {
    truckPlate: "B 8821 XYZ",
    containerID: "CTR-X-998",
    weight: 6500,
    exitTime: "02.30",
  }, // Red Herring? Atau Pelaku?
  {
    truckPlate: "B 3311 LMN",
    containerID: "CTR-X-502",
    weight: 4100,
    exitTime: "03.10",
  },
  {
    truckPlate: "B 7722 OPS",
    containerID: "CTR-C-309",
    weight: 7000,
    exitTime: "03.45",
  },
];

for (let i = 0; i < gateLogs.length; i++) {
  if (
    gateLogs[i].containerID.includes("CTR-X") &&
    gateLogs[i].weight > 5000 &&
    gateLogs[i].exitTime > "02.00"
  ) {
    console.log("Truckplate " + gateLogs[i].truckPlate);
    console.log("ContainerID " + gateLogs[i].containerID);
    // break;
  }
}

// Report to Police
// CASE ID: CASE-003
// CRIME: Pencurian container di Gudang Transit Dermaga 4
// CULPRIT: B 8821 XYZ dengan Container ID CTR-X-998
// PRIMARY EVIDENCE: Container CTR-X-998 memiliki prefix CTR-X, berat 6500 kg, dan keluar dari gerbang pada 02.30 WIB, sehingga memenuhi seluruh kriteria pencarian.
// INVESTIGATION METHOD: Menggunakan perulangan for untuk memeriksa setiap data pada array gateLogs. Setiap data diperiksa berdasarkan tiga kondisi, yaitu containerID harus mengandung CTR-X, berat container harus lebih dari 5000 kg, dan waktu keluar harus setelah 02.00 WIB. Setelah ditemukan data yang memenuhi seluruh kondisi, digunakan break untuk menghentikan perulangan.
// FINAL CONCLUSION: Berdasarkan pemeriksaan seluruh kondisi, kendaraan dengan plat B 8821 XYZ dan container CTR-X-998 teridentifikasi sebagai pelaku yang paling memenuhi kriteria kasus.
