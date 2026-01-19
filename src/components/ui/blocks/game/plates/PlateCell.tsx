"use client";
import { AnimatePresence, motion } from "motion/react";
import { memo } from "react";

interface PlateCellProps {
  letter: string;
  color?: string;
  flip: boolean;
  delay: number;
}

const PlateCell = memo(({ letter, color, flip, delay }: PlateCellProps) => {
  return (
    <motion.div
      animate={flip ? { rotateX: 180 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{ transformStyle: "preserve-3d" }}
      className="w-15.5 h-15.5 rounded-lg border-2 border-input flex justify-center items-center"
    >
      {/* FRONT */}
      <AnimatePresence mode="wait">
        {letter && (
          <motion.div
            style={{ backfaceVisibility: "hidden" }}
            className="absolute w-15.5 h-15.5 rounded-lg border-2 border-black dark:border-sidebar-ring/40
              font-bold text-2xl flex justify-center items-center bg-background dark:bg-sidebar-ring/40"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {letter}
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACK */}
      <div
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateX(180deg)",
        }}
        className={`absolute w-15.5 h-15.5 rounded-lg 
          font-bold text-2xl flex justify-center items-center ${color}`}
      >
        {letter}
      </div>
    </motion.div>
  );
});

export default PlateCell;
