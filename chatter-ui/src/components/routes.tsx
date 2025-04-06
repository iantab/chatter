import {createBrowserRouter} from "react-router-dom";
import Login from "./auth/login";
import Signup from "./auth/signup";

const Router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />
    }
]);

export default Router;