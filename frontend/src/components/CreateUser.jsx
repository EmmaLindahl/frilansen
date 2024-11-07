import React, { useState } from 'react';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastname: '',
        password: '',
        company: '',
        professionalrole: '',
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

            if (response.ok) {
                const data = await response.json();
                setMessage('User created successfully!');
                setFormData({
                    username: '',
                    firstName: '',
                    lastname: '',
                    password: '',
                    company: '',
                    professionalrole: '',
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
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Användarnamn:</label>
                    <input 
                        type='text' 
                        name='username' 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Förnamn:</label>
                    <input 
                        type='text' 
                        name='firstname' 
                        value={formData.firstname} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Efternamn:</label>
                    <input 
                        type='text' 
                        name='lastname' 
                        value={formData.lastname} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Lösenord:</label>
                    <input 
                        type='text' 
                        name='password' 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Företag:</label>
                    <input 
                        type='text' 
                        name='company' 
                        value={formData.company} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Yrkestitel:</label>
                    <input 
                        type='text' 
                        name='professionalrole' 
                        value={formData.professionalrole} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Område:</label>
                    <input 
                        type='text' 
                        name='area' 
                        value={formData.area} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Webbadress:</label>
                    <input 
                        type='text' 
                        name='webbaddress' 
                        value={formData.webbaddress} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Telefonnummer:</label>
                    <input 
                        type='text' 
                        name='phonenumber' 
                        value={formData.phonenumber} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Mailadress:</label>
                    <input 
                        type='text' 
                        name='email' 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type='submit'>Skapa Användare</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default CreateUser;