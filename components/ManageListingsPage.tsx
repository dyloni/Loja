import React from 'react';
import { listings } from '../constants';

const ManageListingsPage: React.FC = () => {
    // For a landlord, we'll just show all listings for now.
    const mylistings = listings.filter(l => l.host.id === 'host-1' || l.host.id === 'host-3');

    return (
        <div className="p-4 pb-24">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Your Listings</h1>
              <button className="bg-indigo-600 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                + Add New
              </button>
            </div>
            <div className="space-y-4">
                {mylistings.map(listing => (
                    <div key={listing.id} className="bg-white p-3 rounded-lg shadow-sm border flex gap-4">
                        <img src={listing.photos[0]} alt={listing.title} className="w-24 h-24 object-cover rounded-md"/>
                        <div className="flex-1">
                            <p className="font-bold text-gray-800">{listing.title}</p>
                            <p className="text-sm text-gray-500">{listing.analytics.viewCount} views • {listing.analytics.inquiryCount} inquiries</p>
                            <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full mt-2 inline-block ${listing.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {listing.isAvailable ? 'Available' : 'Rented'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageListingsPage;
