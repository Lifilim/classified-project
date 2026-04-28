// import React from 'react';
import { useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { Button, Drawer } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { toggleTheme } from '../stores/slices/SettingsSlice';

import { logout } from '../stores/slices/UserSlice';
// import { useAppSelector } from '../stores/storeHook';
// import '../ui/AppLayout.css';

export const AppLayout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    // const user = useAppSelector(selectUser);

    const handleLogin = () => {
        dispatch(toggleTheme());
    };
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };


    const [opened, { open, close }] = useDisclosure(false);


    return (
        <>
            {/* <nav style={{
                display: "flex", gap: "5vw", alignItems: "center", justifyContent: "space-between", padding: "10px 10px 0 3vw",
                position: "fixed", left: "0", right: "0", width: "100vw", zIndex: '10'
            }}> */}
            <Button variant="filled" radius="xl" color='var(--neutral-color)' size='xs'
                pos="fixed" top="1vh" left="1vw" style={{ zIndex: '10' }}
                onClick={handleLogin}>
            </Button>
            <Button variant="transparent" onClick={open} size="40px" p="0" c="var(--secondary-color)"
                pos="fixed" top="10px" right="10px" style={{ zIndex: '10' }}>
                ≡
            </Button>
            <Button
                variant="light"
                color="var(--secondary-color)"
                onClick={handleLogout}
                pos="fixed" top="10px" right="50px" style={{ zIndex: '10' }}
            >
                Выйти
            </Button>
            {/* </nav> */}
            <Drawer opened={opened} onClose={close} withCloseButton={true} position="right" size="clamp(100px, 62vw, 500px)"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 1,
                    color: '#000',
                }}
                // closeButtonProps={{ variant: 'transparent' }} 
                styles={{
                    content: { backgroundColor: 'var(--base-color)' },
                    header: { backgroundColor: 'var(--base-color)' },
                    close: { color: 'var(--secondary-color)', },
                }}>
                <Button w="90%" variant="transparent" onClick={() => { return navigate("/profile"); }} c="var(--secondary-color)">
                    Профиль
                </Button>
                <Button w="90%" variant="transparent" onClick={() => { return navigate("/feed"); }} c="var(--secondary-color)">
                    Лента
                </Button>
                <Button w="90%" variant="transparent" onClick={() => { return navigate("/"); }} c="var(--secondary-color)">
                    Главная
                </Button>
                 <Button w="90%" variant="transparent" onClick={() => { return navigate("/create"); }} c="var(--secondary-color)">
                    Создать карточку
                </Button>
            </Drawer>

            <div style={{ marginTop: '0px' }}>
                <Outlet />
            </div>
        </>
    )
}