import React, { FC, ReactNode } from "react";
import Sidebar from "../dashboard/sidebar";
import Preview from "../dashboard/preview";

const DashBoardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="flex h-screen w-screen">
      <section className="min-w-[350px]">
        <Sidebar />
      </section>
      <section className="flex-1 px-6 overflow-y-scroll hide-scrollbar relative">{children}</section>
      <section className="min-w-[550px]">
        <Preview />
      </section>
    </main>
  );
};

export default DashBoardLayout;
