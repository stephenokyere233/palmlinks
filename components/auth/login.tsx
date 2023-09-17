import React, { useState } from "react";
import Link from "next/link";
import AuthLayout from "../layouts/auth.layout";
import { FcGoogle } from "react-icons/fc";
import { useStore } from "@/store";
import toast from "react-hot-toast";
import { firebaseAuth } from "@/config/firebase.config";
import { useRouter } from "next/router";
import { onAuthenticationSuccess } from "@/services/auth.service";
import CircularLoaderIcon from "../loader/circular";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  UserCredential,
  signInWithPopup,
} from "firebase/auth";
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const router = useRouter();
  const setShowSignUp = useStore((state) => state.setShowSignUp);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const handleEPLogin = () => {
    if (!email && !password) {
      toast.error("Please fill in required details");
      return;
    }
    setLoading(true);
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (result: UserCredential) => {
        onAuthenticationSuccess(result.user);
        router.push("/dashboard");
        setShowSignUp(false);
        setLoading(false);
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/internal-error).") {
          toast.error("You might be having connection issues");
        } else if (error.message === "Firebase: Error (auth/user-not-found).") {
          toast.error("User not found");
        } else {
          toast.error(error.message);
        }
        console.error(error.message);
        setLoading(false);
      });
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
      <section className="space-y-4 text-xl max-w-[400px] mx-auto h-full">
        <h2 className="text-2xl font-medium">Log in to your account</h2>
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
        <button
          onClick={handleEPLogin}
          className="flex items-center bg-accentLight p-3 rounded-lg gap-2 w-full justify-center"
        >
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
          <p>Not a member?</p>
          <button onClick={() => setShowSignUp(true)} className="text-primary">
            Create account
          </button>
        </div>
      </section>
    </AuthLayout>
  );
};

export default Login;
