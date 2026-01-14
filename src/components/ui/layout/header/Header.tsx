import HowToPlayModal from "../../blocks/game/modals/HowToPlayModal";
import HintModal from "../../blocks/game/modals/HintModal";
import { ThemeToggle } from "./ThemeToogle";
import AuthModal from "../../blocks/auth/AuthModal";
import { Puzzle } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between gap-4 w-full pt-4">
      <div className="flex gap-4">
        <Link href={"/"}>
          <h2 className="flex items-center gap-2 text-2xl font-extrabold cursor-pointer select-none text-primary hover:text-primary/80 transition-colors">
            <Puzzle className="h-6 w-6" />
            WORDIX
          </h2>
        </Link>

        <AuthModal />
        <ThemeToggle />
      </div>

      <div className="flex gap-4">
        <HowToPlayModal />
        <HintModal />
      </div>
    </header>
  );
}
