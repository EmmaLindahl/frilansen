import { useState, useEffect } from 'react';
import React from 'react';
import LoginModal from './LoginModal';
import LogOut from './LogOut'
import './Header.css';
import { jwtDecode } from 'jwt-decode';
import { preloadSettings } from '../App';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOption] = useState(false);
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleMenu = () => setIsMenuOption(prevState => !prevState)
  const token = localStorage.getItem('token');

  useEffect(() => {
    // const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token); // HÄR!
         setUserId(decodedToken.userId);
         console.log(decodedToken)
    }
  }, []);

  useEffect(() => {
    if (userId) {
    // const token = localStorage.getItem('token');
    fetch(`/api/user/${userId}`, {headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }})
      .then(response => response.json())
      .then((data) => {
        setData(data);
        console.log("Fetch from Settings", data);
      });
  }
}, [userId]);

  return (
    <div className='container'>
      <button 
        className={`hamburger-button ${isMenuOpen ? 'rotate' : ''}`} 
        onClick={toggleMenu}>
        ☰
      </button>

      <p>Frilansen.se</p>

    <div className='container'>
      <div style={{ lineHeight: '1px', fontSize: '0.8em' }}>
       {data && <><p>Inloggad som:</p>
       <p>{data.firstname} {data.lastname}</p></>}
      </div>
      
      {data? <LogOut /> : <button className='login-btn' onClick={openModal}>
          Logga in
      </button>}
      
    </div>

      {isMenuOpen && (
        <div className='hamburger-menu'>
          <ul>
            <li><a href='/'>Hem</a></li>
            <li><a href='/search'>Sök Hantverkare</a></li>
            <li><a href='/create-user'>Skapa Användare</a></li>
            <li><a onMouseEnter={preloadSettings} href='/settings'>Inställningar</a></li>
          </ul>
        </div>
      )}
      <LoginModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
    )
}

export default Header;