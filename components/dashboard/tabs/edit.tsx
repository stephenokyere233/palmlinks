import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useStore } from "@/store";
import FAB from "@/components/FAB";
import AddLinkModal from "@/components/modals/addLink.modal";

const Edit = () => {
  const authUser = useStore((state) => state.authUser);
  const userName = useStore((state) => state.userName);
  const setUserName = useStore((state) => state.setUserName);
  const userBio = useStore((state) => state.userBio);
  const setUserBio = useStore((state) => state.setUserBio);
  const [showAddLinksModal, setShowAddLinksModal] = useState(false);

  useEffect(() => {
    if (!authUser) return;
    console.log(authUser);
    setUserName(authUser.displayName as string);
  }, []);

  return (
    <>
      <div className="w-full max-w-[800px] mx-auto h-full ">
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
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
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
        <section className="m-4">
          <div className="flex gap-10 justify-between">
            <button
              onClick={() => setShowAddLinksModal(true)}
              style={{ background: "linear-gradient(to right, #da22ff, #9733ee)" }}
              className="text-white flex-1 transition-all p-3 active:scale-95 px-8 text-xl font-medium rounded-lg"
            >
              + Add New Link
            </button>
            <button className=" bg-accentLight hover:bg-accent active:scale-95 hover:text-white transition-all px-8 text-xl font-medium rounded-lg">
              + Add Header
            </button>
          </div>
        </section>
        <section></section>
        <FAB title="Save Changes" />
      </div>
     <AddLinkModal showModal={showAddLinksModal} onHideModal={()=>setShowAddLinksModal(false)}/>
    </>
  );
};

export default Edit;
