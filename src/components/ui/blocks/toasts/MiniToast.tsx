"use client";
import { AnimatePresence, motion } from "motion/react";
import { useToastStore } from "@/stores/toastStore";

export default function MiniToast() {
  const { miniToast } = useToastStore();

  return (
    <AnimatePresence>
      {miniToast && (
        <motion.div
          key={miniToast.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 left-1/2 transform -translate-x-1/2
            bg-sidebar-accent-foreground text-white px-4 py-2 rounded-md shadow-lg font-medium z-50"
        >
          {miniToast.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
