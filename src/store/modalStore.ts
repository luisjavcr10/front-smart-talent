import { create } from 'zustand';

interface ModalState {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isActive: false,
  setIsActive: (value) => set({ isActive: value })
}));