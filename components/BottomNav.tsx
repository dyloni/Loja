
import React from 'react';
import { SearchIcon, HeartIcon, ChatIcon, UserIcon } from './Icons';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 w-16 text-xs transition-colors ${isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-800'}`}>
    {icon}
    <span>{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 max-w-lg mx-auto z-20">
      <NavItem 
        icon={<SearchIcon className="w-6 h-6" />}
        label="Explore"
        isActive={activeTab === 'explore'}
        onClick={() => onTabChange('explore')}
      />
      <NavItem 
        icon={<HeartIcon className="w-6 h-6" />}
        label="Wishlists"
        isActive={activeTab === 'wishlists'}
        onClick={() => onTabChange('wishlists')}
      />
      <NavItem 
        icon={<ChatIcon className="w-6 h-6" />}
        label="Messages"
        isActive={activeTab === 'messages'}
        onClick={() => onTabChange('messages')}
      />
      <NavItem 
        icon={<UserIcon className="w-6 h-6" />}
        label="Profile"
        isActive={activeTab === 'profile'}
        onClick={() => onTabChange('profile')}
      />
    </nav>
  );
};

export default BottomNav;
