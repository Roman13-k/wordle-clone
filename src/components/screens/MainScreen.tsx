"use client";
import MainContainer from "../ui/layout/MainContainer";
import { useSaveCurrentGuess } from "@/hooks/useSaveCurrentGuess";
import Plates from "../ui/blocks/game/Plates";
import Keys from "../ui/blocks/game/Keys";
import Header from "../ui/layout/Header";
import ConfirmModal from "../ui/blocks/game/modals/ConfirmModal";

export default function MainScreen() {
  const [isConfirmModal, setIsConfirmModal] = useSaveCurrentGuess();

  return (
    <MainContainer>
      <Header />
      <main className="flex flex-col gap-15 h-full items-center justify-center">
        <Plates />
        <Keys />

        <ConfirmModal
          isConfirmModal={isConfirmModal}
          setConfirmModal={setIsConfirmModal}
        />
      </main>
    </MainContainer>
  );
}
