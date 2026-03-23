import React from 'react';


interface CommonWrapperInterface {
    children: React.ReactNode;
}
export const CommonWrapper: React.FC<CommonWrapperInterface> = ({children}) => {

    return (
        <> 
            {children}
        </>
    );
};