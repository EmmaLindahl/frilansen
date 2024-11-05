import {BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Settings from './components/Settings'
import Search from './components/Search'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import { useState, useEffect } from 'react';

function App() {

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then((data) =>
        console.log(data))
    }, []);

  //RÖR EJ APP UTAN ATT SÄGA TILL!
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      <Footer />
  </Router>
  )
}

export default App
