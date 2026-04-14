import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../hooks/UserStoreHook';

import { selectUser, selectToken, setCredentials, logout } from '../stores/slices/UserSlice';
import { authApi } from '../api/auth';


interface AuthWrapperInterface {
    children: React.ReactNode;
}
export const AuthWrapper: React.FC<AuthWrapperInterface> = ({ children }) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();

    // const isAuth = useAppSelector(selectIsAuth);
    const token = useAppSelector(selectToken); //localStorage.getItem('token');
    const user = useAppSelector(selectUser);

    
    useEffect(() => {
        const restoreSession = async () => {
            const publicRoutes = ['/', '/login', '/register'];
            const isPublicRoute = publicRoutes.includes(location.pathname);
            const from = location.state?.from || '/';

            if (isPublicRoute) return;
            if (!token) {
                dispatch(logout());
                navigate('/login', { state: { from: location.pathname } });
                if (location.pathname === '/login' || location.pathname === '/register') {
                    navigate(from);
                }
            }
            if (user) {
                if (location.pathname === '/login' || location.pathname === '/register')
                    navigate(from);
                return;
            }
            try {
                const data = await authApi.getProfile();
                dispatch(setCredentials(data));
                if (location.pathname === '/login' || location.pathname === '/register') {
                    navigate(from);
                }
            } catch (error) {
                dispatch(logout());
                navigate('/login', { state: { from: location.pathname } });
            }
        };
        restoreSession();
    }, [token, user, location.pathname, location.state?.from, dispatch, navigate]);

    return (
        <>
            {children}
        </>
    );
};