"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shared/dialog";
import { Button } from "@/components/ui/shared/button";
import { Progress } from "@/components/ui/shared/progress";
import { Download, RefreshCcw, AlertTriangle } from "lucide-react";
import { useUpdateStore } from "@/stores/updateStore";
import { formatBytes } from "@/utils/functions/formatBytes";

export default function UpdateModal() {
  const {
    status,
    progress,
    error,
    bytesTransferred,
    bytesTotal,
    bytesPerSecond,
  } = useUpdateStore();

  if (status === "idle") return null;

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {status === "available" && <Download />}
            {status === "downloading" && (
              <RefreshCcw className="animate-spin" />
            )}
            {status === "error" && <AlertTriangle className="text-red-500" />}
            Обновление приложения
          </DialogTitle>
        </DialogHeader>

        {status === "available" && (
          <Button onClick={() => window.updater.download()}>
            Скачать обновление
          </Button>
        )}

        {status === "downloading" && (
          <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-sm text-muted-foreground">
              Загружено {formatBytes(bytesTransferred)} из{" "}
              {formatBytes(bytesTotal)} ({progress}%)
            </p>
            <p className="text-sm text-muted-foreground">
              Скорость: {formatBytes(bytesPerSecond)}/с
            </p>
          </div>
        )}

        {status === "ready" && (
          <Button onClick={() => window.updater.install()}>
            Перезапустить и обновить
          </Button>
        )}

        {status === "error" && <p className="text-sm text-red-500">{error}</p>}
      </DialogContent>
    </Dialog>
  );
}
