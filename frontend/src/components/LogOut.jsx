import React from "react";
import {useNavigate} from 'react-router-dom';

const LogOut = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <>
        <button className='login-btn button' onClick={handleLogOut}>
            Logga ut
        </button>        
        </>
    )
}

export default LogOut;