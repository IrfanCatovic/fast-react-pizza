
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Error from './ui/Error';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import { action as updateOrderAction } from './features/order/UpdateOrder';

import AppLayout from './ui/AppLayout';

const router = createBrowserRouter([
  {
        //AppLayout pravimo kao parent element otalim rutama jer zelimo da se na svakoj stranici prikazuje AppLayout
    //To znaci da na svakoj ima header, Content i cartOverview, a izmedju njih ubacujemo sta zelimo da se vidi jos
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },

    // { path: "/", element: <Home /> },
  // { path: "/menu", element: <Menu /> },
  // { path: "/cart", element: <Cart /> },
  // { path: "/order/new", element: <CreateOrder /> },
  // { path: "/order/:orderId", element: <Order /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
