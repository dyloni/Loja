
import React from 'react';
import type { Listing } from '../types';
import ListingCard from './ListingCard';

interface ListingGridProps {
  listings: Listing[];
  onSelectListing: (listing: Listing) => void;
}

const ListingGrid: React.FC<ListingGridProps> = ({ listings, onSelectListing }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {listings.length > 0 ? (
        listings.map(listing => (
          <ListingCard 
            key={listing.id} 
            listing={listing} 
            onClick={() => onSelectListing(listing)} 
          />
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full pt-10">No listings found for your search.</p>
      )}
    </div>
  );
};

export default ListingGrid;
