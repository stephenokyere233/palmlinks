import { create } from "zustand";
import { StoreState } from "./interfaces";
import { TAB } from "./constants/enums";

export const useStore = create<StoreState>((set) => ({
  showSignUp: false,
  setShowSignUp: (showSignUp) => set(() => ({ showSignUp: showSignUp })),
  selectedTab: TAB.MY_LINKS,
  setSelectedTab: (selectedTab) => set(() => ({ selectedTab: selectedTab })),
  authUser: null,
  setAuthUser: (authUser) => set(() => ({ authUser: authUser })),
  userBio: "",
  setUserBio: (userBio) => set(() => ({ userBio: userBio })),
}));
