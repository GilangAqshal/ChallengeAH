// Buatlah sebuah fungsi untuk menentukan apakah dua orang "cocok" berdasarkan skor hobi mereka.
// Variabel kunci: name1, name2, hobbyScore1, hobbyScore2, isCompatible.
// Logika: Jika rata-rata skor mereka di atas 75, maka isCompatible bernilai true. Jika tidak, false.
// Output: "Match Result: [true/false]"

// Tidak menggunakan parameter
const name = 'Gilang';
const hobby = 80;
const name1 = 'FIgo';
const hobby1 = 70;

const isCompatible = () => { 
    const average = (hobby + hobby1) / 2;
    if (average >= 75) {
            return `${name} dan ${name1} cocok karena rata-rata skor mereka adalah ${average}.`;
        } else {
            return `${name} dan ${name1} tidak cocok karena rata-rata skor hanya ${average}.`;
        }
}
console.log(isCompatible())

// menggunakan parameter
// const name = 'Gilang';
// const name1 = 'FIgo';


// const isCompatible = (hobby, hobby1) => { 
//     const average = (hobby + hobby1) / 2;
//     if (average >= 75) {
//             return `${name} dan ${name1} cocok karena rata-rata skor mereka adalah ${average}.`;
//         } else {
//             return `${name} dan ${name1} tidak cocok karena rata-rata skor hanya ${average}.`;
//         }
// }
// console.log(isCompatible(90,76));