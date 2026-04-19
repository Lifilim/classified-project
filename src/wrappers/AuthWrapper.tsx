import { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../hooks/UserStoreHook';

import { selectUser, selectToken, setCredentials, logout } from '../stores/slices/UserSlice';
import { authApi } from '../api/auth';


interface AuthWrapperInterface {
    children: React.ReactNode;
}
export const AuthWrapper: React.FC<AuthWrapperInterface> = ({ children }) => {

    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    const location = useLocation();

    // const isAuth = useAppSelector(selectIsAuth);
    const user = useAppSelector(selectUser);
    const token = useAppSelector(selectToken); //localStorage.getItem('token');

    const [isInit, setIsInit] = useState(false);
    
    useEffect(() => {
        const restoreSession = async () => {
            // const publicRoutes = ['/', '/login', '/register'];
            // const isPublicRoute = publicRoutes.includes(location.pathname);
            // const from = location.state?.from || '/';

            // if (isPublicRoute) return;
            if (!token || token === 'undefined' || token === 'null') {
                dispatch(logout());
                setIsInit(true);
                return;
                // dispatch(logout());
                // navigate('/login', { state: { from: location.pathname } });
                // if (location.pathname === '/login' || location.pathname === '/register') {
                //     navigate(from);
                // }
            }
            // if (user) {
                // setIsInit(true);
                // return;
                // if (location.pathname === '/login' || location.pathname === '/register')
                //     navigate(from);
                // return;
            // }
            try {
                const data = await authApi.getProfile();
                dispatch(setCredentials(data));
                // if (location.pathname === '/login' || location.pathname === '/register') {
                //     navigate(from);
                // }
            } catch (error) {
                dispatch(logout());
                // navigate('/login', { state: { from: location.pathname } });
            } finally {
                setIsInit(true);
            }
        };
        restoreSession();
    }, [dispatch, token]);

    if (!isInit) return <div>Загрузка...</div>;

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
    if (user && isAuthPage) {
        const from = location.state?.from || '/feed';
        return <Navigate to={from} replace />;
    }

    return (
        <>
            {children}
        </>
    );
};