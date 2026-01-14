import ProfileHeader from "@/components/ui/blocks/profile/ProfileHeader";
import ProfileAbout from "@/components/ui/blocks/profile/ProfileAbout";
import ProfileStats from "@/components/ui/blocks/profile/ProfileStats";
import ProfileMyWords from "@/components/ui/blocks/profile/ProfileMyWords";
import ProfileMyFriends from "@/components/ui/blocks/profile/ProfileMyFriends";

export default function ProfilePage() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 p-4">
      <ProfileHeader />
      <ProfileStats />
      <ProfileAbout />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ProfileMyWords />
        <ProfileMyFriends />
      </div>
    </div>
  );
}
