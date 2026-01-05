function cekStatusNilai(skor){
    if(skor >= 75){
        return `Lulus`;
    }else{
        return `Tidak Lulus`
    }
}

const hasil = cekStatusNilai(60);
console.log(hasil);