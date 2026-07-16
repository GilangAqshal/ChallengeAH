const angka = [1, 2, 3, 4];

// .map() -> Mengubah setiap isi array menjadi bentuk baru
const dikaliDua = angka.map((num) => num * 2); // [2, 4, 6, 8]

// .filter() -> Menyaring array berdasarkan kondisi tertentu
const lebihDariDua = angka.filter((num) => num > 2); // [3, 4]
console.log(dikaliDua);
console.log(lebihDariDua);

// 💻 Tantangan Praktik 5:
// Diberikan array berisi data pemain sepak bola:
console.log(`============================================`);
const players = [
  { name: "Saka", goals: 15 },
  { name: "Odegaard", goals: 8 },
  { name: "Havertz", goals: 12 },
];

const goalsMore10 = players.filter((player) => {
  return player.goals >= 10;
});

const playerNames = goalsMore10.map((player) => {
  return player.name;
});

console.log(playerNames);
