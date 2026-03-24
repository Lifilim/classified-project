import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../stores/slices/UserSlice';

import { isPhone } from '../util/phoneCheker';
import stylesLogin from '../ui/LoginForm/LoginForm.module.css'; 
import stylesInput from '../ui/Inputs/LoginInput.module.css'; 
import stylesButton from '../ui/Buttons/LoginButton.module.css'; 

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!identifier || !password) {
            setError('Оба поля обязательны');
            return;
        }
        const standartPhone = isPhone(identifier);
        if (!standartPhone) {
            setError('Не корректный номер телефона');
            return;
        } else {
            setIdentifier(standartPhone);
        }

        dispatch(setAuth(true)); //!!!!!!!!!!!!!!!!

        navigate('/feed');
    };

    return (
        <div style={{
            maxWidth: 400,
            margin: '80px auto',
            padding: 24,
            border: '1px solid #ddd',
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* LoginPage */}

            <h2 style={{ marginTop: 0, marginBottom: 20, textAlign: 'center' }}>
                Войти
            </h2>

            {error && (
                <div style={{
                    marginBottom: 16,
                    padding: 10,
                    backgroundColor: '#ffe6e6',
                    color: '#d32f2f',
                    borderRadius: 6,
                    fontSize: 14
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin}>
                <div className={stylesLogin.form}>
                    <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>
                        Телефон или email
                    </label>
                    <input
                        type="text"
                        className={stylesInput.input}
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="+7 900 000-00-00 или example@mail.ru"
                    />
                </div>

                <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>
                        Пароль
                    </label>
                    <input
                        type="password"
                        className={stylesInput.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите пароль"
                    />
                </div>

                <button
                    type="submit"
                    className={stylesButton.button}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                >
                    Войти
                </button>
            </form>

            <p style={{ marginTop: 16, textAlign: 'center', fontSize: 14 }}>
                Нет аккаунта?{' '}
                <a href="/register" style={{ textDecoration: 'none', color: '#007bff' }}>
                    Зарегистрироваться
                </a>
            </p>




        </div>
    )
}

// export default LoginPage;