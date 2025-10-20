import React from 'react';
import type { Listing } from '../types';
import SmallListingCard from './SmallListingCard';

interface HorizontalListingSectionProps {
    title: string;
    listings: Listing[];
}

const HorizontalListingSection: React.FC<HorizontalListingSectionProps> = ({title, listings}) => {
  return (
    <div className="py-4">
        <h2 className="text-xl font-bold px-4 mb-2">{title}</h2>
        <div className="flex space-x-4 overflow-x-auto px-4 pb-2">
            {listings.map(listing => <SmallListingCard key={listing.id} listing={listing} />)}
        </div>
    </div>
  );
};

export default HorizontalListingSection;
