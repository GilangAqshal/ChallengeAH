const cekPembayaran = (totalBelanja) => {
    const minimalDiskon = 500000;
    if(totalBelanja >= minimalDiskon){
        return `Anda dapat potongan harga`;
    }else{
        return `Harga normal, tingkatkan belanjaan anda`;
    }
}

const gilangBuy = cekPembayaran(400000);
const raditBuy = cekPembayaran(600000);

console.log(gilangBuy);
console.log(raditBuy);