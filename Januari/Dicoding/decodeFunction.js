/**
 * TODO:
 * 1. Buatlah sebuah fungsi bernama `hello` yang menerima 2 argumen: `name` dan `origin`.
 * 2. Kembalikan fungsi tersebut dengan nilai string dengan templat:
 *    "Halo! Nama saya (name). Saya tinggal di (origin)."
 *
 *    Contoh: Jika `name` bernilai 'Fulan' dan `origin` bernilai 'Jakarta', fungsi harus mengembalikan:
 *    "Halo! Nama saya Fulan. Saya tinggal di Jakarta.".
 *
 * 3. Argumen `origin` boleh kosong dengan nilai default adalah "Bandung".
 * 4. Buatlah variabel bernama `gilang` yang menampung nilai dari hasil pemanggilan fungsi `hello`
 *    yang diberikan argumen name = 'gilang' dan origin = 'Semarang'.
 * 5. Buatlah variabel bernama `indra` yang menampung nilai dari hasil pemanggilan fungsi `hello`
 *    yang diberikan argumen name = 'Indra' tanpa memberikan nilai origin.
 */
const hello = (name, origin = "Bandung") => {
    return "Halo! Nama saya " +name+ ". Saya tinggal di "+origin+".";
}

const gilang = hello("gilang", "Semarang");
const indra = hello("Indra");

console.log(gilang);
console.log(indra);









// const hello = (name, origin = "Bandung") => {
//   return `Halo! Nama Saya ${name}. Saya tinggal di ${origin}.`;
// };

// const gilang = hello("gilang", "Semarang");

// const indra = hello("Indra");

// //outpout

// console.log(gilang);

// console.log(indra);
