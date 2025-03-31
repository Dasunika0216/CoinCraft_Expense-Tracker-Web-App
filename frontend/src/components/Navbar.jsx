import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');                
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isLoggedIn = !!localStorage.getItem('token'); 

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
    
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center transform hover:scale-105 transition-transform duration-200">
              <img src={logo} alt="CoinCraft Logo" className="h-15 w-12" />
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className={`relative text-gray-700 hover:text-[#0b0259] px-3 py-2 text-sm font-medium transition-all duration-200 group ${isActive('/dashboard') ? 'text-[#0b0259]' : '' }`} > Dashboard
            <span className={`absolute bottom-0 left-0 h-0.5 bg-[#0b0259] transition-all duration-300 ${isActive('/dashboard') ? 'w-full' : 'w-0 group-hover:w-full' }`}></span>
            </Link>

            <Link to="/income" className={`relative text-gray-700 hover:text-[#0b0259] px-3 py-2 text-sm font-medium transition-all duration-200 group ${isActive('/income') ? 'text-[#0b0259]' : '' }`} > Income
            <span className={`absolute bottom-0 left-0 h-0.5 bg-[#0b0259] transition-all duration-300 ${isActive('/income') ? 'w-full' : 'w-0 group-hover:w-full' }`}></span>
            </Link>

            <Link to="/budget" className={`relative text-gray-700 hover:text-[#0b0259] px-3 py-2 text-sm font-medium transition-all duration-200 group ${isActive('/budget') ? 'text-[#0b0259]' : '' }`} > Expenses
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#0b0259] transition-all duration-300 ${
                isActive('/budget') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
  
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-[#0b0259] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#031b3a] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-[#0b0259] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#031b3a] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
