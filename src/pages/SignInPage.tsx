import React from 'react';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../stores/slices/UserSlice';
import { useAppSelector } from '../hooks/UserStoreHook';

import { Navigate, Link } from 'react-router-dom';
import { selectIsAuth } from '../stores/slices/UserSlice';

import { InputBase, PasswordInput, Button, Anchor, Stack, Box } from '@mantine/core';
// import { IMaskInput } from 'react-imask';

// interface SignInPageInterface {
//     isAuth: boolean;
// }
export const SignInPage = () => {
    // const {isAuth} = props

    const dispatch = useDispatch();

    const [phone, setPhone] = useState('');
    const [passw, setPassw] = useState('');

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
        <div>
            <Box w="clamp(300px, 80vw, 600px)" mx="auto" mt="xl"> {/* width, marginX, marginY*/}
                <Stack gap="md">
                    SignInPage
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
                        variant="filled" color="rgb(44, 85, 189)">
                        Войти
                    </Button>
                    <Button onClick={unhandleLogin}
                        variant="filled" color="rgba(7, 23, 64, 1)">
                        Выйти
                    </Button>

                    <Anchor
                        component={Link}
                        to="/register"
                        underline="not-hover"
                        c="dark"
                    >
                        Нет аккаунта? тыкай сюды
                    </Anchor>
                </Stack>
            </Box>
        </div>
    );
};