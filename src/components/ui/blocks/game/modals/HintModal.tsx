import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shared/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shared/tooltip";
import { Lightbulb } from "lucide-react";

export default function HintModal() {
  return (
    <Dialog>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <button className="cursor-pointer hover:opacity-80 transition">
                <Lightbulb size={30} />
              </button>
            </DialogTrigger>
          </TooltipTrigger>

          <TooltipContent side="bottom">
            <span>Подсказка</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
