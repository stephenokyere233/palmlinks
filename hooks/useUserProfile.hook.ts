import { firebaseAuth, firestoreDB } from "@/config/firebase.config";
import { COLLECTIONS } from "@/constants/enums";
import { ILink, Profile } from "@/interfaces";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useUserProfile = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const getProfile = async (currentUserID: string) => {
    if (!currentUserID) return;
    const docRef = doc(firestoreDB, `${COLLECTIONS.PROFILES}/${currentUserID}`);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data() as Profile);
      } else {
        setUserProfile(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!firebaseAuth.currentUser) return;
    getProfile(firebaseAuth.currentUser.uid);
  }, [router]);

  return { userProfile, getProfile, setUserProfile};
};
