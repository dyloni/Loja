import React from 'react';
import { viewingRequests } from '../constants';
import { listings } from '../constants';

const ViewingRequestsPage: React.FC = () => {
    const getListingTitle = (propertyId: string) => {
        return listings.find(l => l.id === propertyId)?.title || 'Unknown Property';
    };

    return (
        <div className="p-4 pb-24">
            <h1 className="text-2xl font-bold mb-4">Viewing Requests</h1>
            <div className="space-y-4">
                {viewingRequests.map(req => (
                    <div key={req.id} className="bg-white p-4 rounded-lg shadow-sm border">
                        <p className="font-bold text-gray-800">{getListingTitle(req.propertyId)}</p>
                        <div className="flex items-center gap-3 mt-2">
                            <img src={req.tenant.avatarUrl} alt={req.tenant.name} className="w-10 h-10 rounded-full"/>
                            <div>
                                <p className="text-sm font-semibold">{req.tenant.name}</p>
                                <p className="text-xs text-gray-500">{`${req.dateTime.date}, ${req.dateTime.timeSlot}`}</p>
                            </div>
                        </div>
                        {req.message && <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded-md">"{req.message}"</p>}
                        <div className="flex justify-between items-center mt-3">
                            <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                {req.status}
                            </span>
                             {req.status === 'pending' && (
                                <div className="flex gap-2">
                                    <button className="text-xs bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300">Decline</button>
                                    <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700">Accept</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewingRequestsPage;
