import React, { useState } from 'react';
import './CreateUser.css';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        password: '',
        company: '',
        professionalrole: 'snickare',
        area: '',
        webbaddress: '',
        phonenumber: '',
        email: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(formData)

            if (response.ok) {
                const data = await response.json();
                setMessage('User created successfully!');
                setFormData({
                    firstname: '',
                    lastname: '',
                    password: '',
                    company: '',
                    professionalrole: 'snickare',
                    area: '',
                    webbaddress: '',
                    phonenumber: '',
                    email: ''
                });
            } else {
                setMessage('Misslyckades att skapa användare. Var god försök igen.')
            }
        } catch (error) {
            console.error(error);
            setMessage('Misslyckades att skapa användare. Var god försök igen.')
        }
    };
    
    return (
        <div>
            <h2>Skapa ny användare</h2>
            <div className='card'>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
             {/* Mail & Lösenord */}
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <label className='labelStyle'>
                            <span style={{ minWidth: '100px', display: 'inline-block' }}>Mail:</span>
                            <input 
                                type='text' 
                                name='email' 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </label>

                        <label className='labelStyle'>
                            <span style={{ minWidth: '100px', display: 'inline-block' }}>Lösenord:</span>
                            <input 
                                type='text' 
                                name='password' 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                        </label>
                    </div>

                    {/* För & Efternamn */}
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <label className='labelStyle'>
                            <span style={{ minWidth: '100px', display: 'inline-block' }}>Förnamn:</span>
                            <input 
                                type='text' 
                                name='firstname' 
                                value={formData.firstname} 
                                onChange={handleChange} 
                                required 
                            />
                        </label>

                        <label className='labelStyle'>
                            <span style={{ minWidth: '100px', display: 'inline-block' }}>Efternamn:</span>
                            <input 
                                type='text' 
                                name='lastname' 
                                value={formData.lastname} 
                                onChange={handleChange} 
                                required 
                            />
                        </label>
                    </div>

                    {/* Bolag & Roll */}
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <label className='labelStyle'>
                            <span style={{ minWidth: '100px', display: 'inline-block' }}>Företag:</span>
                            <input 
                                type='text' 
                                name='company' 
                                value={formData.company} 
                                onChange={handleChange} 
                                required 
                            />
                        </label>

                        <label className='labelStyle'>
                            <span style={{ minWidth: '100px', display: 'inline-block' }}>Roll:</span>
                            <select 
                                name='professionalrole' 
                                value={formData.professionalrole} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="snickare">snickare</option>
                                <option value="målare">målare</option>
                                <option value="takläggare">takläggare</option>
                                <option value="elektriker">elektriker</option>
                            </select>
                        </label>
                    </div>

                    {/* Område */}
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <label className='labelStyle'>
                            <span style={{ minWidth: '100px', display: 'inline-block' }}>Verksam inom:</span>
                            <input 
                                type='text' 
                                name='area' 
                                value={formData.area} 
                                onChange={handleChange} 
                                required 
                            />
                        </label>
                    </div>

                    {/* Webbadress & Telefon */}
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: 'auto' }}>
                        <label className='labelStyle'>
                            <span style={{ minWidth: '100px', display: 'inline-block' }}>Webbadress:</span>
                            <input 
                                type='text' 
                                name='webbaddress' 
                                value={formData.webbaddress} 
                                onChange={handleChange} 
                                required 
                            />
                        </label>

                        <label className='labelStyle'>
                            <span style={{ minWidth: '100px', display: 'inline-block' }}>Telefon:</span>
                            <input 
                                type='text' 
                                name='phonenumber' 
                                value={formData.phonenumber} 
                                onChange={handleChange} 
                                required 
                            />
                        </label>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
                        <button type='submit' className='submit'>Skapa Användare</button>
                    </div>
                </form>
            </div>
            {message && <p>{message}</p>}
        </div>
    )
}

export default CreateUser;