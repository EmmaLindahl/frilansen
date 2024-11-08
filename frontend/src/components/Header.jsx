import { useState } from 'react';
import React from 'react';
import LoginModal from './LoginModal';
import './Header.css';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOption] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleMenu = () => setIsMenuOption(prevState => !prevState)

  return (
    <div className='container'>
      <button 
        className={`hamburger-button ${isMenuOpen ? 'rotate' : ''}`} 
        onClick={toggleMenu}>
        ☰
      </button>

      <p>Frilansen.se</p>

      <button className='login-btn' onClick={openModal}>
          Logga in
      </button>

      {isMenuOpen && (
        <div className='hamburger-menu'>
          <ul>
            <li><a href='/'>Hem</a></li>
            <li><a href='/search'>Sök Hantverkare</a></li>
            <li><a href='/create-user'>Skapa Användare</a></li>
            <li><a href='/settings'>Inställningar</a></li>
          </ul>
        </div>
      )}
      <LoginModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
    )
}

export default Header;