import React, { FC, ReactNode, useState } from "react";
import ModalLayout from "../layouts/modal.layout";
import Image from "next/image";
import { SOCIALS_TO_ADD } from "@/constants";
import { IoAdd } from "react-icons/io5";
import { BiX } from "react-icons/bi";

const AddLinkModal: FC<{
  showModal: boolean;
  onHideModal: () => void;
}> = ({ showModal, onHideModal }) => {
  const [showAddCustomLink, setShowAddCustomLink] = useState<boolean>(false);
  
  if (!showModal) return <></>;
  const CustomLink = () => {
    return (
      <section>
        <div className="flex justify-between items-center mb-2 ">
          <h2 className="text-xl font-semibold"> Add Custom Link</h2>
          <button onClick={()=>setShowAddCustomLink(false)} className="bg-accent hover:bg-accentLight rounded-lg p-1 transition-all active:scale-95 text-white hover:text-black">
            <BiX size={24} />
          </button>
        </div>
        <section className="flex gap-4">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="link title"
              // value={userName}
              // onChange={(e) => setUserName(e.target.value)}
              className="p-3 outline-none indent-2 rounded-lg w-full bg-grayLight"
            />

            <input
              type="url"
              placeholder="link url"
              className="p-3 outline-none indent-2 rounded-lg w-full bg-grayLight"
            />
          </div>
          <div className="flex-1 w-[120px] bg-grayLight rounded-lg"></div>
        </section>
        <button>Save</button>
      </section>
    );
  };
  return (
    <ModalLayout showModal={showModal} onHideModal={onHideModal}>
      <div>
        <h2 className="text-xl font-semibold">Add Social Links</h2>
        <ul className="flex flex-wrap items-center gap-4 my-4">
          {SOCIALS_TO_ADD.map((social) => (
            <li
              key={social.name}
              className=" flex bg-grayLight w-max gap-2 hover:bg-accentLight active:scale-95 transition-all cursor-pointer rounded-lg px-4 py-2 items-center"
            >
              <social.icon color={social.color} size={24} />
              <p>{social.name}</p>
            </li>
          ))}
          <li
            onClick={() => setShowAddCustomLink(true)}
            className=" flex bg-grayLight w-max gap-2 hover:bg-accentLight active:scale-95 transition-all cursor-pointer rounded-lg px-4 py-2 items-center"
          >
            <IoAdd size={24} />
            <p>Other</p>
          </li>
        </ul>
      </div>
      {showAddCustomLink && <CustomLink />}
    </ModalLayout>
  );
};

export default AddLinkModal;
