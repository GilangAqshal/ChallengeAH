const Judul = ['Javascript', 'PHP', 'Golang'];
const Level = ['Dasar', 'Advance', 'Hard'];

const modul = (input) => {
    for(let i = 0; i < Judul.length; i++){
        if(Judul[i] === input){
            return `Belajar bahasa pemrograman ${Judul[i]} dengan level ${Level[i]} `;
        }
    }
    return `Tidak bisa kah`
}

console.log(modul('Golang'))