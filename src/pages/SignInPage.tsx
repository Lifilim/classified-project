import '../ui/global.css';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials, selectIsAuth } from '../stores/slices/UserSlice';
import { useAppSelector } from '../hooks/UserStoreHook';

import { Link } from 'react-router-dom';
import { authApi } from '../api/auth';

import { InputBase, PasswordInput, Button, Anchor, Stack, Box } from '@mantine/core';


export const SignInPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [phone, setPhone] = useState('');
    const [passw, setPassw] = useState('');

    const isAuth = useAppSelector(selectIsAuth);
    useEffect(() => {
        if (isAuth) {
            navigate("/feed");
        }
    }, [isAuth, navigate]);
    

    const handleLogin = async ()  => {
        try {
            const data = await authApi.login(phone, passw);
            dispatch(setCredentials(data));
        } catch (error) {
            console.error("Login failed:", error);
            alert("Неверный телефон или пароль");
        }
    };

    // const unhandleLogin = () => {
    //     dispatch(logout());
    // };

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
                        value={passw}
                        onChange={(event) => setPassw(event.currentTarget.value)} 
                    />
                    <Button onClick={handleLogin}
                        variant="filled" color="var(--neutral-color)">
                        Войти
                    </Button>
                    {/* <Button onClick={unhandleLogin}
                        variant="filled" color="var(--secondary-color)">
                        Выйти
                    </Button> */}

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