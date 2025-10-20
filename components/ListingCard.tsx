import React from 'react';
import type { Listing } from '../types';
import { StarIcon, HeartIcon, BedIcon, BathIcon } from './Icons';

interface ListingCardProps {
  listing: Listing;
  onClick: () => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onClick }) => {
  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // This would be implemented to toggle the saved state of the listing
    console.log(`Toggling save for listing ID: ${listing.id}`);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={onClick}>
      {/* Image Section */}
      <div className="relative">
        <img src={listing.photos[0]} alt={listing.title} className="w-full h-56 object-cover" />
        <button
          onClick={handleHeartClick}
          className="absolute top-3 right-3 p-1 bg-white/80 rounded-full text-gray-700 hover:text-red-500 transition-colors"
          aria-label="Save listing"
        >
          <HeartIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Info Section */}
      <div className="p-4">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-gray-800 text-lg leading-tight truncate">{listing.title}</h3>
                <p className="text-gray-500 text-sm truncate">{listing.address.city}, {listing.address.country}</p>
            </div>
            {listing.rating > 0 && (
              <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                <StarIcon className="w-4 h-4 text-gray-800" />
                <span className="font-semibold text-gray-600">{listing.rating.toFixed(1)}</span>
              </div>
            )}
        </div>
      
        <div className="mt-2 text-sm text-gray-700 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <BedIcon className="w-4 h-4 flex-shrink-0 text-gray-600" />
            <span className="truncate">{listing.bedrooms} bed{listing.bedrooms > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BathIcon className="w-4 h-4 flex-shrink-0 text-gray-600" />
            <span className="truncate">{listing.bathrooms} bath{listing.bathrooms > 1 ? 's' : ''}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="font-bold text-gray-900 text-lg">${listing.pricePerMonth.toLocaleString()}
            <span className="text-sm font-normal text-gray-600"> / month</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
