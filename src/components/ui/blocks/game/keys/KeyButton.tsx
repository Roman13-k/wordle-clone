import { memo, ReactNode } from "react";
import { LETTERCOLOR, LetterState } from "@/types/game";

interface KeyButtonProps {
  value: string | ReactNode;
  onClick: () => void;
  state: LetterState | null;
}

const KeyButton = memo(
  ({ value, onClick, state }: KeyButtonProps) => {
    const color = state ? LETTERCOLOR[state] : "bg-sidebar-ring/40";

    return (
      <button
        className={`${
          color
        } font-bold text-xl cursor-pointer p-3 border border-sidebar-border rounded-sm active:translate-y-1 active:scale-95 transition duration-200`}
        onClick={onClick}
      >
        {value}
      </button>
    );
  },
  (prev, next) => prev.state === next.state && prev.value === next.value,
);

export default KeyButton;
