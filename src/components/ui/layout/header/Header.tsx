"use client";
import HowToPlayModal from "../../blocks/game/modals/HowToPlayModal";
import HintModal from "../../blocks/game/modals/HintModal";
import { ThemeToggle } from "./ThemeToogle";
import AuthModal from "../../blocks/auth/AuthModal";
import { Puzzle } from "lucide-react";
import Link from "next/link";
import { useGetUser } from "@/hooks/api/queries/useGetUser";
import UserAvatar from "../../blocks/profile/UserAvatar";
import StreakModal from "../../blocks/profile/streak/StreakModal";
import { usePathname } from "next/navigation";
import { NotificationsDialog } from "./NotificationDialog";

export default function Header() {
  const { data: user } = useGetUser();
  const pathname = usePathname();

  const showHintsandTutorial = pathname === "/" || pathname === "/game";

  return (
    <header className="flex justify-between gap-4 w-full pt-4">
      <div className="flex items-center gap-4">
        <Link href={"/"}>
          <h2 className="flex items-center gap-2 text-2xl font-extrabold cursor-pointer select-none text-primary hover:text-primary/80 transition-colors">
            <Puzzle className="h-6 w-6" />
            WORDIX
          </h2>
        </Link>

        {user ? (
          <>
            <Link href={"/profile"}>
              <UserAvatar className="h-10 w-10" cover={user.cover} size={18} />
            </Link>
            <StreakModal
              current_streak={user.current_streak}
              last_played_date={user.last_played_date}
            />
          </>
        ) : (
          <AuthModal />
        )}

        <ThemeToggle />
      </div>

      <div className="flex gap-4">
        <NotificationsDialog />
        {showHintsandTutorial && (
          <>
            <HowToPlayModal />
            <HintModal />
          </>
        )}
      </div>
    </header>
  );
}
