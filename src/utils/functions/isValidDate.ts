import { isValid, format, parseISO } from "date-fns";

export function isValidDate(value: string): boolean {
  const parsed = parseISO(value);

  return isValid(parsed) && format(parsed, "yyyy-MM-dd") === value;
}
