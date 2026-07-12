const menus = [
  {
    label: "dashboard",
  },
  {
    label: "home",
  },
  {
    label: "setting",
    children: [
      {
        label: "user management",
      },
      {
        label: "config",
      },
      {
        label: "help",
      },
    ],
  },
];

const displayMenus = (menus) => {
  const menuListElement = document.createElement("ul");
  for (let i = 0; i < menus.length; i++) {
    const menuItem = menus[i];
    const listItemElement = document.createElement("li");
    listItemElement.textContent = menuItem.label;
    if (menuItem.children) {
      const childListElement = displayMenus(menuItem.children);
      listItemElement.appendChild(childListElement);
    }
    menuListElement.appendChild(listItemElement);
  }
  return menuListElement;
};

const menuListElement = displayMenus(menus);
document.getElementById("menu-list").appendChild(menuListElement);
