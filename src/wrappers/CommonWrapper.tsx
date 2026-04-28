import React from 'react';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../stores/slices/SettingsSlice';

interface CommonWrapperInterface {
    children: React.ReactNode;
}
export const CommonWrapper: React.FC<CommonWrapperInterface> = ({children}) => {

    const themeMode = useSelector(selectTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', themeMode);
    }, [themeMode]);

    return (
        <> 
            {children}
        </>
    );
};