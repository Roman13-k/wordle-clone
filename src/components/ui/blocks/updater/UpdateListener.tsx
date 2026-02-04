"use client";
import { useEffect } from "react";
import { useUpdateStore } from "@/stores/updateStore";

export function UpdateListener() {
  const { setAvailable, setProgress, setReady, setError } = useUpdateStore();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("updater" in window)) return;

    window.updater.onAvailable(() => setAvailable());
    window.updater.onProgress((data) => setProgress(data));
    window.updater.onDownloaded(() => setReady());
    window.updater.onError((error) => setError(error.message));
  }, []);

  return null;
}
