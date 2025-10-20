import React, { useState } from 'react';
import type { Filters } from '../types';
import { SearchIcon, FilterIcon } from './Icons';
import FilterPanel from './FilterPanel';

interface SearchBarProps {
  onSearchTermChange: (term: string) => void;
  onFiltersChange: (filters: Filters) => void;
  activeFilters: Filters;
  activeSearchTerm: string;
  filteredCount: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearchTermChange, 
  onFiltersChange, 
  activeFilters, 
  activeSearchTerm,
  filteredCount 
}) => {
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const handleApply = (searchTerm: string, filters: Filters) => {
    onSearchTermChange(searchTerm);
    onFiltersChange(filters);
    setShowFilterPanel(false);
  };

  const getFilterSummary = () => {
    const parts = [];
    if (activeFilters.propertyTypes.length > 0) parts.push(activeFilters.propertyTypes.slice(0,2).join(', '));
    if (activeFilters.bedrooms) parts.push(`${activeFilters.bedrooms}${activeFilters.bedrooms >= 5 ? '+' : ''} beds`);
    if (activeFilters.minPrice || activeFilters.maxPrice) {
      const min = activeFilters.minPrice ? `$${activeFilters.minPrice}` : '';
      const max = activeFilters.maxPrice ? `$${activeFilters.maxPrice}` : '';
      parts.push(`${min}-${max}`);
    }
    if (parts.length === 0) return "Any property type • Any beds • Any price";
    return parts.join(' • ');
  };


  return (
    <>
      <div 
        className="my-4 p-2 rounded-full shadow-md border border-gray-200 flex items-center bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={() => setShowFilterPanel(true)}
        role="button"
        aria-label="Open search and filter panel"
      >
        <div className="flex-shrink-0 pl-2">
          <SearchIcon className="h-6 w-6 text-gray-600" />
        </div>
        <div className="flex-grow ml-3 overflow-hidden">
          <p className="w-full bg-transparent focus:outline-none text-sm font-semibold text-gray-800 truncate">
            {activeSearchTerm || "Where to?"}
          </p>
          <p className="text-xs text-gray-500 truncate">{getFilterSummary()}</p>
        </div>
        <div className="flex-shrink-0 pr-2">
          <button className="p-2 border border-gray-300 rounded-full" aria-label="Open filters">
            <FilterIcon className="h-4 w-4 text-gray-700" />
          </button>
        </div>
      </div>

      {showFilterPanel && (
        <FilterPanel 
          initialFilters={activeFilters}
          initialSearchTerm={activeSearchTerm}
          onApply={handleApply}
          onClose={() => setShowFilterPanel(false)}
          filteredCount={filteredCount}
        />
      )}
    </>
  );
};

export default SearchBar;