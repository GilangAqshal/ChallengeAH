// The Alibi Contradiction
// data tersangka
const suspect = [
  { name: "Deni", location: "Zona Utama", accessTime: 22.25, securityLevel: 2 },
  { name: "Eka", location: "Ruang Kantor", accessTime: 22.3, securityLevel: 3 },
  { name: "Fajar", location: "Zona Utama", accessTime: 21.5, securityLevel: 3 },
];

// paramter waktu dan lokasi
const crimeLocation = "Zona Utama";
const crimeTimeStart = 22.15;
const crimeTimeEnd = 22.45;
const requireSecurityLevel = 3;

suspect.forEach((tersangka) => {
  if (
    tersangka.location === crimeLocation &&
    tersangka.accessTime >= crimeTimeStart &&
    tersangka.accessTime <= crimeTimeEnd
  ) {
    if (tersangka.securityLevel < requireSecurityLevel) {
      console.log("Tersangka Utama " + tersangka.name);
    } else {
      console.log("Akeses Sah diTKP");
    }
  } else {
    console.log(`Alibi dari ${tersangka.name} Valid`);
  }
});

// Report to Police
// 1. **CASE ID:** `CASE-002`
// 2. **CRIME:** `Pencurian Koleksi Museum Harbor Art`
// 3. **CULPRIT:** `Deni`
// 4. **PRIMARY EVIDENCE:** `Deni berada di Zona Utama pada pukul 22.25 WIB dengan Security Level 2, sedangkan batas minimum yang diperlukan adalah Security Level 3.`
// 5. **INVESTIGATION METHOD:** `Program memeriksa setiap tersangka menggunakan conditional if, else if, dan else. Sistem terlebih dahulu membandingkan lokasi tersangka dengan crimeLocation, kemudian mengecek apakah accessTime berada dalam rentang 22.15–22.45 WIB menggunakan operator &&. Jika kedua kondisi terpenuhi, sistem membandingkan securityLevel dengan requiredSecurityLevel. Tersangka yang berada di TKP pada waktu kejadian tetapi memiliki securityLevel kurang dari 3 ditetapkan sebagai Tersangka Utama.`
// 6. **FINAL CONCLUSION:** `Deni ditetapkan sebagai tersangka utama karena berada di Zona Utama pada pukul 22.25 WIB saat periode kejadian dan hanya memiliki Security Level 2. Kondisi tersebut menunjukkan adanya akses ilegal dan kontradiksi terhadap protokol keamanan museum.`
