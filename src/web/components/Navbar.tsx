import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link to="/" className="flex items-center text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/appointments" className="flex items-center text-gray-700 hover:text-gray-900">
              Book Appointment
            </Link>
            <Link to="/services" className="flex items-center text-gray-700 hover:text-gray-900">
              Services
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}