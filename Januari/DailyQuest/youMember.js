
const cekMember = (user) => {
    if(user.aktif === false){
        return `Akun ini tidak aktif`;
    }else if(user.poin > 100){
        return `Member VIP`;
    }else{
        return `Member Reguler`;
    }
}
const user = {
  name: 'gilang',
  age: 19,
  aktif: false,
  poin: 102,
};

console.log(cekMember(user));