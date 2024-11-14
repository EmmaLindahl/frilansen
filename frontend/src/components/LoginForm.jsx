import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginForm = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Login submitted', { email, password });
        setLoading(true); 
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
              email,  
              password  
            });
            localStorage.setItem('token', response.data.token)
            navigate('/search')
            setMessage(response.data.message);
            setLoading(false); 
          } catch (error) {
            setMessage(error.response?.data?.error || 'Something went wrong');
            setLoading(false);
          }
    }

    return (
        <>
        <form onSubmit={handleLogin} className='login-form'>
        <h2>Logga in</h2>
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
            <button className='login-button-btn button'>Logga in</button>
            {loading && <p>Loading...</p>}
            {message && <p>{message}</p>}  
            <p>Har du inget konto? Registrera dig <Link to='/create-user' onClick={onClose}>här</Link></p>
        </form>
        </>
    )
}

export default LoginForm;