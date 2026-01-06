import MainContainer from "../ui/layout/MainContainer";
import Plates from "../ui/blocks/game/Plates";
import Keys from "../ui/blocks/game/Keys";
import Header from "../ui/layout/header/Header";
import ConfirmModal from "../ui/blocks/game/modals/ConfirmModal";
import ResultModal from "../ui/blocks/game/modals/ResultModal";
import GameWrapper from "../ui/blocks/game/GameWrapper";

export default function MainScreen() {
  return (
    <MainContainer>
      <Header />
      <main>
        <GameWrapper className="flex flex-col gap-15 h-full items-center justify-center">
          <Plates />
          <Keys />
        </GameWrapper>

        <ConfirmModal />
        <ResultModal />
      </main>
    </MainContainer>
  );
}
