import '../ui/global.css';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../stores/storeHook';

import { Link } from 'react-router-dom';

import { InputBase, PasswordInput, Button, Anchor, Stack, Box } from '@mantine/core';
import { loginThunk, logout, selectIsAuth } from '../stores/slices/UserSlice';


export const SignInPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [phone, setPhone] = useState('');
    const [password, setPassw] = useState('');

    const isAuth = useAppSelector(selectIsAuth);
    useEffect(() => {
        if (isAuth) {
            navigate("/feed");
        }
    }, [isAuth, navigate]);
    

    const handleLogin = async ()  => {
        try {
            dispatch(loginThunk({phone, password}));
        } catch (error) {
            dispatch(logout());
            console.error("Login failed:", error);
            alert("Неверный телефон или пароль");
        }
    };

    return (
        <>
            <Box w="clamp(300px, 80vw, 600px)" mx="auto" pt="7vh"> {/* width, marginX, marginY*/}
                <Stack gap="md">
                    <InputBase
                        label="Your phone"
                        // component={IMaskInput}
                        // mask="+7 (000) 000-0000"
                        placeholder="Your phone"
                        value={phone}
                        onChange={(event) => setPhone(event.currentTarget.value)} 
                        />
                    <PasswordInput
                        label="Password"
                        // description="Input description"
                        placeholder="Input password"
                        value={password}
                        onChange={(event) => setPassw(event.currentTarget.value)} 
                    />
                    <Button onClick={handleLogin}
                        variant="filled" color="var(--neutral-color)">
                        Войти
                    </Button>

                    <Anchor
                        component={Link}
                        to="/register"
                        underline="not-hover"
                        c="var(--secondary-color)"
                    >
                        Нет аккаунта? тыкай сюды
                    </Anchor>
                </Stack>
            </Box>
        </>
    );
};