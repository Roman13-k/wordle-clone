import { PropsWithChildren } from "react";
import SeasonalParticles from "../shared/animations/SeasonalParticles";
import Header from "./header/Header";

export default function MainContainer({
  children,
  isNeedParticles = true,
  className = "",
}: PropsWithChildren<{ isNeedParticles?: boolean; className?: string }>) {
  return (
    <div className="h-screen w-full bg-muted relative overflow-hidden">
      {isNeedParticles && <SeasonalParticles />}
      <div className={`${className} max-w-7xl mx-auto h-full relative`}>
        <Header />
        {children}
      </div>
    </div>
  );
}
