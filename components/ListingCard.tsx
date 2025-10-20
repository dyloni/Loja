import React from 'react';
import type { Listing } from '../types';
import { StarIcon, HeartIcon } from './Icons';

interface ListingCardProps {
  listing: Listing;
  onClick: () => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onClick, isWishlisted, onToggleWishlist }) => {

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onClick for the card
    onToggleWishlist();
  };

  return (
    <div onClick={onClick} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img src={listing.photos[0]} alt={listing.title} className="w-full h-48 object-cover" />
        <button 
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          <HeartIcon className={`w-6 h-6 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-gray-800 truncate pr-2">{listing.title}</h3>
            <div className="flex items-center gap-1 shrink-0">
                <StarIcon className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold text-sm">{listing.rating.toFixed(1)}</span>
            </div>
        </div>
        <p className="text-gray-600 text-sm">{`${listing.address.city}, ${listing.address.country}`}</p>
        <p className="mt-2 font-semibold text-gray-900">
          ${listing.pricePerMonth.toLocaleString()} <span className="font-normal text-gray-500">/ month</span>
        </p>
      </div>
    </div>
  );
};

export default ListingCard;
