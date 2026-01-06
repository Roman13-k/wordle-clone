"use client";

import { AnimatePresence, motion } from "motion/react";
import { useToastStore } from "@/stores/toastStore";
import { Card, CardContent } from "@/components/ui/shared/card";
import { Button } from "@/components/ui/shared/button";
import { X, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
};

export default function ToastStack() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 w-90 max-w-[calc(100vw-2rem)]">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = iconMap[t.type];

          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Card
                className={cn(
                  "relative border-l-4 pr-10",
                  t.type === "success" && "border-l-emerald-500",
                  t.type === "error" && "border-l-destructive",
                  t.type === "warning" && "border-l-yellow-500"
                )}
              >
                <CardContent className="flex gap-3 p-4">
                  <Icon
                    className={cn(
                      "h-5 w-5 shrink-0 mt-0.5",
                      t.type === "success" && "text-emerald-500",
                      t.type === "error" && "text-destructive",
                      t.type === "warning" && "text-yellow-500"
                    )}
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-[16px] font-medium leading-tight">
                      {t.title}
                    </p>

                    {t.description && (
                      <p className="mt-1 text-xs text-muted-foreground leading-snug wrap-break-words">
                        {t.description}
                      </p>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => removeToast(t.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
