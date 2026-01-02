"use client";
import { ConfirmType } from "@/types";
import { Button } from "../../../shared/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../shared/dialog";

interface ConfirmModalProps {
  setConfirmModal: (v: "close" | "open" | ConfirmType) => void;
  isConfirmModal: "close" | "open" | ConfirmType;
}

export default function ConfirmModal({
  setConfirmModal,
  isConfirmModal,
}: ConfirmModalProps) {
  return (
    <Dialog open={isConfirmModal === "open"} onOpenChange={(open) => !open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Загрузить прошлую попытку?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Вы можете загрузить свою прошлую попытку или начать заново.
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => setConfirmModal("success")}>Загрузить</Button>
          <Button
            variant={"destructive"}
            onClick={() => setConfirmModal("rejected")}
          >
            Очистить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
