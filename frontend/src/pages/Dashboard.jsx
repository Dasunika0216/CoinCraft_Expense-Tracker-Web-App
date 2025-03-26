import React from 'react'
import Navbar from '../components/Navbar'

const Dashboard = () => {
  return (
      <div>
        <div className='bg-gray-100 h-screen w-full '>
          <Navbar />
          <div className='flex justify-center pt-20 h-screen'>
            <h1 className='text-4xl font-bold'>Dashboard</h1>
          </div>
        </div>
      </div>
  )
}

export default Dashboard
