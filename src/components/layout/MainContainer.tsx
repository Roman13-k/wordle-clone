import React, { PropsWithChildren } from "react";
import SnowFlakes from "../ui/animations/SnowFlakes";

export default function MainContainer({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-full bg-muted relative overflow-hidden">
      <SnowFlakes />
      <div className="max-w-7xl mx-auto h-full relative"> {children}</div>
    </div>
  );
}
