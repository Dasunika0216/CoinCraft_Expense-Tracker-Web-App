import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-white text-center py-12 border-t border-gray-200">
      {/* Logo Section */}
      <div className="mb-6">
        <img src={logo} alt="CoinCraft Logo" className="h-12 mx-auto" />
      </div>

      {/* Description Section */}
      <p className="text-gray-600 max-w-2xl mx-auto mb-8 font-serif">
        CoinCraft is your ultimate destination for managing your finances. We pride ourselves on offering seamless expense tracking, budget management, and financial goal-setting tools. Stay connected with us on social media to explore the latest updates and features.
      </p>

      {/* Copyright Section */}
      <p className="text-gray-500 text-sm font-bold font-serif">
        © {new Date().getFullYear()} CoinCraft - Simplify Your Financial Journey.
      </p>
    </footer>
  );
};

export default Footer;