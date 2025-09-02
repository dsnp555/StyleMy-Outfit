
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold font-display text-indigo-600">
          StyleMy Outfit
        </h1>
        <nav>
          <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">How it works</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
