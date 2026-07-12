let allMenu = [];

async function fetchMenu(keyword = '') {
  try {
    const response = await fetch('https://wpu-cafe.vercel.app/api/menu?search=' + keyword);
    const data = await response.json();
    allMenu = data.data;
    displayMenu(allMenu);
  } catch (error) {
    console.error('Error fetching menu:', error);
  }
}

fetchMenu(); // Panggil fungsi untuk mengambil data menu

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

// Fitur Search Menu
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.toLowerCase();
  // const filteredMenu = allMenu.filter((menu) => menu.name.toLowerCase().includes(searchTerm));
  fetchMenu(searchTerm);
  // displayMenu(filteredMenu);
});
