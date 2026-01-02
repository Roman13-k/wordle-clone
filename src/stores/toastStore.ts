import { create } from "zustand";

export type ToastType = "error" | "warning" | "success";
export type MiniToastType = "info";

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

export type MiniToast = {
  id: string;
  message: string;
  type: MiniToastType;
};

type ToastStore = {
  toasts: Toast[];
  miniToast: MiniToast | null;
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: string) => void;
  showMiniToast: (message: string) => void;
  hideMiniToast: () => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  miniToast: null,

  addToast: (message, type) => {
    const id = crypto.randomUUID();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));

    setTimeout(() => {
      useToastStore.getState().removeToast(id);
    }, 3000);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  showMiniToast: (message) => {
    const id = crypto.randomUUID();
    set({ miniToast: { id, message, type: "info" } });

    setTimeout(() => useToastStore.getState().hideMiniToast(), 2000);
  },

  hideMiniToast: () => set({ miniToast: null }),
}));
