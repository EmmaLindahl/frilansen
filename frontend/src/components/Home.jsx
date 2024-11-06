import React, { useState } from 'react';
import LoginModal from './LoginModal';
import './Home.css'

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className='home-container'>
      <div className='welcome-section'>
        <h1>
          Välkommen till Frilansen!
        </h1>
        <h2>
          Logga in eller fortsätt
        </h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, excepturi modi ad autem voluptates ullam et non nihil saepe sint voluptatum consequuntur sunt tenetur magni. Modi nisi consectetur quod itaque?</p>
        <button className='login-button' onClick={openModal}>
          Logga in
        </button>
      </div>
    
      <LoginModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  )
}

export default Home;