import { useState } from 'react'
import {BrowserRouter as Router,Route, Routes, Link} from 'react-router-dom';
import Home from './components/Home';
import Settings from './components/Settings'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)


  //Använd componenter, lägg INTE in allt direkt här!
  //komponenter = Header, card, footer
  return (
    <Router>
    <>
      <div style={{ backgroundColor: 'coral' }}>
        Header
      </div>
      <h1>Snickare Nära Dig</h1>
      <div className="card">
        <p>
          ....Lista över Snickare....
        </p>
      </div>
      <p className="read-the-docs">
        Lägg in ngt i botten
      </p>

      {/* Navigation links for testing */}
      <nav>
        <Link to="/">Home</Link> | <Link to="/settings">Settings</Link>
      </nav>

      {/* Routes setup with React Router v6 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  </Router>
  )
}

export default App
