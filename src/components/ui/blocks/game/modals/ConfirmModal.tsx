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
import { Dispatch, SetStateAction } from "react";

interface ConfirmModalProps {
  isConfirmModal: "open" | "close" | ConfirmType;
  setIsConfirmModal: Dispatch<SetStateAction<"open" | "close" | ConfirmType>>;
}

export default function ConfirmModal({
  isConfirmModal,
  setIsConfirmModal,
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
          <Button onClick={() => setIsConfirmModal("success")}>
            Загрузить
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => setIsConfirmModal("rejected")}
          >
            Очистить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
