import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Clock, Scan, LogIn } from 'lucide-react';

const MenuPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Parking Spot Finder</h1>
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {/* Home */}
        <div className="p-4 bg-white shadow-md rounded-2xl flex flex-col items-center">
          <Home className="w-10 h-10 mb-2 text-gray-700" />
          <Link to="/" className="text-lg font-semibold text-blue-600 hover:underline">Home</Link>
        </div>

        {/* Parking History */}
        <div className="p-4 bg-white shadow-md rounded-2xl flex flex-col items-center">
          <Clock className="w-10 h-10 mb-2 text-gray-700" />
          <Link to="/history" className="text-lg font-semibold text-blue-600 hover:underline">History</Link>
        </div>

        {/* QR Scanner */}
        <div className="p-4 bg-white shadow-md rounded-2xl flex flex-col items-center">
          <Scan className="w-10 h-10 mb-2 text-gray-700" />
          <Link to="/scan" className="text-lg font-semibold text-blue-600 hover:underline">Scan QR</Link>
        </div>

        {/* Login */}
        <div className="p-4 bg-white shadow-md rounded-2xl flex flex-col items-center">
          <LogIn className="w-10 h-10 mb-2 text-gray-700" />
          <Link to="/login" className="text-lg font-semibold text-blue-600 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
export {};
