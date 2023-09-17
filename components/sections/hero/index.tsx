import Link from "next/link";
import React, { useState } from "react";

const Hero = () => {
  const [name, setName] = useState<string>("");
  return (
    <section className="max-w-[1500px] mx-auto  min-h-[90vh] flex justify-center pt-14">
      <div className="hero-content">
        <div className="flex items-center flex-col gap-5">
          <h1 className="text-[75px] font-bold tracking-wider leading-[50px]">
            Your Links, Your Way.
          </h1>
          <p className="text-2xl ">
            Create a personalized link page and make every link count.
          </p>
          <div className="flex gap-4">
            <div className="items-center gap-1 px-4 p-1 min-w-[400px] outline-none indent-2 rounded-lg w-full bg-accentLight flex">
              <h3 className="font-semibold">palm.link/</h3>
              <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="py-2 w-full bg-accentLight outline-none" />
            </div>
            <Link href={`/auth?type=signup${name!==""?`&username=${name}`:""}` }className="">
              <button className="bg-primary w-max hover:text-zinc-700 hover:bg-accent active:scale-95 transition-all text-xl text-white p-3 font-medium px-6 rounded-lg">
                Claim Link
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="hero-image">{/* Add an image or illustration here */}</div>
    </section>
  );
};

export default Hero;
