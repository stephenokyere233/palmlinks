import { TAB } from "@/constants/enums";
import { useStore } from "@/store";
import React from "react";
import Edit from "./tabs/edit";
import Themes from "./tabs/themes";
import Settings from "./tabs/settings";
import Analytics from "./tabs/analytics";

const Outlet = () => {
  const selectedTab = useStore((state) => state.selectedTab);

  if (selectedTab === TAB.THEMES) return <Themes />;
  if (selectedTab === TAB.ANALYTICS) return <Analytics />;
  if (selectedTab === TAB.SETTINGS) return <Settings />;
    return (
      <>
        <Edit />
      </>
    );
};

export default Outlet;
