import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export interface StoreState extends StoreAction {
  showSignUp: boolean;
  selectedTab: string;
  authUser: User | null;
  userBio: string;
  userLinks: ILink[];
  userName: string;
  selectedSocial: any;
  showAddLinksModal: boolean;
  userProfileImage: string;
}
export interface StoreAction {
  setShowSignUp: (showSignUp: StoreState["showSignUp"]) => void;
  setSelectedTab: (selectedTab: StoreState["selectedTab"]) => void;
  setAuthUser: (authUser: StoreState["authUser"]) => void;
  setUserBio: (userBio: StoreState["userBio"]) => void;
  setUserLinks: (userLinks: StoreState["userLinks"]) => void;
  setUserName: (userName: StoreState["userName"]) => void;
  setSelectedSocial: (selectedSocial: StoreState["selectedSocial"]) => void;
  setShowAddLinksModal: (showAddLinksModal: StoreState["showAddLinksModal"]) => void;
  setUserProfileImage: (userProfileImage: StoreState["userProfileImage"]) => void;
}

export interface ILink {
  name: string;
  link: string;
  username: string;
  baseUrl: string;
}
export interface Profile {
  dateCreated: Timestamp;
  lastUpdated: Timestamp;
  uid: string;
  profile_path: string;
  user: {
    id: string;
    name: string;
    bio: string;
    email: string;
    profile: string;
    verified: boolean;
  };
  links: {
    socials: ILink[];
    other_links: ILink[];
  };
  settings: {
    theme: "default";
    SEO: {
      title: string;
      description: string ;
      og_image?: string;
    };
  };
}
