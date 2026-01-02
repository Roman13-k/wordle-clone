import Keys from "@/components/blocks/game/Keys";
import Plates from "@/components/blocks/game/Plates";
import MainContainer from "@/components/layout/MainContainer";

export default function Page() {
  return (
    <MainContainer>
      <main className="flex flex-col gap-15 h-full items-center justify-center">
        <Plates />
        <Keys />
      </main>
    </MainContainer>
  );
}
