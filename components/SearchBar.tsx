import React, { useState } from 'react';
import { SearchIcon } from './Icons';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(term);
  };

  return (
    <div className="p-4 bg-white">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Search by city or keyword..."
          value={term}
          onChange={handleInputChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-400" />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
