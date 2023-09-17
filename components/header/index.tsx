import React from "react";
import Logo from "../logo";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-5 border-b border-b-grayLight max-w-[1500px] mx-auto">
      <Logo />
      <nav></nav>
      <div className="flex gap-4 items-center">
        <Link href="/auth?type=login">
        <button className="flex items-center gap-2 hover:text-white bg-accentLight text-xl hover:bg-accent active:scale-95 transition-all  text-black p-3 font-medium px-6 rounded-lg ">
            Login
          </button>
        </Link>
        <Link href="/auth?type=signup">
          <button className="bg-primary hover:text-zinc-700 hover:bg-accent active:scale-95 transition-all text-xl text-white p-3 font-medium px-6 rounded-lg">
            Signup
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
