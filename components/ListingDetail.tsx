import React from 'react';
import type { Listing } from '../types';
import { ArrowLeftIcon, StarIcon, HeartIcon } from './Icons';
import ViewingScheduler from './ViewingScheduler';

interface ListingDetailProps {
  listing: Listing;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

const ListingDetail: React.FC<ListingDetailProps> = ({ listing, onClose, isWishlisted, onToggleWishlist }) => {
  return (
    <div className="fixed inset-0 bg-white z-30 animate-slide-in-up overflow-y-auto">
      <div className="relative">
        <img src={listing.photos[0]} alt={listing.title} className="w-full h-64 object-cover" />
        <button onClick={onClose} className="absolute top-4 left-4 p-2 bg-white/80 rounded-full backdrop-blur-sm">
          <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <button onClick={onToggleWishlist} className="absolute top-4 right-4 p-2 bg-white/80 rounded-full backdrop-blur-sm">
          <HeartIcon className={`w-6 h-6 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
        </button>
      </div>

      <div className="p-4 pb-24">
        <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
        <p className="text-gray-600 mt-1">{`${listing.address.city}, ${listing.address.country}`}</p>
        
        <div className="flex items-center gap-2 mt-2 text-sm">
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold">{listing.rating}</span>
          </div>
          <span className="text-gray-500">({listing.reviewCount} reviews)</span>
        </div>

        <div className="flex items-center justify-between mt-4 border-t border-b py-4">
            <div>
                <p className="text-gray-500">Hosted by</p>
                <p className="font-semibold text-gray-800">{listing.host.name}</p>
            </div>
            <img src={listing.host.avatarUrl} alt={listing.host.name} className="w-12 h-12 rounded-full"/>
        </div>

        <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">About this place</h2>
            <p className="text-gray-700 leading-relaxed">{listing.description}</p>
        </div>

        <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Amenities</h2>
            <div className="grid grid-cols-2 gap-2">
                {listing.amenities.map(amenity => <p key={amenity} className="text-gray-700">- {amenity}</p>)}
            </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t flex justify-between items-center">
        <div>
            <p className="font-bold text-xl">${listing.pricePerMonth.toLocaleString()}</p>
            <p className="text-sm text-gray-500">per month</p>
        </div>
        <ViewingScheduler listing={listing} />
      </div>

    </div>
  );
};

export default ListingDetail;
