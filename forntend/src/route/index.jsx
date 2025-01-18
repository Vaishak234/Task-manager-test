
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProtectedRoutes from '../components/ProtectedRoutes';
import PersistLogin from '../components/PersistLogin';
import IsAuthenticated from '../components/IsAuthenticated';


const router = createBrowserRouter([
   
    {
        path: '/',
        element: <PersistLogin />,
        children: [
            {
                path: '/login',
                element: <IsAuthenticated>
                    <LoginPage />
                </IsAuthenticated>,
            },
            {
                path: '/register',
                element: <IsAuthenticated>
                    <RegisterPage />
                </IsAuthenticated>,
            },
            {
                path: "/",
                element: <ProtectedRoutes>
                    <MainLayout />
                </ProtectedRoutes>,
                children: [
                    {
                        path: "/",
                        element: <HomePage />
                    }
                ]
            }
        ]
    }
])

export default router