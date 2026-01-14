import { GameBoard } from "@/components/ui/blocks/game/GameBoard";
import ConfirmModal from "@/components/ui/blocks/game/modals/ConfirmModal";

export default function MainPage() {
  return (
    <>
      <GameBoard className="flex flex-col gap-15 h-full items-center justify-center" />

      <ConfirmModal />
    </>
  );
}
