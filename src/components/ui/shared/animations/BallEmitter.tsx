"use client";

import { useEffect, useState } from "react";

interface Ball {
  x: number;
  size: number;
  delay: number;
}

type Color = "red" | "green";

interface BallEmitterProps {
  count?: number;
  color?: Color;
}

export default function BallEmitter({ count = 50, color }: BallEmitterProps) {
  const [balls, setBalls] = useState<Ball[]>([]);

  useEffect(() => {
    if (balls.length) return;

    const generatedBalls: Ball[] = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      size: Math.random() * 12 + 6,
      delay: Math.random() * 2,
    }));

    setBalls(generatedBalls);
  }, []);

  return (
    <>
      {balls.map((b, index) => (
        <div
          key={index}
          style={{
            left: `${b.x}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDelay: `${b.delay}s`,
            backgroundColor:
              color === "green" ? "var(--chart-1)" : "var(--destructive)",
          }}
          className={`absolute bottom-0 rounded-full opacity-0 ${
            color === "green" ? "animate-ball-green" : "animate-ball-red"
          }`}
        ></div>
      ))}
    </>
  );
}
