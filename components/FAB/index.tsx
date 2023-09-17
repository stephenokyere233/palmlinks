import React, { FC } from "react";

const FAB: FC<{ title: string; icon?: string }> = ({ title, icon }) => {
  return (
    <button className="bg-primary absolute bottom-10 right-4 hover:text-zinc-700 hover:bg-accent active:scale-95 transition-all text-xl text-white p-3 font-medium px-6 rounded-lg">
      {icon}
      <p>{title}</p>
    </button>
  );
};

export default FAB;
