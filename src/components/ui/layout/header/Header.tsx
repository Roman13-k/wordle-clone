import HowToPlayModal from "../../blocks/game/modals/HowToPlayModal";
import HintModal from "../../blocks/game/modals/HintModal";
import { ThemeToggle } from "./ThemeToogle";
import AuthModal from "../../blocks/auth/AuthModal";

export default function Header() {
  return (
    <header className="flex justify-between gap-4 w-full pt-4">
      <div className="flex gap-4">
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
