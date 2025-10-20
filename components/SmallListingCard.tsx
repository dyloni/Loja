import React from 'react';
import type { Listing } from '../types';

interface SmallListingCardProps {
    listing: Listing;
}

const SmallListingCard: React.FC<SmallListingCardProps> = ({listing}) => {
  return (
    <div className="w-40 shrink-0">
        <img src={listing.photos[0]} alt={listing.title} className="w-full h-24 object-cover rounded-lg"/>
        <p className="text-sm font-semibold truncate mt-1">{listing.title}</p>
        <p className="text-xs text-gray-500">${listing.pricePerMonth}/month</p>
    </div>
  );
};

export default SmallListingCard;
