import React, { PropsWithChildren } from "react";

export default function MainContainer({ children }: PropsWithChildren) {
  return <div className="max-w-7xl mx-auto h-screen w-full">{children}</div>;
}
