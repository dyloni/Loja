import React, { useState } from 'react';
import { listings as initialListings, users } from './constants';
import type { Listing, User } from './types';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ListingGrid from './components/ListingGrid';
import ListingDetail from './components/ListingDetail';
import BottomNav from './components/BottomNav';
import Map from './components/Map';
import MapToggleButton from './components/MapToggleButton';
import ProfilePage from './components/ProfilePage';
import WishlistPage from './components/WishlistPage';
import ViewingRequestsPage from './components/ViewingRequestsPage';
import ManageListingsPage from './components/ManageListingsPage';

type Page = 'home' | 'wishlist' | 'requests' | 'profile' | 'manage';

const App: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [filteredListings, setFilteredListings] = useState<Listing[]>(initialListings);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());
  const [showMap, setShowMap] = useState(false);
  const [activePage, setActivePage] = useState<Page>('home');
  
  // Example user, can be switched between tenant and landlord
  const [currentUser, setCurrentUser] = useState<User>(users.tenant);

  const handleSearch = (searchTerm: string) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const results = listings.filter(listing =>
      listing.title.toLowerCase().includes(lowercasedTerm) ||
      listing.address.city.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredListings(results);
  };

  const handleSelectListing = (listing: Listing) => {
    setSelectedListing(listing);
  };

  const handleCloseDetail = () => {
    setSelectedListing(null);
  };

  const handleToggleWishlist = (listingId: string) => {
    setWishlistedIds(prevIds => {
      const newIds = new Set(prevIds);
      if (newIds.has(listingId)) {
        newIds.delete(listingId);
      } else {
        newIds.add(listingId);
      }
      return newIds;
    });
  };

  const wishlistedListings = listings.filter(listing => wishlistedIds.has(listing.id));

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <>
            <SearchBar onSearch={handleSearch} />
            <div className="px-4 pb-24">
              {showMap ? (
                <Map listings={filteredListings} onSelectListing={handleSelectListing} />
              ) : (
                <ListingGrid
                  listings={filteredListings}
                  onSelectListing={handleSelectListing}
                  wishlistedIds={wishlistedIds}
                  onToggleWishlist={handleToggleWishlist}
                />
              )}
            </div>
            <MapToggleButton showMap={showMap} setShowMap={setShowMap} />
          </>
        );
      case 'wishlist':
        return <WishlistPage listings={wishlistedListings} onSelectListing={handleSelectListing} onToggleWishlist={handleToggleWishlist} />;
      case 'requests':
        return <ViewingRequestsPage />;
      case 'manage':
        return <ManageListingsPage />;
      case 'profile':
        return <ProfilePage user={currentUser} onSwitchUser={() => setCurrentUser(currentUser.role === 'tenant' ? users.landlord : users.tenant)} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="pt-16">
        {renderPage()}
      </main>
      {/* FIX: Pass a function to onToggleWishlist that calls handleToggleWishlist with the selected listing's ID. */}
      {selectedListing && <ListingDetail listing={selectedListing} onClose={handleCloseDetail} onToggleWishlist={() => handleToggleWishlist(selectedListing.id)} isWishlisted={wishlistedIds.has(selectedListing.id)} />}
      <BottomNav activePage={activePage} setActivePage={setActivePage} isLandlord={currentUser.role === 'landlord'}/>
    </div>
  );
};

export default App;