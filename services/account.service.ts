import { firestoreDB } from "@/config/firebase.config";
import { COLLECTIONS } from "@/constants/enums";
import { Profile } from "@/interfaces";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";

export const updateUserProfile = async (uid: string, updatedProfile: Profile) => {
  const docRef = doc(firestoreDB, `${COLLECTIONS.PROFILES}/${uid}`);
  const toastId = toast.loading("Updating Profile...");
  try {
    await updateDoc(docRef, { ...updatedProfile, lastUpdated: serverTimestamp() });
    toast.dismiss(toastId);
    toast.success("Profile updated");
  } catch (error) {
    toast.dismiss(toastId);
    toast.error("Failed to update profile");
    console.log(error);
  }
};
