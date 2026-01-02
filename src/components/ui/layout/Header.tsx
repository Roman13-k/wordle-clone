import React from "react";
import HowToPlayModal from "../blocks/game/modals/HowToPlayModal";
import HintModal from "../blocks/game/modals/HintModal";

export default function Header() {
  return (
    <header className="flex justify-end gap-4 w-full pt-4">
      <HowToPlayModal />
      <HintModal />
    </header>
  );
}
