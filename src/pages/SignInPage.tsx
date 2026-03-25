import React from 'react';

import { useDispatch } from 'react-redux'; 
import { setAuth } from '../stores/slices/UserSlice'; 
import { useAppSelector } from '../hooks/UserStoreHook';

import { Navigate } from 'react-router-dom';
import { selectIsAuth } from '../stores/slices/UserSlice';

// interface SignInPageInterface {
//     isAuth: boolean;
// }
export const SignInPage = () => {
    // const {isAuth} = props

    const dispatch = useDispatch();

    if (useAppSelector(selectIsAuth)) {
        return <Navigate to="/feed" replace />;
    }

    const handleLogin = () => {
        dispatch(setAuth(true));
    };

    const unhandleLogin = () => {
        dispatch(setAuth(false));
    };

    return (
        <div> SignInPage 
            <button onClick={handleLogin}>Войти</button>
            <button onClick={unhandleLogin}>Выйти</button>
        </div>
    );
};