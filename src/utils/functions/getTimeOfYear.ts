import { TimeOfYearType } from "@/types";

export function getTimeOfYear(): TimeOfYearType {
  const month = new Date().getUTCMonth(); 

  if (month === 11 || month <= 1) return "winter"; 
  if (month <= 4) return "spring";                 
  if (month <= 7) return "summer";                 
  return "autumn";                                 
}
