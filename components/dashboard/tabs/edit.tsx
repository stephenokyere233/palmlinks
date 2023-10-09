import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useStore } from "@/store";
import FAB from "@/components/FAB";
import AddLinkModal from "@/components/modals/addLink.modal";
import AddSocialModal from "@/components/modals/addSocial.modal";
import { useUserProfile } from "@/hooks/useUserProfile.hook";
import { firebaseAuth, firestoreDB } from "@/config/firebase.config";
import toast from "react-hot-toast";
import CircularLoaderIcon from "@/components/loader/circular";
import { ILink, Profile } from "@/interfaces";
import { SOCIALS_TO_ADD } from "@/constants/socials";
import { BiTrash } from "react-icons/bi";
import { updateUserProfile } from "@/services/account.service";
import { IoMdAdd } from "react-icons/io";

const Edit = () => {
  const userName = useStore((state) => state.userName);
  const setUserName = useStore((state) => state.setUserName);
  const userBio = useStore((state) => state.userBio);
  const setUserBio = useStore((state) => state.setUserBio);
  const showAddLinksModal = useStore((state) => state.showAddLinksModal);
  const setShowAddLinksModal = useStore((state) => state.setShowAddLinksModal);
  const selectedSocial = useStore((state) => state.selectedSocial);
  const setSelectedSocial = useStore((state) => state.setSelectedSocial);
  const setUserLinks = useStore((state) => state.setUserLinks);
  const userLinks = useStore((state) => state.userLinks);
  const { userProfile, getProfile, setUserProfile } = useUserProfile();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userProfile) {
      setUserName(userProfile.user.name);
      setUserBio(userProfile.user.bio);
      setUserLinks(userProfile.links.socials);
    } else {
      firebaseAuth.currentUser && getProfile(firebaseAuth.currentUser.uid);
    }
  }, [userProfile]);

  const removeLink = (social: ILink) => {
    if (!firebaseAuth.currentUser) return;
    if (userProfile) {
      const updatedProfile = {
        ...userProfile,
        links: {
          ...userProfile.links,
          socials: userProfile.links.socials.filter(
            (item) => item.link !== social.link && item.baseUrl !== social.baseUrl
          ),
        },
      };
      setUserProfile(updatedProfile);
      updateUserProfile(firebaseAuth.currentUser.uid, updatedProfile);
    }
  };

  return (
    userProfile && (
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
                <button
                  style={{ background: "linear-gradient(to right, #da22ff, #9733ee)" }}
                  className="text-white max-w-[200px] transition-all p-3 active:scale-95 px-8 text-xl font-medium rounded-lg"
                  onClick={() => {
                    if (!firebaseAuth.currentUser) return;

                    const updatedProfile = {
                      ...userProfile,
                      user: {
                        ...userProfile.user,
                        name: userName,
                        bio: userBio,
                      },
                    };
                    updateUserProfile(firebaseAuth.currentUser.uid, updatedProfile);
                    setUserProfile(updatedProfile);
                  }}
                >
                  {loading ? <CircularLoaderIcon color="black" /> : "Update Profile"}
                </button>
              </div>
              <div className="relative w-[150px] rounded-full  ">
                <Image
                  src="/profile.png"
                  className="w-full rounded-full "
                  width={300}
                  height={300}
                  alt="profile"
                />

                <p className="absolute z-10 bottom-2 left-2 bg-white border ">
                  <IoMdAdd size={24} />
                </p>
              </div>
            </section>
          </div>

          <section className="m-4">
            <div className="flex justify-between pt-4 items-center">
              <h2 className="text-xl font-semibold px-4">Links</h2>
              <button
                onClick={() => setShowAddLinksModal(true)}
                style={{ background: "linear-gradient(to right, #da22ff, #9733ee)" }}
                className="text-white  transition-all p-2 active:scale-95 px-6 text-lg font-medium rounded-lg"
              >
                + Add New Link
              </button>
            </div>
            <ul className="space-y-4 mt-4">
              {userLinks &&
                userLinks.map((link) => {
                  const data = SOCIALS_TO_ADD.filter(
                    (item) => link.baseUrl === item.baseUrl
                  );
                  const icon = data[0].icon;
                  return (
                    <li
                      key={link.baseUrl}
                      className="flex bg-grayLight rounded-lg p-3 px-6 justify-between items-center  gap-2"
                    >
                      <div className="flex items-center gap-2">
                        {icon}
                        <h3>{data[0].name}</h3>
                      </div>
                      <div className="flex items-center gap-4">
                        <p>{link.link}</p>
                        <span onClick={() => removeLink(link)} className="cursor-pointer">
                          <BiTrash color="red" />
                        </span>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </section>
          <section className="m-4">
            <div className="flex gap-10 justify-between">
              {/* <button className=" bg-accentLight hover:bg-accent active:scale-95 hover:text-white transition-all px-8 text-xl font-medium rounded-lg">
                + Add Header
              </button> */}
            </div>
          </section>
        </div>
        <AddLinkModal
          showModal={showAddLinksModal}
          onHideModal={() => setShowAddLinksModal(false)}
        />
        <AddSocialModal
          showModal={selectedSocial}
          data={selectedSocial}
          onHideModal={() => setSelectedSocial(null)}
        />
      </>
    )
  );
};

export default Edit;
