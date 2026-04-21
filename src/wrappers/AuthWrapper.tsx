import { useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../hooks/UserStoreHook';

import { selectUser, setCredentials, logout } from '../stores/slices/UserSlice';
import { authApi } from '../api/auth';


interface AuthWrapperInterface {
    children: React.ReactNode;
}
export const AuthWrapper: React.FC<AuthWrapperInterface> = ({ children }) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useAppSelector(selectUser);
    const token = localStorage.getItem('token'); //useAppSelector(selectToken);
    
    // const [isInit, setIsInit] = useState(false);
    const from = location.state?.from?.pathname || '/'; 

    useEffect(() => {
        const restoreSession = async () => {

            if (!token || token === 'undefined' || token === 'null' || !user) {
                dispatch(logout());
                // setIsInit(true);
                return <Navigate to={'/login'} replace />;
            }
            if (user) {
                // setIsInit(true);
                // return;
                if (location.pathname === '/login' || location.pathname === '/register')
                    navigate(from);
                return;
            }
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
                // setIsInit(true);
            }
        };
        restoreSession();
    }, [dispatch, navigate, token, user, from, location.pathname]);

    // if (!isInit) return <div>Загрузка...</div>;

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
    if (user && isAuthPage) {
        const from = location.state?.from || '/';
        return <Navigate to={from} replace />;
    }

    if (!user && !isAuthPage) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return (
        <>
            {children}
        </>
    );
};