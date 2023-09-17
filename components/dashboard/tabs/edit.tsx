import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useStore } from "@/store";

const Edit = () => {
  const authUser = useStore((state) => state.authUser);
  const [name, setName] = useState<string>("");
  const userBio = useStore((state) => state.userBio);
  const setUserBio = useStore((state) => state.setUserBio);

  useEffect(() => {
    if (!authUser) return;
    setName(authUser.displayName as string);
  }, []);

  return (
    <div className="w-full max-w-[800px] mx-auto h-full">
      <h1 className="font-bold text-2xl py-6 tracking-wider border-b border-grayLight">
        Edit
      </h1>
      <div className=" rounded-lg shadow-md m-4 p-10">
        <h2 className="text-xl font-semibold">Profile</h2>
        <section className="flex gap-10 items-end justify-between">
          <div className="flex flex-col gap-4 w-[70%]">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 outline-none indent-2 rounded-lg w-full bg-grayLight"
            />

            <input
              type="text"
              placeholder="Bio"
              value={userBio}
              onChange={(e) => setUserBio(e.target.value)}
              className="p-3 outline-none indent-2 rounded-lg w-full bg-grayLight"
            />
          </div>
          <Image
            src="/profile.png"
            className="rounded-full w-[120px]"
            width={200}
            height={200}
            alt="profile"
          />
        </section>
      </div>
    </div>
  );
};

export default Edit;
