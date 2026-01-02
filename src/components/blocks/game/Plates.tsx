"use client";
import { AnimatePresence, motion } from "motion/react";
import { useGameStore } from "@/stores/gameStore";
import { LETTERCOLOR } from "@/types/game";

export default function Plates() {
  const { MAX_TRYS, MAX_WORD_LENGTH, guessesMatrix, currentWord, error } =
    useGameStore();

  return (
    <section className="grid gap-1">
      {Array.from({ length: MAX_TRYS }, (_, rowIndex) => {
        const row =
          guessesMatrix.length === rowIndex
            ? currentWord
            : guessesMatrix[rowIndex]?.letters || [];

        return (
          <div
            key={rowIndex}
            className={`${
              error && guessesMatrix.length === rowIndex
                ? "error_animation"
                : ""
            } grid grid-cols-5 gap-1`}
          >
            {Array.from({ length: MAX_WORD_LENGTH }, (_, colIndex) => {
              const letter = row[colIndex] ?? "";
              const color =
                LETTERCOLOR[guessesMatrix[rowIndex]?.states[colIndex]];

              return (
                <motion.div
                  animate={
                    rowIndex < guessesMatrix.length ? { rotateX: 180 } : {}
                  }
                  transition={{ duration: 0.5, delay: 0.1 * colIndex }}
                  style={{ transformStyle: "preserve-3d" }}
                  key={colIndex}
                  className="w-15.5 h-15.5 rounded-lg border-2 border-input flex justify-center items-center"
                >
                  {/* FRONT */}
                  <AnimatePresence mode="wait">
                    {letter && (
                      <motion.div
                        style={{ backfaceVisibility: "hidden" }}
                        className="absolute w-15.5 h-15.5 rounded-lg border-2 border-black
                 font-bold text-2xl flex justify-center items-center bg-background"
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
            })}
          </div>
        );
      })}
    </section>
  );
}
