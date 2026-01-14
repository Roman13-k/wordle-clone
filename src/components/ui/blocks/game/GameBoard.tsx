import GameWrapper from "@/components/ui/blocks/game/GameWrapper";
import Plates from "@/components/ui/blocks/game/Plates";
import Keys from "@/components/ui/blocks/game/Keys";
import ResultModal from "./modals/ResultModal";

export function GameBoard({ className }: { className?: string }) {
  return (
    <>
      <GameWrapper className={className}>
        <Plates />
        <Keys />
      </GameWrapper>

      <ResultModal />
    </>
  );
}
