import { firebaseAuth, firestoreDB } from "@/config/firebase.config";
import { COLLECTIONS } from "@/constants/enums";
import { UserCredential } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

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
        toast.success("Thank you for Joining Dappdeck!");
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
