import React from 'react';
import type { Listing } from '../types';
import { StarIcon } from './Icons';

interface MapProps {
  listings: Listing[];
  onSelectListing: (listing: Listing) => void;
}

const Map: React.FC<MapProps> = ({ listings, onSelectListing }) => {
  // This is a mock map component. In a real app, you'd use a library like Google Maps, Leaflet, or Mapbox.
  return (
    <div className="h-[calc(100vh_-_240px)] bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 relative overflow-hidden">
      <div className="text-center z-0">
        <h3 className="text-lg font-bold">Map View Is Not Implemented</h3>
        <p>This is a placeholder for the map.</p>
      </div>
      
      {/* We can represent listings as dots on this mock map */}
      <div className="absolute inset-0 p-4">
        {listings.map((listing, index) => {
          // A very simple and deterministic way to spread out the pins on the mock map
          const top = `${10 + (index * 15) % 80}%`;
          const left = `${10 + (listing.title.length * 5) % 80}%`;
          
          return (
            <div 
              key={listing.id}
              className="absolute group z-10"
              style={{ top, left }}
              onClick={() => onSelectListing(listing)}
            >
              <div className="px-2 py-1 bg-white rounded-full shadow-md font-semibold cursor-pointer hover:scale-110 transition-transform">
                ${listing.pricePerMonth.toLocaleString()}
              </div>
              <div className="hidden group-hover:block absolute bottom-full mb-2 w-48 bg-white p-2 rounded-lg shadow-lg">
                <img src={listing.photos[0]} alt={listing.title} className="w-full h-20 object-cover rounded-md mb-1"/>
                <p className="text-xs font-bold truncate text-gray-800">{listing.title}</p>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <StarIcon className="w-3 h-3 text-gray-800" />
                  <span>{listing.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Map;