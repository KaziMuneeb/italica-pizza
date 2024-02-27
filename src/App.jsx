import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./UI/Home";
import Error from "./UI/Error";

import Menu, { loader as MenuLoader } from "./features/menu/Menu";
import CreateOrder, {
  action as CreateOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as OrderLoader } from "./features/order/Order";
import Cart from "./features/cart/Cart";
import AppLayout from "./UI/AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: MenuLoader,
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },

      {
        path: "/order/new",
        element: <CreateOrder />,
        action: CreateOrderAction,
      },
      {
        path: "/order/:orderID",
        element: <Order />,
        loader: OrderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
