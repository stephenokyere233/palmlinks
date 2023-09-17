import { User } from "firebase/auth";

export interface StoreState extends StoreAction {
  showSignUp: boolean;
  selectedTab: string;
  authUser: User | null;
  userBio: string;
}
export interface StoreAction {
  setShowSignUp: (showSignUp: StoreState["showSignUp"]) => void;
  setSelectedTab: (selectedTab: StoreState["selectedTab"]) => void;
  setAuthUser: (authUser: StoreState["authUser"]) => void;
  setUserBio: (userBio: StoreState["userBio"]) => void;
}
