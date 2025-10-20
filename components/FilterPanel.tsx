
import React, { useState, useEffect } from 'react';
import type { Filters } from '../types';
import { propertyTypes } from '../constants';
import { BackIcon } from './Icons';

interface FilterPanelProps {
  initialFilters: Filters;
  initialSearchTerm: string;
  onApply: (searchTerm: string, filters: Filters) => void;
  onClose: () => void;
  filteredCount: number;
}

const bedroomOptions = [1, 2, 3, 4, 5]; // 5 represents 5+

const FilterPanel: React.FC<FilterPanelProps> = ({ initialFilters, initialSearchTerm, onApply, onClose, filteredCount }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handlePropertyTypeToggle = (type: string) => {
    setFilters(prev => {
      const newTypes = prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type];
      return { ...prev, propertyTypes: newTypes };
    });
  };

  const handleBedroomsSelect = (beds: number | null) => {
    setFilters(prev => ({ ...prev, bedrooms: prev.bedrooms === beds ? null : beds }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value === '' ? null : parseInt(value, 10),
    }));
  };
  
  const handleClear = () => {
    setSearchTerm('');
    setFilters({ propertyTypes: [], bedrooms: null, minPrice: null, maxPrice: null });
  };
  
  const handleApply = () => {
    onApply(searchTerm, filters);
  };
  
  // Add a little animation on mount
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className={`fixed inset-0 bg-white z-30 flex flex-col font-sans transition-transform duration-300 ease-in-out ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
        {/* Header */}
        <header className="flex-shrink-0 flex items-center p-4 border-b border-gray-200">
            <button onClick={onClose} className="p-2 -ml-2" aria-label="Close filters"><BackIcon className="w-6 h-6" /></button>
            <h2 className="text-xl font-bold text-center flex-grow">Filters</h2>
        </header>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-4 space-y-6">
            {/* Search Term */}
            <section>
              <label htmlFor="search-term" className="text-lg font-semibold text-gray-800">Where to?</label>
              <input 
                id="search-term"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search destinations, city"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              />
            </section>
            
            <hr className="border-gray-100" />
            
            {/* Property Type */}
            <section>
                <h3 className="text-lg font-semibold text-gray-800">Property type</h3>
                <div className="grid grid-cols-2 gap-3 mt-3">
                    {propertyTypes.map(type => (
                        <button key={type} onClick={() => handlePropertyTypeToggle(type)} className={`p-3 border rounded-lg text-left transition-colors ${filters.propertyTypes.includes(type) ? 'bg-gray-900 text-white border-gray-900' : 'bg-white hover:border-gray-500'}`}>
                            {type}
                        </button>
                    ))}
                </div>
            </section>

            <hr className="border-gray-100" />

            {/* Bedrooms */}
            <section>
                <h3 className="text-lg font-semibold text-gray-800">Bedrooms</h3>
                <div className="flex gap-2 mt-3 flex-wrap">
                    <button onClick={() => handleBedroomsSelect(null)} className={`px-5 py-2 border rounded-full transition-colors ${filters.bedrooms === null ? 'bg-gray-900 text-white' : 'hover:border-gray-500'}`}>Any</button>
                    {bedroomOptions.map(num => (
                        <button key={num} onClick={() => handleBedroomsSelect(num)} className={`px-5 py-2 border rounded-full transition-colors ${filters.bedrooms === num ? 'bg-gray-900 text-white' : 'hover:border-gray-500'}`}>
                            {num}{num === 5 ? '+' : ''}
                        </button>
                    ))}
                </div>
            </section>
            
            <hr className="border-gray-100" />

            {/* Price Range */}
            <section>
                <h3 className="text-lg font-semibold text-gray-800">Price range</h3>
                <p className="text-sm text-gray-500">Price per month in USD</p>
                <div className="flex items-center gap-4 mt-3">
                    <div className="flex-1">
                        <label htmlFor="minPrice" className="text-xs text-gray-600 block mb-1">Minimum</label>
                        <input type="number" name="minPrice" id="minPrice" value={filters.minPrice ?? ''} onChange={handlePriceChange} placeholder="$ Min" className="w-full p-3 border border-gray-300 rounded-lg" />
                    </div>
                    <span className="text-gray-400 pt-5">-</span>
                    <div className="flex-1">
                        <label htmlFor="maxPrice" className="text-xs text-gray-600 block mb-1">Maximum</label>
                        <input type="number" name="maxPrice" id="maxPrice" value={filters.maxPrice ?? ''} onChange={handlePriceChange} placeholder="$ Max" className="w-full p-3 border border-gray-300 rounded-lg" />
                    </div>
                </div>
            </section>
        </div>

        {/* Footer */}
        <footer className="flex-shrink-0 p-4 border-t border-gray-200 flex justify-between items-center bg-white">
            <button onClick={handleClear} className="font-semibold underline">Clear all</button>
            <button onClick={handleApply} className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors">
                Show {filteredCount} listings
            </button>
        </footer>
    </div>
  );
};

export default FilterPanel;
