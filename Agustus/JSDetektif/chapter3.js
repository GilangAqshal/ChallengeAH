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
