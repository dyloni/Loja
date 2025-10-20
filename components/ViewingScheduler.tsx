import React, { useState } from 'react';
import type { Listing } from '../types';
import Notification from './Notification';

interface ViewingSchedulerProps {
    listing: Listing;
}

const ViewingScheduler: React.FC<ViewingSchedulerProps> = ({ listing }) => {
    const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

    const handleRequestViewing = () => {
        // In a real app, this would open a modal to select a date and time
        // and then submit a request to the backend.
        console.log(`Requesting a viewing for ${listing.title}`);
        setNotification({ message: 'Viewing request sent!', type: 'success' });
    };

    return (
        <>
            <button
                onClick={handleRequestViewing}
                className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
            >
                Request Viewing
            </button>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </>
    );
};

export default ViewingScheduler;
