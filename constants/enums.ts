import { AiOutlineLink } from "react-icons/ai";
import { BiPalette } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { IoAnalyticsOutline } from "react-icons/io5";

export enum TAB {
  MY_LINKS = "my_links",
  THEMES = "themes",
  ANALYTICS = "analytics",
  SETTINGS = "settings",
}

export const ALL_TABS = [
  {
    name: "My Links",
    path: TAB.MY_LINKS,
    icon: AiOutlineLink,
  },
  {
    name: "Themes",
    path: TAB.THEMES,
    icon: BiPalette,
  },
  {
    name: "Analytics",
    path: TAB.ANALYTICS,
    icon: IoAnalyticsOutline,
  },
  {
    name: "Settings",
    path: TAB.SETTINGS,
    icon: FiSettings,
  },
];

export enum COLLECTIONS {
  USERS = "users",
  PROFILES = "profiles",
}
