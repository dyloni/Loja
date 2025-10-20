import React from 'react';
import { BuildingIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-20 h-16 flex items-center px-4">
      <div className="flex items-center gap-2">
        <BuildingIcon className="w-8 h-8 text-indigo-600" />
        <h1 className="text-xl font-bold text-gray-800">ZimRent</h1>
      </div>
    </header>
  );
};

export default Header;
