import { ResultStatusType } from "@/types/game";
import { CheckCircle2, XCircle } from "lucide-react";

export const RESULT_CONFIG: Record<
  ResultStatusType,
  {
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    iconBg: string;
    iconClass: string;
    hint: string;
  }
> = {
  win: {
    title: "Поздравляем! 🎉",
    description: "Вы успешно отгадали слово",
    icon: CheckCircle2,
    iconBg: "bg-emerald-500/10",
    iconClass: "text-emerald-500",
    hint: "Хотите сохранить результат и следить за статистикой игр?",
  },
  lose: {
    title: "Игра окончена 😢",
    description: "К сожалению, попытки закончились",
    icon: XCircle,
    iconBg: "bg-destructive/10",
    iconClass: "text-destructive",
    hint: "Хотите сохранять статистику и улучшать результаты?",
  },
};
