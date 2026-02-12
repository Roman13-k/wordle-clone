"use client";

import { CopyIcon } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shared/tooltip";

type CopyButtonProps = {
  text: string;
  className?: string;
  tooltipText?: string;
};

export default function CopyButton({
  text,
  className,
  tooltipText,
}: CopyButtonProps) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
  };

  const button = (
    <Button
      onClick={handleCopy}
      size="icon-sm"
      variant="outline"
      className={cn(className)}
    >
      <CopyIcon className="h-4 w-4" />
    </Button>
  );

  if (!tooltipText) {
    return button;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
