import { GameStatusType, ResultStatusType } from "@/types/game";

export function isResultStatus(
  status: GameStatusType
): status is ResultStatusType {
  return status !== "playing";
}
