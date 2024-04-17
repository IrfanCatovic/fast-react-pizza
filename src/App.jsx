import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter([
  {
    //AppLayout pravimo kao parent element otalim rutama jer zelimo da se na svakoj stranici prikazuje AppLayout
    //To znaci da na svakoj ima header, Content i cartOverview, a izmedju njih ubacujemo sta zelimo da se vidi jos
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <Menu />, loader: menuLoader },
      { path: "/cart", element: <Cart /> },
      { path: "/order/new", element: <CreateOrder /> },
      { path: "/order/:orderId", element: <Order /> },
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
