import React from 'react';

const SkeletonCard: React.FC = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
        <div className="bg-gray-300 w-full h-56"></div>
        <div className="p-4">
            <div className="flex justify-between items-start">
                <div className="w-3/4">
                    <div className="h-5 bg-gray-300 rounded w-full mb-1"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-1/6"></div>
            </div>
            <div className="flex gap-4 mt-2">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
            <div className="mt-4">
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            </div>
        </div>
    </div>
);


const SkeletonLoader: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export default SkeletonLoader;
