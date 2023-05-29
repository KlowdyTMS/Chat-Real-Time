import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { PrivateRoute } from "../pages/PrivateRoute";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
