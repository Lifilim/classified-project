import { useEffect } from 'react';

import { selectUser, logout, selectToken, setUser } from '../stores/slices/UserSlice';
import { authApi } from '../api/authAPI';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../stores/storeHook';


interface AuthWrapperInterface {
    children: React.ReactNode;
}export const AuthWrapper: React.FC<AuthWrapperInterface> = ({ children }) => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const user = useAppSelector(selectUser);
    const token = useAppSelector(selectToken);

    const isAuthPage =
        location.pathname === '/login' ||
        location.pathname === '/register';

    const publicRoutes = ['/', '/login', '/register'];
    const isPublic = publicRoutes.includes(location.pathname);

    console.log('You were noticed by AuthWrapper (out of useEffect)')
    
    useEffect(() => {
        const restoreSession = async () => {
            console.log('You were noticed by AuthWrapper (useEffect)')

            if (token && !user) {
                try {
                    const data = await authApi.getProfile();
                    dispatch(setUser(data));
                } catch (error) {
                    console.log('AuthWrapper: logout: ' + error);
                    dispatch(logout());
                }
            }
        };

        restoreSession(); // eslint-disable-next-line
    }, [token, user]);

    if (!token && !isPublic && !isAuthPage) {
        return <Navigate to="/login" replace />;
    }

    if (token && !user) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};