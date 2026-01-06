import HowToPlayModal from "../../blocks/game/modals/HowToPlayModal";
import HintModal from "../../blocks/game/modals/HintModal";
import { ThemeToggle } from "./ThemeToogle";

export default function Header() {
  return (
    <header className="flex justify-between gap-4 w-full pt-4">
      <ThemeToggle />
      <div className="flex gap-4">
        <HowToPlayModal />
        <HintModal />
      </div>
    </header>
  );
}
