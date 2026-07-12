import Button from '../../ui/Button';
import Input from '../../ui/Input';

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

const handleClickLogin = () => {
  alert('Hello');
};

const Home = () => {
  return (
    <main>
      <h1 onClick={handleClickLogin}>Hello World</h1>
      <Input name="search" id="search-input" label="search" />
      <br />
      {makanan.map((item, index) => (
        <Button
          onClick={() => (window.location.href = 'https://facebook.com')}
          key={`makanan-${index}`}
          type="button"
        >
          {item.name}
        </Button>
      ))}
    </main>
  );
};

export default Home;
