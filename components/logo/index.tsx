import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <p className="font-bold text-2xl tracking-wider">PalmLinks</p>
    </Link>
  );
};

export default Logo;
