const passwordBenar = "kopiHitam123";
const passwordInput = "kopiHitam123";

const aksesDiberikan = passwordBenar === passwordInput;
if (aksesDiberikan){
    console.log("Selamat datang! Pintu gudang terbuka");
    console.log("My Password is " + passwordInput);
}else{
    console.log("Password salah! alarm berbunyi")
}