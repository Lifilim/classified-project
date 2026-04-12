import React from 'react';

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { selectIsAuth } from '../stores/slices/UserSlice';

import { useAppSelector } from '../hooks/UserStoreHook';


interface AuthWrapperInterface {
    children: React.ReactNode;
}
export const AuthWrapper: React.FC<AuthWrapperInterface> = ({ children }) => {

    const isAuth: boolean = useAppSelector(selectIsAuth);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        const publicRoutes = ['/', '/login', '/register'];
        const isPublicRoute = publicRoutes.includes(location.pathname);

        if (!isAuth && !isPublicRoute) {
            navigate('/login', { state: { from: location.pathname } });
        }
    }, [isAuth, location.pathname, navigate]);

    return (
        <>
            {children}
        </>
    );
};