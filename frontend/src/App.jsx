import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/login' element = {<Login />} />
        <Route path = '/dashboard' element = {<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
