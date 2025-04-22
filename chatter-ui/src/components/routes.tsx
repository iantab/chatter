import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/login";
import Signup from "./auth/signup";
import Home from "./home/home";

const Router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

export default Router;
