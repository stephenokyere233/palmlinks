import React, { FC, ReactNode } from "react";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <section className="w-[50%] bg-accent h-screen"></section>
        <section className=" w-[50%] flex-1 px-4">{children}</section>
      </div>
    );
};

export default AuthLayout;
