const fullName = "Agus Kotak";
const nameArray = fullName.split(" "); // ["Agus", "Kotak"]

// ??? : Ambil karakter pertama dari kata pertama dan kedua
const initials = nameArray[0][0] + nameArray[1][0];

console.log(initials); // Ekspektasi: AK