const prosesNilai = (mhs) => {
    // Object Desctruction
    const {pemdas, basdat, oop} = mhs;
    const rataRata = (pemdas + basdat + oop)/3;

    if(rataRata >= 75){
        return `Nama ${mhs.name} dengan Nilai Rata-rata ${rataRata.toFixed(2)} Lulus`;
    }else{
        return `Nama ${mhs.name} dengan Nilai Rata-rata ${rataRata.toFixed(2)} Tidak Lulus`;
    }
}

const mhs = [
  { name: "Gilang", pemdas: 80, basdat: 60, oop: 90 },
  { name: "Ilham", pemdas: 70, basdat: 69, oop: 76 },
];


console.log(prosesNilai(mhs[0]));
console.log(prosesNilai(mhs[1]));