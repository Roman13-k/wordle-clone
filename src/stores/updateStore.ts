import { create } from "zustand";

type UpdateStatus = "idle" | "available" | "downloading" | "ready" | "error";

interface UpdateState {
  status: UpdateStatus;
  progress: number;
  error: string | null;
  bytesTransferred: number;
  bytesTotal: number;
  bytesPerSecond: number;
}

interface UpdateActions {
  setAvailable: () => void;
  setProgress: (payload: {
    percent: number;
    transferred: number;
    total: number;
    bytesPerSecond: number;
  }) => void;
  setReady: () => void;
  setError: (error: string) => void;
}

export type UpdateStore = UpdateState & UpdateActions;

export const useUpdateStore = create<UpdateStore>((set) => ({
  status: "idle",
  progress: 0,
  error: null,

  bytesTransferred: 0,
  bytesTotal: 0,
  bytesPerSecond: 0,

  setAvailable: () => set({ status: "available" }),
  setProgress: ({ percent, transferred, total, bytesPerSecond }) =>
    set({
      status: "downloading",
      progress: percent,
      bytesTransferred: transferred,
      bytesTotal: total,
      bytesPerSecond,
    }),
  setReady: () => set({ status: "ready", progress: 100 }),
  setError: (e: string) => set({ status: "error", error: e }),
}));
