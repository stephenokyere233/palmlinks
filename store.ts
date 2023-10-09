import { create } from "zustand";
import { ILink, StoreState } from "./interfaces";
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
  userName: "",
  setUserName: (userName) => set(() => ({ userName: userName })),
  userLinks: [],
  setUserLinks: (userLinks) => set(() => ({ userLinks: userLinks })),
  // addUserLink: (newLink: ILink) =>
  //   set((state) => {
  //     const existingLinkIndex = state.userLinks.findIndex(
  //       (userLink) =>
  //         userLink.name === newLink.name && userLink.baseUrl === newLink.baseUrl
  //     );
  //     if (existingLinkIndex !== -1) {
  //       const updatedUserLinks = [...state.userLinks];
  //       updatedUserLinks[existingLinkIndex].username = newLink.username;
  //       updatedUserLinks[existingLinkIndex].link = newLink.baseUrl+newLink.username;
  //       return { userLinks: updatedUserLinks };
  //     } else {
  //       return { userLinks: [...state.userLinks, newLink] };
  //     }
  //   }),
  selectedSocial: null,
  setSelectedSocial: (selectedSocial) => set(() => ({ selectedSocial: selectedSocial })),
  showAddLinksModal: false,
  setShowAddLinksModal: (showAddLinksModal) =>
    set(() => ({ showAddLinksModal: showAddLinksModal })),
}));
