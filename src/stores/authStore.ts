import { create } from "zustand";
import { useGameStore } from "./gameStore";

interface AuthModalState {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useAuthModal = create<AuthModalState>((set) => ({
  open: false,
  openModal: () =>{useGameStore.getState().setInputBlock(true); set({ open: true })},
  closeModal: () => {useGameStore.getState().setInputBlock(false); set({ open: false })},
}));
