"use client";
import { AnimatePresence, motion } from "motion/react";
import { useToastStore } from "@/stores/toastStore";

export default function ToastStack() {
  const { toasts } = useToastStore();

  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-2 z-50">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className={`p-3 rounded-md font-bold text-white shadow-lg
              ${t.type === "error" ? "bg-destructive" : ""}
              ${t.type === "warning" ? "bg-yellow-500" : ""}
              ${t.type === "success" ? "bg-sidebar-primary-foreground" : ""}
            `}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
