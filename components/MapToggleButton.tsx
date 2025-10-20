import React from 'react';
import { MapIcon, ListIcon } from './Icons';

interface MapToggleButtonProps {
  showMap: boolean;
  setShowMap: (show: boolean) => void;
}

const MapToggleButton: React.FC<MapToggleButtonProps> = ({ showMap, setShowMap }) => {
  return (
    <div className="fixed bottom-[80px] left-1/2 -translate-x-1/2 z-10">
      <button 
        onClick={() => setShowMap(!showMap)} 
        className="bg-gray-900 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg hover:bg-gray-700 transition-colors"
      >
        {showMap ? <ListIcon className="w-5 h-5" /> : <MapIcon className="w-5 h-5" />}
        <span className="text-sm font-medium">{showMap ? 'Show list' : 'Show map'}</span>
      </button>
    </div>
  );
};

export default MapToggleButton;
