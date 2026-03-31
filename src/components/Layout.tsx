import React from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <div>
            {/* <nav> Navbar </nav> */}
            <Outlet />
        </div>
    )
}