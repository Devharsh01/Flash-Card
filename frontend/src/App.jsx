import React from 'react'
import './App.css'
import Home from './Pages/Home'
import AdminPanel from './Pages/AdminPanel'
import { Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'

const App = () => {

  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<AdminPanel/>}/>
      </Routes>
    </div>
  )
}

export default App
