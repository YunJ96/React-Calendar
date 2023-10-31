import Home from './pages/Home/Home';
import Diary from './pages/Diary/Diary';
import Login from './pages/Login/Login';
import Join from './pages/Join/Join';

export const protectedRoutes = [
  {
    path: '/diary',
    element: <Diary />,
  },
];
export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/join',
    element: <Join />,
  },
  // {
  //   path: '/find_id',
  //   element: <FindId />,
  // },
  // {
  //   path: '/find_password',
  //   element: <FindPassword />,
  // },
];
