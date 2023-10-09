import React, { FC, ReactNode } from "react";

const FAB: FC<{ children:ReactNode, onClick?:()=>void }> = ({ children,onClick }) => {
  return (
    <button onClick={onClick} className="bg-primary absolute bottom-10 right-4 hover:text-zinc-700 hover:bg-accent active:scale-95 transition-all text-xl text-white p-3 font-medium px-6 rounded-lg">
   {children}
    </button>
  );
};

export default FAB;
