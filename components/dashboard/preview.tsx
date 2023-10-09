import React, { FC, useEffect } from "react";
import { BiCopy, BiShareAlt } from "react-icons/bi";
import { AiOutlineQrcode } from "react-icons/ai";
import Image from "next/image";
import Watermark from "../watermark";
import { useUserProfile } from "@/hooks/useUserProfile.hook";
import { SOCIALS_TO_ADD } from "@/constants/socials";
import { useStore } from "@/store";

const Preview = () => {
  const { userProfile } = useUserProfile();
  const userLinks = useStore((state) => state.userLinks);
  const userName = useStore((state) => state.userName);
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
          <p className="text-xl max-w-[350px] py-2 break-words">{bio}</p>
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
      <div className="border mt-4 flex-1 bg-accentLight p-4 py-6 border-grayLight rounded-lg flex flex-col items-center">
        {userProfile && (
          <Profile name={userName} bio={userBio} />
        )}
        <section className="flex-1  w-full">
          <section className="flex flex-col gap-4 mt-6">
            {userProfile &&
              userLinks.map((link) => {
                const data = SOCIALS_TO_ADD.filter(
                  (item) => link.baseUrl === item.baseUrl
                );
                const icon = data[0].icon;
                return (
                  <button
                    className="bg-grayLight hover:bg-primary hover:text-white transition-all active:scale-95 text-xl flex gap-6 shadow-lg p-4 rounded-lg"
                    key={link.baseUrl}
                  >
                    {icon}
                    {link.baseUrl.split("https://")[1] + link.username}
                  </button>
                );
              })}
          </section>
        </section>
        <Watermark />
      </div>
    </section>
  );
};

export default Preview;
