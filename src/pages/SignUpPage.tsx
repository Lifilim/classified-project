import React from 'react';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { setAuth } from '../stores/slices/UserSlice';
import { useAppSelector } from '../hooks/UserStoreHook';

import { Navigate, Link } from 'react-router-dom';
import { selectIsAuth } from '../stores/slices/UserSlice';

import { InputBase, PasswordInput, Button, Anchor, Stack, Box } from '@mantine/core';
// import { IMaskInput } from 'react-imask';

export const SignUpPage = () => {

    const dispatch = useDispatch();

    const [phone, setPhone] = useState('');
    const [passw1, setPassw1] = useState('');
    const [passw2, setPassw2] = useState('');

    if (useAppSelector(selectIsAuth)) {
        return <Navigate to="/feed" replace />;
    }

    const handleRegister = () => {
        // dispatch(setAuth(true));
    };

    return (
        <div>
            <Box w="clamp(300px, 80vw, 600px)" mx="auto" mt="xl"> {/* width, marginX, marginY*/}
                <Stack gap="md">
                    SignUpPage
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
                        value={passw1}
                        onChange={(event) => setPassw1(event.currentTarget.value)} 
                    />
                    <PasswordInput
                        label="Password again"
                        // description="Input description"
                        placeholder="Input password again"
                        value={passw2}
                        onChange={(event) => setPassw2(event.currentTarget.value)} 
                    />
                    <Button onClick={handleRegister}
                        variant="filled" color="rgb(44, 85, 189)">
                        Зарегистрироваться
                    </Button>

                    <Anchor
                        component={Link}
                        to="/login"
                        underline="not-hover"
                        c="dark"
                        ml="auto"
                    >
                        Есть аккаунт? тыкай сюды
                    </Anchor>
                </Stack>
            </Box>
        </div>
    );
};