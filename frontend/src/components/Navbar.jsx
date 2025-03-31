import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
            <Link
              to="/dashboard"
              className="flex items-center transform hover:scale-105 transition-transform duration-200"
            >
              <img src={logo} alt="CoinCraft Logo" className="h-15 w-12" />
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link
              to="/dashboard"
              className={`relative text-gray-700 hover:text-[#0b0259] px-3 py-2 text-sm font-medium transition-all duration-200 group ${
                isActive("/dashboard") ? "text-[#0b0259]" : ""
              }`}
            >
              Dashboard
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-[#0b0259] transition-all duration-300 ${
                  isActive("/dashboard") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>

            <Link
              to="/income"
              className={`relative text-gray-700 hover:text-[#0b0259] px-3 py-2 text-sm font-medium transition-all duration-200 group ${
                isActive("/income") ? "text-[#0b0259]" : ""
              }`}
            >
              Income
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-[#0b0259] transition-all duration-300 ${
                  isActive("/income") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>

            <Link
              to="/budget"
              className={`relative text-gray-700 hover:text-[#0b0259] px-3 py-2 text-sm font-medium transition-all duration-200 group ${
                isActive("/budget") ? "text-[#0b0259]" : ""
              }`}
            >
              Expenses
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-[#0b0259] transition-all duration-300 ${
                  isActive("/budget") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>

            {isLoggedIn ? (
              <button
                onClick={() => setShowLogoutModal(true)}
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

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-96 transform transition-transform scale-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6 text-center leading-relaxed">
              Are you sure you want to logout? You will need to log in again to
              access your account.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  handleLogout();
                  setShowLogoutModal(false);
                }}
                className="px-6 py-2 bg-[#0b0259] text-white rounded-md hover:bg-[#031b3a] hover:shadow-md transition-all duration-200"
              >
                Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 hover:shadow-md transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;