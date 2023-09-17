import React, { useState } from "react";
import AuthLayout from "../layouts/auth.layout";
import { FcGoogle } from "react-icons/fc";
import { useStore } from "@/store";
import toast from "react-hot-toast";
import { firebaseAuth } from "@/config/firebase.config";
import { useRouter } from "next/router";
import { onAuthenticationSuccess } from "@/services/auth.service";
import CircularLoaderIcon from "../loader/circular";
import { GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithPopup, UserCredential } from "firebase/auth";
const googleProvider = new GoogleAuthProvider();

const Signup = () => {
  const router = useRouter();
  const setShowSignUp = useStore((state) => state.setShowSignUp);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const handleCreateNewUser = async () => {
    if (!email || !password || !name) {
      toast.error("Please fill in required details");
      return;
    }
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      await updateProfile(res.user, {
        displayName: name,
      })
        .then(() => {
          onAuthenticationSuccess({
            ...res.user,
            displayName: name,
          })
            .then(() => {
              router.push("/dashboard");
              setShowSignUp(false);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Failed to create user");
        });
    } catch (error) {
      console.error(error);
      toast.error("Oops!..Something went wrong");
      setLoading(false);
    }
  };
  const handleGoogleAuth = () => {
    setGoogleLoading(true);
    signInWithPopup(firebaseAuth, googleProvider)
      .then(async (result: UserCredential) => {
        onAuthenticationSuccess(result.user);
        router.push("/deck");
        setShowSignUp(false);
        setGoogleLoading(false);
        setLoading(false);
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/internal-error).") {
          toast.error("You might be having connection issues");
        } else {
          toast.error(error.message);
        }
        setGoogleLoading(false);
        console.error(error.message);
      });
  };

  return (
    <AuthLayout>
      <section className="space-y-4 text-xl max-w-[400px] mx-auto">
        <h2 className="text-2xl font-medium">Create an account</h2>
        <div>
          <label htmlFor="">Name</label>
          <br />
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" w-full p-3 rounded-lg bg-grayLight outline-none"
          />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" w-full p-3 rounded-lg bg-grayLight outline-none"
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" w-full p-3 rounded-lg bg-grayLight outline-none"
          />
        </div>
        <button onClick={handleCreateNewUser} className="flex items-center bg-accentLight p-3 rounded-lg gap-2 w-full justify-center">
          {loading ? <CircularLoaderIcon /> : <p>Continue</p>}
        </button>
        <div className="text-center font-medium">or</div>
        <button onClick={handleGoogleAuth} className="flex items-center bg-grayLight p-3 rounded-lg gap-2 w-full justify-center">
          {googleLoading ? (
            <CircularLoaderIcon />
          ) : (
            <>
              <FcGoogle /> <p>Continue with google</p>
            </>
          )}
        </button>

        <div className="flex gap-2 items-center justify-center">
          <p>Already a member?</p>
          <button onClick={() => setShowSignUp(false)} className="text-primary">
            Login
          </button>
        </div>
      </section>
    </AuthLayout>
  );
};

export default Signup;
