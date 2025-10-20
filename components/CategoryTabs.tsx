import React from 'react';

const CategoryTabs: React.FC = () => {
  const categories = ['Houses', 'Apartments', 'Cottages', 'Townhouses'];
  return (
    <div className="p-4">
      <div className="flex space-x-4">
        {categories.map(cat => <button key={cat} className="px-4 py-2 rounded-full bg-gray-200">{cat}</button>)}
      </div>
    </div>
  );
};

export default CategoryTabs;
