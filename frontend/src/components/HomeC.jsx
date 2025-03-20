import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';


const HomeC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f5f7ff] to-white relative">
      {/* Background Gradient Overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-[rgba(67,57,242,0.05)] to-transparent pointer-events-none" />

      {/* Navbar */}
      <nav className="px-16 py-6 flex justify-between items-center lg:px-8 lg:py-4">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img src={logo} alt="CoinCraft Logo" className="h-40 w-21" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-between px-16 py-8 max-w-[1400px] mx-auto gap-8 lg:px-8 lg:flex-col lg:text-center">
        {/* Hero Content */}
        <div className="flex-1 max-w-[600px] lg:max-w-full">
          <h1 className="flex flex-col gap-2 mb-6">
            <span className="text-[3.5rem] font-bold text-[#1A1A1A] leading-tight lg:text-4xl md:text-3xl">
              Manage Your Expense
            </span>
            <span className="text-5xl font-bold text-[#4339F2] leading-tight lg:text-4xl md:text-3xl">
              Control your Money
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 leading-relaxed md:text-lg">
            Start Creating your budget and save ton of money
          </p>
          <div className="flex gap-4 lg:justify-center">
            <Link 
              to="/login"
              className="inline-flex items-center gap-2 bg-[#4339F2] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:bg-[#372fd0] hover:transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#4339F2]/20 md:px-6 md:py-3.5 md:text-base"
            >
              Get Started
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeC;