import { useState } from 'react';
import ProfileHeader from '../components/profilepage/ProfileHeader';
import ProfileSidebar from '../components/profilepage/ProfileSidebar';
import ProfileStats from '../components/profilepage/ProfileStats';
import ProfileTabs from '../components/profilepage/ProfileTabs';
import EditProfileModal from '../components/profilepage/EditProfileModal';
import { mockUserData } from '../data/mockUserData';

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(mockUserData);
  const [isEditing, setIsEditing] = useState(false);


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileHeader user={user} onEdit={() => setIsEditing(true)} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <ProfileStats user={user} />
            <ProfileTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              user={user}
            />
          </div>

          <ProfileSidebar />
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditing}
        user={user}
        onClose={() => setIsEditing(false)}
        onSave={(updatedUser) => {
          setUser(updatedUser);
          setIsEditing(false);
        }}
      />
    </div>
  );
};


