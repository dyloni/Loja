import React from 'react';
import type { Listing } from '../types';
import ListingGrid from './ListingGrid';

interface WishlistPageProps {
  listings: Listing[];
  onSelectListing: (listing: Listing) => void;
  onToggleWishlist: (listingId: string) => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ listings, onSelectListing, onToggleWishlist }) => {
  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {listings.length > 0 ? (
        <ListingGrid
          listings={listings}
          onSelectListing={onSelectListing}
          wishlistedIds={new Set(listings.map(l => l.id))}
          onToggleWishlist={onToggleWishlist}
        />
      ) : (
        <div className="text-center pt-10">
          <p className="text-gray-600">Your wishlist is empty.</p>
          <p className="text-gray-500 text-sm mt-2">Tap the heart on any listing to save it here.</p>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
