"use client";
import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value: T, delay: number = 50) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const now = Date.now();

    const remaining = delay - (now - lastExecuted.current);

    if (remaining <= 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      lastExecuted.current = now;
      setThrottledValue(value);
    } else if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
        timeoutRef.current = null;
      }, remaining);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [value, delay]);

  return throttledValue;
}
