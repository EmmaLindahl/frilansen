import {BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
// import './App.css'
import { useState, useEffect, lazy, Suspense } from 'react';

const Home = lazy(() => import('./components/Home'))
const CreateUser = lazy(() => import('./components/CreateUser'))
const Search = lazy(() => import('./components/Search'))
const Settings = lazy(() => import('./components/Settings'))

export const preloadHome = () => import('./components/Home')
export const preloadSearch = () => import('./components/Search')
export const preloadSettings = () => import('./components/Settings')
export const preloadCreateUser = () => import('./components/CreateUser')

function App() {
  //Don't think we use this?
  const [data, setData] =useState(null)

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then((data) => {
        setData(data),
        console.log("Fetch from App:", data)}
      )
    }, []);

  return (
    <Router>
      <Header/>
      <div className='routeContainer'>
        <Suspense fallback={<>Loading...</>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/settings" element={<Settings />} />
            <Route path='/create-user' element={<CreateUser />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
  </Router>
  )
}

export default App
