import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)


  //Använd componenter, lägg INTE in allt direkt här!
  //komponenter = Header, card, footer
  return (
    <>
      <div style={{backgroundColor: 'coral'}}>
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
    </>
  )
}

export default App
