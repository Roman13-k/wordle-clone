"use client";
import { Button } from "../../../shared/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../shared/dialog";
import { useSaveCurrentGuess } from "@/hooks/useSaveCurrentGuess";

export default function ConfirmModal() {
  const [isConfirmModal, setIsConfirmModal] = useSaveCurrentGuess();

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
