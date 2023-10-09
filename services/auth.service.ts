import { firebaseAuth, firestoreDB } from "@/config/firebase.config";
import { COLLECTIONS } from "@/constants/enums";
import { UserCredential } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const createUserProfile = async (firebaseUser: UserCredential["user"]) => {
  const docRef = doc(firestoreDB, `${COLLECTIONS.PROFILES}/${firebaseUser.uid}`);
  const newUserProfile = {
    dateCreated: serverTimestamp(),
    lastUpdated: serverTimestamp(),
    profile_path:firebaseUser.displayName?.toLowerCase(),
    uid: firebaseUser.uid,
    user: {
      id: firebaseUser.uid,
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      verified: firebaseUser.emailVerified,
    },
    links: {
      socials: [],
      other_links: [],
    },
    settings: {
      theme: "default",
      seo: {
        title: firebaseUser.displayName,
        description: null,
        og_image: null,
      },
    },
  };
  await setDoc(docRef, newUserProfile);
  toast.success("Your profile has been created!");
};

export async function onAuthenticationSuccess(firebaseUser: UserCredential["user"]) {
  let docRef = doc(firestoreDB, `${COLLECTIONS.USERS}/${firebaseUser.uid}`);
  let docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    if (!firebaseUser.email) return;
    let newUser = {
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || firebaseUser.email,
      dateRegistered: serverTimestamp(),
    };

    setDoc(doc(firestoreDB, `${COLLECTIONS.USERS}/${firebaseUser.uid}`), newUser)
      .then(async () => {
        toast.success("Thank you for Joining PalmLinks!");
        createUserProfile(firebaseUser);
      })
      .catch(() => toast.error("Couldn't add user"));
  } else {
    toast.success("Welcome back to your deck!");
  }
}

export async function signOut() {
  firebaseAuth
    .signOut()
    .then(() => {
      sessionStorage.clear();
      localStorage.clear();
      toast.success("You have successfully logged out");
    })
    .catch((error) => {
      console.log(error);
      toast.error("Something happened while trying to log you out");
    });
}
