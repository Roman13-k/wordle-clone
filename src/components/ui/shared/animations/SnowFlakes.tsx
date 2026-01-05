"use client";
import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

const SNOWFLAKE_SVGS = [
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0v24M0 12h24M4.5 4.5l15 15M19.5 4.5l-15 15" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l1 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="4" />
  </svg>,
];

export default function SnowFlakes() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 98,
      size: 10 + Math.random() * 15,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((flake) => {
        const FlakeSvg =
          SNOWFLAKE_SVGS[Math.floor(Math.random() * SNOWFLAKE_SVGS.length)];
        return (
          <div
            key={flake.id}
            className="absolute opacity-80 text-chart-1"
            style={{
              left: `${flake.left}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              top: `-30px`,
              animation: `fall ${flake.duration}s linear ${flake.delay}s infinite`,
            }}
          >
            {FlakeSvg}
          </div>
        );
      })}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
