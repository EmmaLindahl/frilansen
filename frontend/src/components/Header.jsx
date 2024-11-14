import { useState, useEffect } from 'react';
import React from 'react';
import LoginModal from './LoginModal';
import LogOut from './LogOut'
import './Header.css';
import { jwtDecode } from 'jwt-decode';
import { preloadCreateUser, preloadHome, preloadSearch, preloadSettings } from '../App';

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
    if (token) {
        const decodedToken = jwtDecode(token);
         setUserId(decodedToken.userId);
         console.log(decodedToken)
    }
  }, []);

  useEffect(() => {
    if (userId) {
    fetch(`/api/user/${userId}`, {headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }})
      .then(response => response.json())
      .then((data) => {
        setData(data);
      });
  }
}, [userId]);

  return (
    <div className='container'>
      <button 
        className={`hamburgerBtn ${isMenuOpen ? 'rotate' : ''}`} 
        onClick={toggleMenu}>
        ☰
      </button>

      <p>Frilansen.se</p>

    <div className='login-container'>
      <div style={{ lineHeight: '1px', fontSize: '0.8em' }}>
       {data && <><p>Inloggad som:</p>
       <p>{data.firstname} {data.lastname}</p></>}
      </div>
      
      {data? <LogOut /> : <button className='login-btn button' onClick={openModal}>
          Logga in
      </button>}
      
    </div>

      {isMenuOpen && (
        <div className='hamburger-menu'>
          <ul>
            <li><a onMouseEnter={preloadHome} href='/'>Hem</a></li>
            <li><a onMouseEnter={preloadSearch} href='/search'>Sök Hantverkare</a></li>
            <li><a onMouseEnter={preloadCreateUser} href='/create-user'>Skapa Användare</a></li>
            <li><a  onMouseEnter={preloadSettings} href='/settings' style={{
              color: token ? 'gray' : 'inherit',cursor: token ? 'not-allowed' : 'pointer'}}>Inställningar</a></li>
          </ul>
        </div>
      )}
      <LoginModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
    )
}

export default Header;