
import React, { useState, useEffect } from 'react';
import type { Listing, Filters } from './types';
import { mockListings } from './constants';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ListingGrid from './components/ListingGrid';
import ListingDetail from './components/ListingDetail';
import SkeletonLoader from './components/SkeletonLoader';
import MapToggleButton from './components/MapToggleButton';
import Map from './components/Map';
import BottomNav from './components/BottomNav';
import ProfilePage from './components/ProfilePage';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');

  // New state for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filters>({
    propertyTypes: [],
    bedrooms: null,
    minPrice: null,
    maxPrice: null,
  });

  // Effect to load initial data
  useEffect(() => {
    setTimeout(() => {
      setListings(mockListings);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Effect to apply filters and search
  useEffect(() => {
    if (listings.length === 0) return;

    let results = [...listings];

    // 1. Filter by search term
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      results = results.filter(listing =>
        listing.title.toLowerCase().includes(lowercasedTerm) ||
        listing.address.city.toLowerCase().includes(lowercasedTerm)
      );
    }

    // 2. Filter by property type
    if (filters.propertyTypes.length > 0) {
      results = results.filter(listing => filters.propertyTypes.includes(listing.propertyType));
    }

    // 3. Filter by bedrooms
    if (filters.bedrooms !== null) {
      if (filters.bedrooms >= 5) { // "5+" case
          results = results.filter(listing => listing.bedrooms >= 5);
      } else {
          results = results.filter(listing => listing.bedrooms === filters.bedrooms);
      }
    }

    // 4. Filter by price
    if (filters.minPrice !== null && filters.minPrice > 0) {
      results = results.filter(listing => listing.pricePerMonth >= filters.minPrice!);
    }
    if (filters.maxPrice !== null && filters.maxPrice > 0) {
      results = results.filter(listing => listing.pricePerMonth <= filters.maxPrice!);
    }

    setFilteredListings(results);
  }, [searchTerm, filters, listings]);

  const handleSelectListing = (listing: Listing) => {
    setSelectedListing(listing);
  };

  const handleBackToListings = () => {
    setSelectedListing(null);
  };

  const renderContent = () => {
    if (activeTab !== 'explore') {
      // For now, only profile page is different. Other tabs can show placeholders.
      if (activeTab === 'profile') {
        return <ProfilePage />;
      }
      return <div className="p-4 pt-10 text-center"><h1 className="text-2xl font-bold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1><p className="text-gray-600 mt-2">This feature is not yet implemented.</p></div>;
    }

    if (selectedListing) {
      return <ListingDetail listing={selectedListing} onBack={handleBackToListings} />;
    }

    if (isLoading) {
      return <SkeletonLoader />;
    }

    if (showMap) {
      return <Map listings={filteredListings} onSelectListing={handleSelectListing} />;
    }

    return <ListingGrid listings={filteredListings} onSelectListing={handleSelectListing} />;
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-50 min-h-screen font-sans">
      <Header />
      <main className="p-4 pb-20">
        {activeTab === 'explore' && !selectedListing && (
          <SearchBar
            onSearchTermChange={setSearchTerm}
            onFiltersChange={setFilters}
            activeFilters={filters}
            activeSearchTerm={searchTerm}
            filteredCount={filteredListings.length}
          />
        )}
        {renderContent()}
      </main>
      {activeTab === 'explore' && !selectedListing && (
        <MapToggleButton showMap={showMap} setShowMap={setShowMap} />
      )}
      {!selectedListing && <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />}
    </div>
  );
};

export default App;
