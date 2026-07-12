// 1. Asynchronous untuk setTimeout
// console.log('mulai');
// setTimeout(function () {
//   console.log('proses 5 detik');
// }, 0);
// console.log('selesai');

// 2. Asynchronous untuk eventListener
// console.log('mulai');
// const tombol = document.querySelector('button');
// tombol.addEventListener('click', function () {
//   console.log('Tombol diklik!');
// });
// console.log('selesai');

// 3. Asynchronous untuk fetch()
console.log('mulai');
fetch('https://wpu-cafe.vercel.app/api/menu')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const menu = data.data.map((menu) => menu.name);
    // const menu = data.data;
    console.dir(menu);
  });
console.log('selesai');
