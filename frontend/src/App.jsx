import {BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Settings from './components/Settings'
import Search from './components/Search'
import Header from './components/Header'
import Footer from './components/Footer'
import CreateUser from './components/CreateUser';
import './App.css'
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] =useState(null)

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then((data) => {
        setData(data),
        console.log("Fetch from App:", data)}
      )
    }, []);

  //RÖR EJ APP UTAN ATT SÄGA TILL!
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
        <Route path='/create-user' element={<CreateUser />} />
      </Routes>

      <Footer />
  </Router>
  )
}

export default App
