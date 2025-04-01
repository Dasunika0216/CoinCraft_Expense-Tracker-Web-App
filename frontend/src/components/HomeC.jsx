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
            <img src={logo} alt="CoinCraft Logo" className="h-20 w-21" />
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
            <span className="text-5xl font-bold text-[#5c6ef7] leading-tight lg:text-4xl md:text-3xl">
              Control your Money
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 leading-relaxed md:text-lg">
            Start Creating your budget and save ton of money
          </p>
          <div className="flex gap-4 lg:justify-center">
            <Link 
              to="/login"
              className="inline-flex items-center gap-2 bg-[#5c6ef7] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:bg-[#1a088a] hover:transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#5c6ef7]/20 md:px-6 md:py-3.5 md:text-base"
            >
              Get Started
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="px-16 py-12 bg-white text-center lg:px-8">
        <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8 lg:text-2xl">
          Why Choose CoinCraft?
        </h2>
        <div className="grid grid-cols-3 gap-8 lg:grid-cols-1">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-[#5c6ef7] text-white rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.341A8 8 0 116.34 6.34a8.001 8.001 0 0113.088 9.002z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Track Expenses</h3>
            <p className="text-gray-600">Easily monitor your spending and stay on top of your finances.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-[#5c6ef7] text-white rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h11M9 21V3m0 0l-6 6m6-6l6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Set Budgets</h3>
            <p className="text-gray-600">Create budgets to save money and achieve your financial goals.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-[#5c6ef7] text-white rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.341A8 8 0 116.34 6.34a8.001 8.001 0 0113.088 9.002z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Insights & Reports</h3>
            <p className="text-gray-600">Get detailed insights and reports to make informed decisions.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeC;