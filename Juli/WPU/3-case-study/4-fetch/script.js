// 1. Simple fetch example
const user = fetch('https://api.github.com/users/sandhikagalihasdasd');
user
  .then((res) => res.json())
  .then((data) => {
    console.log(`Nama: ${data.name}`);
    console.log(`Jumlah Repo: ${data.public_repos}`);
  })
  .catch((err) => console.error(err));

// fetch('https://api.github.com/users/sandhikagalih')
//   .then((res) => res.json())
//   .then((user) => {
//     console.log(`Nama : ${user.name}`);
//     console.log(`Jumlah Repo : ${user.public_repos}`);
//   });
