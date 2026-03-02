import { createBrowserRouter } from "react-router-dom";
import Login from "../Component/Login/Login";
import Register from "../Component/Register/Register";
import NotFound from "../Component/NotFound/NotFound";
import AuthLayout from "../Layout/AuthLayout";
import MainLayout from "../Layout/MainLayout";
import Profile from "../Pages/Profile/Profile";
import Feed from '../Pages/Feed/Feed'
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedAuthRoutes from "./ProtectedAuthRoutes";
import ChangePassword from "../Pages/Settings/ChangePassword";


export const router = createBrowserRouter([
    {
        path: '', element: <AuthLayout />,
        children: [
            {
                path: '/', element:  <ProtectedAuthRoutes> <Login /> </ProtectedAuthRoutes>
            },
            {
                path: 'Login', element: <ProtectedAuthRoutes> <Login /> </ProtectedAuthRoutes>
            },
            {
                path: 'Register', element:  <ProtectedAuthRoutes> <Register /> </ProtectedAuthRoutes>
            },
            {
                path: '*', element: <NotFound />
            },
        ],
    },
    {
        path: '', element: <MainLayout />,
        children: [
            {
                index: true, element: <ProtectedRoutes> <Feed /> </ProtectedRoutes>
            },
            {
                path: 'Feed', element:  <ProtectedRoutes> <Feed /> </ProtectedRoutes>
            },
            {
                path: 'Profile/:id', element: <ProtectedRoutes> <Profile /> </ProtectedRoutes>  
            },
            {
                path: 'Profile', element: <ProtectedRoutes> <Profile /> </ProtectedRoutes>  
            },
            {
                path: 'ChangePassword', element: <ProtectedRoutes> <ChangePassword /> </ProtectedRoutes>  
            },
            {
                path: '*', element: <NotFound />
            },
        ],
    },
])
