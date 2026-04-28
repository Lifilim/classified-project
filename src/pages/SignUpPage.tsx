import axios from 'axios';
import { useEffect, useState } from 'react';
import { registerThunk, selectIsAuth } from '../stores/slices/UserSlice';

import { Link, useNavigate } from 'react-router-dom';
import { InputBase, PasswordInput, Button, Anchor, Stack, Box } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../stores/storeHook';


export const SignUpPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [phone, setPhone] = useState('');
    const [passw1, setPassw1] = useState('');
    const [passw2, setPassw2] = useState('');

    const isAuth = useAppSelector(selectIsAuth);
    useEffect(() => {
        if (isAuth) {
            navigate("/feed");
        }
    }, [isAuth, navigate]);
    

    const handleRegister = async () => {
        if (passw1 !== passw2) {
            alert('Пароли не совпадают');
            return;
        }
        try {
            dispatch(registerThunk({ phone, password: passw1, name: "someUserName" }));
        } catch (error) {
            console.error('Registration failed:', error);

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
        }
    };

    return (
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
    );
};