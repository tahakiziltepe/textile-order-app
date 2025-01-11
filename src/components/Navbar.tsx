import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">Tekstil Sipariş Sistemi</span>
            </Link>
            <div className="ml-10 flex space-x-4">
              <Link to="/suppliers" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Tedarikçiler
              </Link>
              <Link to="/analytics" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Analiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 