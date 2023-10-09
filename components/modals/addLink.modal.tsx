import React, { FC, useState } from "react";
import ModalLayout from "../layouts/modal.layout";
import { IoAdd } from "react-icons/io5";
import { BiX } from "react-icons/bi";
import { useStore } from "@/store";
import { MdOutlineModeEdit } from "react-icons/md";
import { SOCIALS_TO_ADD } from "@/constants/socials";

const AddLinkModal: FC<{
  showModal: boolean;
  onHideModal: () => void;
}> = ({ showModal, onHideModal }) => {
  const [showAddCustomLink, setShowAddCustomLink] = useState<boolean>(false);
  const setSelectedSocial = useStore((state) => state.setSelectedSocial);
  const userLinks=useStore(state=>state.userLinks)

  if (!showModal) return <></>;

  const CustomLink = () => {
    return (
      <section>
        <div className="flex justify-between items-center mb-2 ">
          <h2 className="text-xl font-semibold"> Add Custom Link</h2>
          <button
            onClick={() => setShowAddCustomLink(false)}
            className="bg-accent hover:bg-accentLight rounded-lg p-1 transition-all active:scale-95 text-white hover:text-black"
          >
            <BiX size={24} />
          </button>
        </div>
        <section className="flex gap-4">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="link title"
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
        <button
          style={{ background: "linear-gradient(to right, #da22ff, #9733ee)" }}
          className="text-white flex-1 transition-all p-2 active:scale-95 w-[200px] px-6 mt-2 text-xl font-medium rounded-lg"
        >
          Save
        </button>
      </section>
    );
  };

  return (
    <>
      <ModalLayout
        showModal={showModal}
        onHideModal={() => {
          setShowAddCustomLink(false);
          onHideModal();
        }}
      >
        <div>
          <h2 className="text-xl font-semibold">Add Social Links</h2>
          <ul className="flex flex-wrap items-center gap-4 my-4">
            {SOCIALS_TO_ADD.map((social) => {
              const alreadyInDB = userLinks.some(
                (item) =>
                  item.name === social.name &&
                  item.baseUrl === social.baseUrl
              );
              return (
                <li
                  key={social.name}
                  onClick={() => {
                    setSelectedSocial(social as any);
                    onHideModal();
                  }}
                  className={` flex  w-max ${
                    alreadyInDB ? "bg-accentLight" : "bg-grayLight"
                  } gap-2 hover:bg-accentLight active:scale-95 transition-all cursor-pointer rounded-lg px-4 py-2 items-center`}
                >
                  <span style={{ color: social.color }}>{social.icon}</span>
                  <p>{social.name}</p>
                  {alreadyInDB && (
                    <MdOutlineModeEdit size={24} className="text-zinc-700" />
                  )}
                </li>
              );
            })}
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
    </>
  );
};

export default AddLinkModal;
