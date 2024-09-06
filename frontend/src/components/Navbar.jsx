import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-gray-800 p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      {/* Brand/Logo */}
      <Link to="/" className="text-white text-2xl font-bold hover:text-gray-400 transition-colors duration-300">
        Home
      </Link>
      
      
      {/* Navigation Links */}
      <div className="flex space-x-6">
      <Link to="/rules" className="text-white text-lg hover:text-gray-300 transition-colors duration-300">
          Rules
        </Link>
       
        <Link to="/about-strategy" className="text-white text-lg hover:text-gray-300 transition-colors duration-300">
          About Strategy
        </Link>
        <Link to="/data" className="text-white text-lg hover:text-gray-300 transition-colors duration-300">
          Data
        </Link>
      
      </div>
    </div>
  </nav>
);

export default Navbar;
