import { useState, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  initState: T
): [T, (v: T) => void] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return initState;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}
