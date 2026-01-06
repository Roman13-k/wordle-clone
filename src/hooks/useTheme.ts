"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { ThemeType } from "@/types";

export function useTheme() {
  const [storedTheme, setStoredTheme] = useLocalStorage<ThemeType>(
    "theme",
    "system"
  );
  const [theme, setThemeState] = useState<ThemeType>(storedTheme ?? "system");

  const setTheme = useCallback((newTheme: ThemeType) => {
    setThemeState(newTheme);
    setStoredTheme(newTheme);
  }, [setStoredTheme]);

  useEffect(() => {
    const resolved =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(resolved);
  }, [theme]);

  return {
    theme,
    setTheme,
  };
}
