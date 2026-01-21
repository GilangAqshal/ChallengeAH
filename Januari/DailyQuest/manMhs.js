const prosesNilai = (mhs) => {
  // Object Destructuring
  const {mtk, bindo, agama} = mhs;
  const rataRata = (mtk+bindo+agama)/3;
  
  if (rataRata >= 75) {
    return `Karena ${rataRata} anda lulus`;
  } else {
    return `Karena ${rataRata} anda gagal`;
  }
}

const mhs = {
    name: 'Gilang',
    mtk: 80,
    bindo: 60,
    agama: 90,

};

console.log(prosesNilai(mhs));