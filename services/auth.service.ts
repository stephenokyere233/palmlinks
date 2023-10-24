import { firebaseAuth, firestoreDB } from "@/config/firebase.config";
import { COLLECTIONS } from "@/constants/enums";
import { Profile } from "@/interfaces";
import { UserCredential } from "firebase/auth";
import { Timestamp, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "sonner";

const createUserProfile = async (firebaseUser: UserCredential["user"]) => {
  if (!firebaseUser) return;
  const docRef = doc(firestoreDB, `${COLLECTIONS.PROFILES}/${firebaseUser.uid}`);
  const newUserProfile: Profile = {
    dateCreated: serverTimestamp() as Timestamp,
    lastUpdated: serverTimestamp() as Timestamp,
    profile_path: firebaseUser.displayName?.split(" ")[0]?.toLowerCase() as string,
    uid: firebaseUser.uid,
    user: {
      id: firebaseUser.uid,
      bio: "",
      name: firebaseUser.displayName as string,
      email: firebaseUser.email as string,
      profile: firebaseUser.photoURL as string,
      verified: firebaseUser.emailVerified,
    },
    links: {
      socials: [],
      other_links: [],
    },
    settings: {
      theme: "default",
      SEO: {
        title: firebaseUser.displayName as string,
        description: "",
        og_image: "",
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
