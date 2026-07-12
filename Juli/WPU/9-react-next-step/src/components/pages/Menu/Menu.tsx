import { useParams, Link } from 'react-router-dom';
import useCounterStore from '../../../stores/CounterStore';

const Menu = () => {
  const { id } = useParams();
  const { count } = useCounterStore();
  return (
    <div>
      <h1>Menu</h1>
      <p>{id}</p>
      <Link to="/">home</Link>
      <br />
      {count}
    </div>
  );
};

export default Menu;
