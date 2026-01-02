"use client";
import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  startY: number;
}

export default function SnowFlakes() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 98,
      size: 3 + Math.random() * 8,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      startY: -50 + Math.random() * 100,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-chart-1 rounded-full opacity-80"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            top: `${flake.startY}px`,
            animation: `fall ${flake.duration}s linear ${flake.delay}s infinite`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(110vh);
          }
        }
      `}</style>
    </div>
  );
}
