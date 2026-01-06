"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { ThemeType } from "@/types";

export function useTheme() {
  const [storedTheme, setStoredTheme] = useLocalStorage<ThemeType>(
    "theme",
    "system"
  );
  const [theme, setThemeState] = useState<ThemeType | null>(storedTheme);

  const setTheme = useCallback((newTheme: ThemeType) => {
    setThemeState(newTheme);
    setStoredTheme(newTheme);

    const resolved =
      newTheme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : newTheme;

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(resolved);
  }, []);

  return {
    theme,
    setTheme,
  };
}
