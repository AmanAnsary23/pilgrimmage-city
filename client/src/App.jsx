import { useState } from 'react'
import './App.css'
import ItineraryPage from './component/ItineraryPage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ItineraryPage/>
    </>
  )
}

export default App
