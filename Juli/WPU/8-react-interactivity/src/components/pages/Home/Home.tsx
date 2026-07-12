import { useEffect, useState } from 'react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import styles from './Home.module.css';

const makanan = [
  {
    name: 'Fried Chicken',
    price: 10000,
  },
  {
    name: 'Nasi Goreng',
    price: 15000,
  },
  {
    name: 'Nasi Bakar',
    price: 15000,
  },
];

interface Menu {
  id: string;
  image_url: string;
  name: string;
}

const handleClickLogin = () => {
  alert('Hello');
};

const Home = () => {
  const [darkmode, setDarkmode] = useState<boolean>(true);
  const [inputSearch, setInputSearch] = useState<string>('');

  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetch('https://wpu-cafe.vercel.app/api/menu')
      .then((response) => response.json())
      .then((result) => setMenus(result.data));
  }, []);

  return (
    <main className={darkmode ? styles.dark : styles.light}>
      <h1 onClick={handleClickLogin}>Hello World</h1>
      <Input
        onChange={(e: any) => {
          setInputSearch(e.target.value);
        }}
        name="search"
        id="search-input"
        label="search"
      />
      <br />
      {/* {makanan.map((item, index) => (
        <Button
          onClick={() => (window.location.href = 'https://facebook.com')}
          key={`makanan-${index}`}
          type="button"
        >
          {item.name}
        </Button>
      ))} */}
      <br />
      <Button onClick={() => setDarkmode(!darkmode)}>
        {darkmode ? 'dark' : 'light'}
      </Button>
      <br />
      <div className={styles.menu}>
        {menus.map((item: Menu) => (
          <div className={styles.item} key={item.id}>
            <img
              className={styles.image}
              src={item.image_url}
              alt={item.name}
            />
            {item.name}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
