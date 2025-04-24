import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/login";
import Signup from "./auth/signup";
import Home from "./home/home";
import Chat from "./chat/chat";

const router = createBrowserRouter([
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
  {
    path: "/chats/:_id",
    element: <Chat />,
  },
]);

export default router;
