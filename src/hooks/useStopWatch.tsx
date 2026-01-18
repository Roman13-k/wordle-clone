"use client";
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export function useStopwatch(key: string = "stopwatch") {
  const [storedTime, setStoredTime] = useLocalStorage<number>(key, 0);
  const [time, setTime] = useState(storedTime);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setTime(0);
    setStoredTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    if (!isRunning) return;
    const startTime = Date.now() - time * 1000;

    intervalRef.current = window.setInterval(() => {
      const newTime = Math.floor((Date.now() - startTime) / 1000);
      setTime(newTime);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleSave = () => {
    setStoredTime(time);
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleSave);
    window.addEventListener("beforeunload", handleSave);
    return () => {
      document.removeEventListener("visibilitychange", handleSave);
      window.addEventListener("beforeunload", handleSave);
      handleSave();
    };
  }, [handleSave]);

  return { time, isRunning, start, pause, reset };
}
