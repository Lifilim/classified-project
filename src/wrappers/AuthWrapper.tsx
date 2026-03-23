import React from 'react';


interface AuthWrapperInterface {
    children: React.ReactNode;
}
export const AuthWrapper: React.FC<AuthWrapperInterface> = ({children}) => {

    const isAuth: boolean = true

    return (
        <div> 
        </div>
    );
};