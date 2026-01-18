"use client";

type FlameWaveProgressProps = {
  percent: number;
  size?: number;
  color?: string;
};

export default function FlameWaveProgress({
  percent,
  size = 120,
  color = "oklch(70.5% 0.213 47.604)",
}: FlameWaveProgressProps) {
  const level = Math.max(0, Math.min(100, percent));

  const minY = 25;
  const maxY = 4;
  const waveY = minY - ((minY - maxY) * level) / 100;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <clipPath id="flame-mask">
          <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />
        </clipPath>

        <path
          id="wave"
          d={`
            M 0 ${waveY}
            C 6 ${waveY - 2}, 12 ${waveY + 2}, 18 ${waveY}
            C 24 ${waveY - 2}, 30 ${waveY + 2}, 36 ${waveY}
            C 42 ${waveY - 2}, 48 ${waveY + 2}, 54 ${waveY}
            V 24
            H 0
            Z
          `}
        />
      </defs>

      <path
        d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"
        fill={color}
        opacity={0.1}
      />

      {/* 🌊 волна */}
      <g clipPath="url(#flame-mask)">
        <g>
          <use href="#wave" fill={color} />
          <use href="#wave" fill={color} x="36" />

          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to="-36 0"
            dur="1.7s"
            repeatCount="indefinite"
          />
        </g>
      </g>

      <path
        d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"
        stroke={color}
        fill="none"
      />
    </svg>
  );
}
