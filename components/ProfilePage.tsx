import React from 'react';
import type { User } from '../types';
import { ChevronRightIcon } from './Icons';

interface ProfilePageProps {
  user: User;
  onSwitchUser: () => void;
}

const ProfileMenuItem: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex justify-between items-center p-4 border-b">
    <span className="text-gray-700">{label}</span>
    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
  </div>
);

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onSwitchUser }) => {
  return (
    <div className="p-4 pb-24">
      <div className="flex items-center gap-4 mb-6">
        <img src={user.avatarUrl} alt={user.name} className="w-20 h-20 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500">Viewing as {user.role}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <ProfileMenuItem label="Personal Information" />
        {user.role === 'landlord' && <ProfileMenuItem label="Payments & Payouts" />}
        <ProfileMenuItem label="Notifications" />
        <ProfileMenuItem label="Help Center" />
        <ProfileMenuItem label="Terms of Service" />
      </div>

      <div className="mt-6">
        <button 
          onClick={onSwitchUser}
          className="w-full bg-indigo-100 text-indigo-700 font-semibold py-3 rounded-lg hover:bg-indigo-200 transition"
        >
          Switch to {user.role === 'tenant' ? 'Landlord' : 'Tenant'} View
        </button>
      </div>
       <div className="mt-4">
        <button className="w-full text-red-600 font-semibold py-3">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
