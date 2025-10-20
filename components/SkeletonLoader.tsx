import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="w-full h-48 bg-gray-300"></div>
          <div className="p-4">
            <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-300 rounded mt-2"></div>
            <div className="h-5 w-1/4 bg-gray-300 rounded mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
