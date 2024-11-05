import React, { useState } from 'react';
import './LoginForm.css'

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login submitted', { email, password });
    }

    return (
        <form onSubmit={handleLogin} className='login-form'>
            <label>Mailadress:</label>
            <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label>Lösenord:</label>
            <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </form>
    )
}

export default LoginForm;