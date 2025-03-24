import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Income from './pages/Income'
import Expense from './pages/Expense'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/login' element = {<Login />} />
        <Route path = '/dashboard' element = {<Dashboard />} />
        <Route path = '/income' element = {<Income />} />
        <Route path = '/expense' element = {<Expense />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
