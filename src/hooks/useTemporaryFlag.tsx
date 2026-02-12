import { useCallback, useRef, useState } from "react";

export function useTemporaryFlag(duration = 1000) {
  const [value, setValue] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const trigger = useCallback(() => {
    setValue(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setValue(false);
      timerRef.current = null;
    }, duration);
  }, [duration]);

  return { value, trigger };
}
