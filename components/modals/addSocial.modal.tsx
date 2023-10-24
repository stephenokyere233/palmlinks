import Link from "next/link";
import ModalLayout from "../layouts/modal.layout";
import { useEffect, useState } from "react";
import { useStore } from "@/store";
import { firebaseAuth, firestoreDB } from "@/config/firebase.config";
import { COLLECTIONS } from "@/constants/enums";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useUserProfile } from "@/hooks/useUserProfile.hook";
import { ILink } from "@/interfaces";
import { toast } from "sonner";

const AddSocialModal = ({ data, showModal, onHideModal }: any) => {
  const [link, setLink] = useState<string>("");
  const setShowAddLinksModal = useStore((state) => state.setShowAddLinksModal);
  const setUserLinks = useStore((state) => state.setUserLinks);
  const userLinks = useStore((state) => state.userLinks);
  const [loading, setLoading] = useState<boolean>(false);
  const [itemFromDB, setItemFromDB] = useState<ILink>();
  const { userProfile, getProfile } = useUserProfile();

  const addOrUpdate = (socials: ILink[], newLink: ILink) => {
    let updatedUserLinks: ILink[] = [...socials];
    const existingLinkIndex = socials.findIndex(
      (userLink) => userLink.name === newLink.name && userLink.baseUrl === newLink.baseUrl
    );
    if (existingLinkIndex !== -1) {
      updatedUserLinks[existingLinkIndex].username = newLink.username;
      updatedUserLinks[existingLinkIndex].link = newLink.baseUrl + newLink.username;
    } else {
      updatedUserLinks.push(newLink);
    }
    setUserLinks(updatedUserLinks);
    return updatedUserLinks;
  };

  const updateProfileSocials = async (newSocial: any) => {
    if (!userProfile || !firebaseAuth.currentUser) return;
    const docRef = doc(
      firestoreDB,
      `${COLLECTIONS.PROFILES}/${firebaseAuth.currentUser.uid}`
    );
    setLoading(true);
    const toastId = toast.loading("loading...");

    const updatedProfile = {
      ...userProfile,
      links: {
        ...userProfile?.links,
        socials: addOrUpdate([...userProfile.links.socials], newSocial),
      },
    };
    await updateDoc(docRef, { ...updatedProfile, lastUpdated: serverTimestamp() })
      .then(async (res) => {
        console.log(res);
        toast.dismiss(toastId);
        setLoading(false);
        firebaseAuth.currentUser && getProfile(firebaseAuth.currentUser.uid);
        setLink("");
        onHideModal();
        toast.success("Added new social");
      })
      .catch((err) => {
        toast.dismiss(toastId);
        setLoading(false);
        toast.error("An error occurred while updating your profile");
      });
  };

  useEffect(() => {
    if (!data) return;
    const _itemFromDB = userLinks.filter(
      (item) => item.name === data.name && item.baseUrl === data.baseUrl
    );
    if (!_itemFromDB || _itemFromDB.length < 1) return;

    setLink(_itemFromDB[0].username);
    setItemFromDB(_itemFromDB as any);
  }, [data]);

  if (!showModal) return <></>;
  return (
    <ModalLayout showModal={showModal} onHideModal={onHideModal}>
      <section key={data.baseUrl}>
        <p
          className="cursor-pointer"
          onClick={() => {
            onHideModal();
            setShowAddLinksModal(true);
          }}
        >
          ←back
        </p>
        <div className="flex items-center gap-2">
          <span style={{ color: data.color }}>{data.icon}</span>
          <h2 className="text-xl font-semibold my-2">{data.name}</h2>
        </div>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="items-center gap-1 px-2 p-1  outline-none indent-2 rounded-lg w-full bg-grayLight flex">
              <h3 className="font-semibold">{data.baseUrl.split("https://")[1]}</h3>
              <input
                type="url"
                placeholder="your_username"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="py-3 outline-none  w-full bg-grayLight"
              />
            </div>
          </div>
        </div>
        <button
          onClick={() =>
            updateProfileSocials({
              baseUrl: data.baseUrl,
              name: data.name,
              username: link,
              link: data.baseUrl + link,
            })
          }
          style={{ background: "linear-gradient(to right, #da22ff, #9733ee)" }}
          className="text-white flex-1 transition-all p-2 active:scale-95 w-full px-6 mt-2 text-xl font-medium rounded-lg"
        >
          Save
        </button>
      </section>
    </ModalLayout>
  );
};

export default AddSocialModal;
