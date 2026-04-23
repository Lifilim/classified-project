import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/UserStoreHook';
import { Link } from 'react-router-dom';

import { authApi } from '../api/auth';
import { setCredentials, selectIsAuth } from '../stores/slices/UserSlice';

import { InputBase, PasswordInput, Button, Anchor, Stack, Box } from '@mantine/core';

import axios from 'axios';

export const SignUpPage = () => {

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const [phone, setPhone] = useState('');
    const [passw1, setPassw1] = useState('');
    const [passw2, setPassw2] = useState('');

    if (useAppSelector(selectIsAuth)) {
        // return <Navigate to="/feed" replace />;
        return <></>;
    }

    const handleRegister = async () => {
        if (passw1 !== passw2) {
            alert('Пароли не совпадают');
            return;
        }
        try {
            const data = await authApi.register(phone, passw1, "someUserName");
            dispatch(setCredentials(data));
            // navigate('/feed');
        } catch (error) {
            // console.error('Registration failed:', error);
            if (axios.isAxiosError(error)) {
                console.log('Статус:', error.response?.status);
                console.log('Тело ошибки:', error.response?.data);
                console.log('Сообщение:', error.message);

                // const errorMessage = error.response?.data?.message || 'Registration failed';
            } else if (error instanceof Error) {
                console.log('Обычная ошибка:', error.message);
            } else {
                console.log('Неизвестная ошибка:', error);
            }
            //throw error;
        }
    };

    return (
        <>
            <Box w="clamp(300px, 80vw, 600px)" mx="auto" mt="xl"> {/* width, marginX, marginY*/}
                <Stack gap="md">
                    {/* SignUpPage */}
                    <InputBase
                        label="Your phone"
                        placeholder="Your phone"
                        value={phone}
                        onChange={(event) => setPhone(event.currentTarget.value)}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Input password"
                        value={passw1}
                        onChange={(event) => setPassw1(event.currentTarget.value)}
                    />
                    <PasswordInput
                        label="Password again"
                        placeholder="Input password again"
                        value={passw2}
                        onChange={(event) => setPassw2(event.currentTarget.value)}
                    />
                    <Button onClick={handleRegister}
                        variant="filled" color="var(--secondary-color)">
                        Зарегистрироваться
                    </Button>

                    <Anchor
                        component={Link}
                        to="/login"
                        underline="not-hover"
                        c="var(--secondary-color)"
                        ml="auto"
                    >
                        Есть аккаунт? тыкай сюды
                    </Anchor>
                </Stack>
            </Box>
        </>
    );
};