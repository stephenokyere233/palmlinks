import { create } from "zustand";
import { StoreState } from "./interfaces";

export const useStore = create<StoreState>((set) => ({
  showSignUp: false,
  setShowSignUp: (showSignUp) => set(() => ({ showSignUp: showSignUp })),
}));
