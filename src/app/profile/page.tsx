"use client";

import ProfileHeader from "@/components/ui/blocks/profile/ProfileHeader";
import ProfileAbout from "@/components/ui/blocks/profile/ProfileAbout";
import ProfileStats from "@/components/ui/blocks/profile/ProfileStats";
import ProfileMyWords from "@/components/ui/blocks/profile/ProfileMyWords";
import ProfileMyFriends from "@/components/ui/blocks/profile/ProfileMyFriends";
import ProfileDataProvider from "@/components/ui/blocks/profile/ProfileDataProvider";

export default function ProfilePage() {
  return (
    <ProfileDataProvider>
      {(user, userStats) => (
        <div className="max-w-5xl mx-auto flex flex-col gap-6 p-4">
          <ProfileHeader user={user} />
          <ProfileStats userStats={userStats} />
          <ProfileAbout user={user} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProfileMyWords user={user} />
            <ProfileMyFriends />
          </div>
        </div>
      )}
    </ProfileDataProvider>
  );
}
