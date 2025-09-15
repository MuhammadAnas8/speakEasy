import React from 'react'
import Home from './pages/Home'
import { Routes , Route} from 'react-router-dom'
import Chat from './pages/Chat'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/home' element={ <Home /> } />
      <Route path='*' element={ <Home /> } />
      <Route path='/chat' element={ <Chat /> } />
    </Routes>

  )
}

export default App
