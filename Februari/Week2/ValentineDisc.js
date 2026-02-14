
const prosesNilai = (isValentine) => {
    // Object Desctruction
    const {name, isFebruary, isMember} = isValentine;
    let totalPurchase = 200000;
    const FebMem = (totalPurchase * 20)/100;
    const February = (totalPurchase * 15)/100;
    const Member = (totalPurchase * 5)/100;



    if(isFebruary === true && isMember === true){
        return `${isValentine.name} Mendapatkan Diskon `+"Harga: " + (finalPrice = totalPurchase - FebMem);
    }else if(isFebruary === true){
        return `${isValentine.name} Mendapatkan Diskon `+"Harga: " + (finalPrice = totalPurchase - February);
    }else if(isMember === true){
        return `${isValentine.name} Mendapatkan Diskon `+"Harga: " + (finalPrice = totalPurchase - Member);
    }
}

const isValentine = [
  { name: "Gilang", isFebruary: true, isMember: true },
  { name: "Ilham", isFebruary: false, isMember: true },
  { name: "Aqshal", isFebruary: true, isMember: false },
];
console.log(prosesNilai(isValentine[0]));
console.log(prosesNilai(isValentine[1]));
console.log(prosesNilai(isValentine[2]));

