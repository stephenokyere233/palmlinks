import React from "react";
import Logo from "../logo";
import { ALL_TABS } from "@/constants/enums";
import { useStore } from "@/store";
import User from "./user";

const Sidebar = () => {
  const selectedTab = useStore((state) => state.selectedTab);
  const setSelectedTab = useStore((state) => state.setSelectedTab);
  return (
    <div className="h-full flex flex-col p-4 px-6 border-r border-r-grayLight">
      <div className="py-3">
        <Logo />
      </div>
      <div className="border-b border-grayLight mt-3" />
      <nav className="my-4 space-y-4 flex-1">
        {ALL_TABS.map((tab) => (
          <li
            onClick={() => setSelectedTab(tab.path)}
            className={`list-none cursor-pointer active:scale-95 font-medium p-3 px-6 bg-accentLight ${
              selectedTab === tab.path ? "bg-accentLight" : "bg-grayLight"
            }  hover:bg-accentLight flex items-center gap-3 transition-all rounded-lg`}
            key={tab.path}
          >
            <tab.icon />
            <p>{tab.name}</p>
          </li>
        ))}
      </nav>
      <User />
    </div>
  );
};

export default Sidebar;
