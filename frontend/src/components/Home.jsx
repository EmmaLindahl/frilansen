import React, { useEffect, useState } from 'react';
import LoginModal from './LoginModal';
import GDPRInfo from './GDPRInfoWindow';
import './Home.css'
import {preloadSearch} from '../App'

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGDPR, setShowGDPR] = useState(false);
  const token = localStorage.getItem('token');;

  useEffect(() => {
    const GDPRaccepted = localStorage.getItem('gdprAccepted');
    if(!GDPRaccepted) {
      setShowGDPR(true);
    }
  }, []);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const GDPRclose = () => setShowGDPR(false);

  return (
    <div className='home-container'>
      {showGDPR ? ( 
        <GDPRInfo onClose={GDPRclose} /> 
      ) : (
        <>
        <div className='welcome-section'>
          <h1>
            Välkommen till Frilansen!
          </h1>
          {token? <h2>Kolla in våra frilansare!</h2> : 
            <h2>Logga in eller fortsätt</h2>   
          }
          
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, excepturi modi ad autem voluptates ullam et non nihil saepe sint voluptatum consequuntur sunt tenetur magni. Modi nisi consectetur quod itaque?</p>
          {!token && <button onMouseEnter={preloadSearch} className='login-button' onClick={openModal}>
            Logga in
          </button>}
        </div>
      
        <LoginModal isOpen={isModalOpen} onRequestClose={closeModal} />
      </>
      )}
    </div>
  )
}

export default Home;