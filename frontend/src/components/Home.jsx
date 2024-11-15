import React, { useState } from 'react';
import LoginModal from './LoginModal';
import './Home.css'
import {preloadSearch} from '../App';
import SnickarBild from'../SnickarbildINTEAI.png';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('token');;
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='home-container'>
        <>
        <div className='welcome-section'>
          <img async src={SnickarBild} alt="Snickarbild" style={{maxWidth: '500px', borderRadius: '15px'}}/>
          <h1>
            Välkommen till Frilansen!
          </h1>
          {token? <h2>Kolla in våra frilansare!</h2> : 
            <h2>Logga in eller fortsätt</h2>   
          }
          
          <p>På Frilansen möts professionella hantverkare och privatpersoner som söker pålitlig hjälp för allt från renoveringsprojekt till mindre reparationer. Oavsett om du är snickare, elektriker, målare eller erbjuder andra tjänster inom bygg och hantverk, är Frilansen platsen där du kan visa upp dina färdigheter och nå ut till fler kunder.</p>

          <p>För dig som söker hantverkare är Frilansen enkelt att använda – här kan du snabbt hitta och kontakta yrkespersoner med rätt erfarenhet och expertis. Läs recensioner, se tidigare projekt och hitta rätt match för just ditt behov!</p>

          <p style={{fontWeight: 'bold',}}>Skapa ett konto idag och ta första steget mot ett enklare sätt att anlita eller bli anlitad för kvalitetsarbete!</p>
          {!token && <button onMouseEnter={preloadSearch} className='login-button' onClick={openModal}>
            Logga in
          </button>}
        </div>
      
        <LoginModal isOpen={isModalOpen} onRequestClose={closeModal} />
      </>
    </div>
  )
}

export default Home;