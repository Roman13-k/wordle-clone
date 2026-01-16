import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { ru } from "date-fns/locale";

export function getCalendarVisibleRange(month: Date) {
  const start = startOfWeek(startOfMonth(month), {
    locale: ru,
  });

  const end = endOfWeek(endOfMonth(month), {
    locale: ru,
  });

  return { start, end };
}
