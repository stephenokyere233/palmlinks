import React, { FC, useEffect, useState } from "react";
import { BiCopy, BiShareAlt } from "react-icons/bi";
import { AiOutlineQrcode } from "react-icons/ai";
import Image from "next/image";
import { useStore } from "@/store";
import Watermark from "../watermark";

const Preview = () => {
  const authUser = useStore((state) => state.authUser);
  const userBio = useStore((state) => state.userBio);

  const Profile: FC<{ name: string; bio: string }> = ({ name, bio }) => {
    return (
      <div className="flex items-center flex-col text-center gap-2">
        <Image
          src="/profile.png"
          className="rounded-full w-[120px]"
          width={200}
          height={200}
          alt="profile"
        />
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-xl">{bio}</p>
        </div>
      </div>
    );
  };

  const Controls = () => {
    return (
      <div className="flex gap-4">
        <button className="flex items-center gap-2 hover:text-white bg-accentLight hover:bg-accent active:scale-95 transition-all  text-black p-3 font-medium px-6 rounded-lg ">
          <BiCopy />
          <p>Copy link</p>
        </button>
        <button className="flex items-center gap-2 hover:text-white bg-accentLight hover:bg-accent active:scale-95 transition-all  text-black p-3 font-medium px-6 rounded-lg ">
          <AiOutlineQrcode />
          <p>Get QR Code</p>
        </button>
        <button className="flex items-center gap-2 hover:text-black bg-primary hover:bg-accent active:scale-95 transition-all  text-white p-3 font-medium px-6 rounded-lg ">
          <BiShareAlt />
          <p>Share</p>
        </button>
      </div>
    );
  };

  return (
    <section className="border-l flex flex-col border-l-grayLight h-full px-6 pt-4 pb-6">
      <Controls />
      <div className="border mt-4 flex-1 p-4 py-6 border-grayLight rounded-lg flex flex-col items-center">
        <Profile name={authUser?.displayName as string} bio={userBio} />
        <section className="flex-1 border w-full"></section>
        <Watermark />
      </div>
      {/* preview */}
    </section>
  );
};

export default Preview;
