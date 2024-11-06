import { useState } from 'react';
import React from 'react';
import LoginModal from './LoginModal';
import './Header.css';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className='container'>
      <p>Frilansen.se</p>
      <button className='login-btn' onClick={openModal}>
          Logga in
      </button>
      <LoginModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
    )
}

export default Header;