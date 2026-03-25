import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { selectIsAuth } from '../stores/slices/UserSlice';

import { useAppSelector } from '../hooks/UserStoreHook';


interface AuthWrapperInterface {
    children: React.ReactNode;
}
export const AuthWrapper: React.FC<AuthWrapperInterface> = ({children}) => {

    const isAuth: boolean = useAppSelector(selectIsAuth);

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    };

    return <Outlet />;
};