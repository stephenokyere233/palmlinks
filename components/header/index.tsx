import React from "react";
import Logo from "../logo";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-5 border-b border-b-grayLight max-w-[1500px] mx-auto">
      <Logo />
      <nav></nav>
      <div>
        <button className="bg-primary hover:text-zinc-700 hover:bg-accent active:scale-95 transition-all text-xl text-white p-3 font-medium px-6 rounded-lg">
          Claim Link
        </button>
      </div>
    </header>
  );
};

export default Header;
