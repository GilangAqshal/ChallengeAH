import { RouteObject } from 'react-router-dom';
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import Menu from '../components/pages/Menu';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/menu/:id',
    element: <Menu />,
  },
];

export default routes;
