
import React from 'react';
import { 
  UserCircleIcon, 
  CreditCardIcon, 
  LockClosedIcon, 
  HomeIcon, 
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  ArrowLeftOnRectangleIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
  PencilIcon
} from './Icons';

const mockUser = {
  name: 'Tanaka Moyo',
  email: 'tanaka.moyo@example.com',
  avatarUrl: 'https://picsum.photos/seed/profileUser/200/200',
  joinedDate: 'August 2023',
  isVerified: true,
  isHost: true,
};

const ProfileSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
    <h3 className="p-4 text-lg font-semibold text-gray-800 border-b">{title}</h3>
    <div className="divide-y divide-gray-200">
      {children}
    </div>
  </div>
);

const ProfileLink: React.FC<{ icon: React.ReactNode; label: string; onClick?: () => void }> = ({ icon, label, onClick = () => {} }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
    <div className="flex items-center gap-4">
      <div className="text-gray-600">{icon}</div>
      <span className="font-medium text-gray-700">{label}</span>
    </div>
    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
  </button>
);


const ProfilePage: React.FC = () => {
  return (
    <div>
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center py-6">
        <div className="relative">
          <img src={mockUser.avatarUrl} alt={mockUser.name} className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg" />
        </div>
        <h1 className="text-2xl font-bold mt-4 text-gray-900">{mockUser.name}</h1>
        <p className="text-sm text-gray-500">Joined in {mockUser.joinedDate}</p>
        
        {mockUser.isVerified && (
          <div className="mt-2 inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
            <ShieldCheckIcon className="w-4 h-4" />
            Identity Verified
          </div>
        )}

        <button className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-700 underline hover:text-primary transition-colors">
          <PencilIcon className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      {/* Account Settings */}
      <ProfileSection title="Account Settings">
        <ProfileLink icon={<UserCircleIcon className="w-6 h-6" />} label="Personal information" />
        <ProfileLink icon={<CreditCardIcon className="w-6 h-6" />} label="Payments and payouts" />
        <ProfileLink icon={<LockClosedIcon className="w-6 h-6" />} label="Login & security" />
      </ProfileSection>

      {/* Hosting Section */}
      {mockUser.isHost && (
        <ProfileSection title="Hosting">
          <ProfileLink icon={<HomeIcon className="w-6 h-6" />} label="Manage your listings" />
          <ProfileLink icon={<CurrencyDollarIcon className="w-6 h-6" />} label="Earnings dashboard" />
        </ProfileSection>
      )}

      {/* Support Section */}
      <ProfileSection title="Support">
        <ProfileLink icon={<QuestionMarkCircleIcon className="w-6 h-6" />} label="Help Center" />
        <ProfileLink icon={<DocumentTextIcon className="w-6 h-6" />} label="Terms of Service" />
      </ProfileSection>
      
      {/* Logout Button */}
      <div className="mt-8">
        <button className="w-full flex items-center justify-center gap-2 text-primary font-bold py-3 px-6 rounded-lg hover:bg-red-50 transition-colors">
          <ArrowLeftOnRectangleIcon className="w-6 h-6" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
