let allMenu = [];

fetch('https://wpu-cafe.vercel.app/api/menu')
  .then((response) => response.json())
  .then((data) => {
    allMenu = data.data;
    displayMenu(allMenu);
  })
  .catch((error) => console.error('Error fetching menu:', error));

function displayMenu(menu) {
  const menuList = document.getElementById('menu-list');
  menuList.innerHTML = '';

  menu.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('menu-card');

    const image = document.createElement('img');
    image.src = item.image_url;
    image.alt = item.name;
    card.appendChild(image);

    const name = document.createElement('h2');
    name.textContent = item.name;
    card.appendChild(name);

    menuList.appendChild(card);
  });
}

// fitur searching
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Mencegah form untuk mengirim permintaan HTTP
  const searchTerm = searchInput.value.toLowerCase();
  // const filteredMenu = allMenu.filter((menu) => menu.name.toLowerCase().includes(searchTerm));
  fetch('https://wpu-cafe.vercel.app/api/menu?search=' + searchTerm)
    .then((response) => response.json())
    .then((data) => {
      filteredMenu = data.data;
      displayMenu(filteredMenu);
    })
    .catch((error) => console.error('Error fetching menu:', error));
});
