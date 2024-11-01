import {BrowserRouter as Router,Route, Routes, Link} from 'react-router-dom';
import Home from './components/Home';
import Settings from './components/Settings'
import './App.css'

function App() {

  //Använd componenter, lägg INTE in allt direkt här!
  //komponenter = Header, card, footer
  return (
    <Router>
        <div style={{ backgroundColor: 'coral' }}>
        Header
      </div>
           
    {/* <nav>
        <Link to="/">Home</Link> | <Link to="/settings">Settings</Link>
      </nav> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      <p className="read-the-docs">
        Lägg in ngt i botten
      </p>
  </Router>
  )
}

export default App
