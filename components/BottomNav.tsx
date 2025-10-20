import React from 'react';
import { HomeIcon, HeartIcon, EnvelopeIcon, UserCircleIcon, DocumentDuplicateIcon } from './Icons';

type Page = 'home' | 'wishlist' | 'requests' | 'profile' | 'manage';

interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isLandlord: boolean;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-500'}`}>
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage, isLandlord }) => {
  const tenantItems = [
    { id: 'home', label: 'Explore', icon: <HomeIcon className="w-6 h-6" /> },
    { id: 'wishlist', label: 'Wishlist', icon: <HeartIcon className="w-6 h-6" /> },
    { id: 'requests', label: 'Requests', icon: <EnvelopeIcon className="w-6 h-6" /> },
    { id: 'profile', label: 'Profile', icon: <UserCircleIcon className="w-6 h-6" /> },
  ];
  
  const landlordItems = [
    { id: 'manage', label: 'Listings', icon: <DocumentDuplicateIcon className="w-6 h-6" /> },
    { id: 'requests', label: 'Requests', icon: <EnvelopeIcon className="w-6 h-6" /> },
    { id: 'profile', label: 'Profile', icon: <UserCircleIcon className="w-6 h-6" /> },
  ];

  const navItems = isLandlord ? landlordItems : tenantItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.05)] z-20 h-16 flex justify-around">
      {navItems.map(item => (
        <NavItem 
          key={item.id}
          icon={item.icon}
          label={item.label}
          isActive={activePage === item.id}
          onClick={() => setActivePage(item.id as Page)}
        />
      ))}
    </nav>
  );
};

export default BottomNav;
