import React, { useState } from "react";
import Link from "next/link";
import AuthLayout from "../layouts/auth.layout";
import { FcGoogle } from "react-icons/fc";
import { useStore } from "@/store";
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
import { FIREBASE_AUTH_ERRORS, ERROR_MESSAGES } from "@/constants/errors";
import { toast } from "sonner";
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
      if (error.message === FIREBASE_AUTH_ERRORS.invalidEmail)
          toast.error(ERROR_MESSAGES.AUTH.invalidEmail);
        else if (error.message === FIREBASE_AUTH_ERRORS.connectionError)
          toast.error(ERROR_MESSAGES.AUTH.connectionError);
        else if (error.message === FIREBASE_AUTH_ERRORS.serverError)
          toast.error(ERROR_MESSAGES.AUTH.serverError);
        else if (error.message === FIREBASE_AUTH_ERRORS.userNotFound)
          toast.error(ERROR_MESSAGES.AUTH.userNotFound);
        else if (error.message === FIREBASE_AUTH_ERRORS.wrongPassword)
          toast.error(ERROR_MESSAGES.AUTH.wrongPassword);
        else {
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
        router.push("/dashboard");
        setShowSignUp(false);
        setGoogleLoading(false);
      })
      .catch((error) => {
        setGoogleLoading(false);
        console.error(error.message);
        if (error.message === FIREBASE_AUTH_ERRORS.connectionError)
          toast.error(ERROR_MESSAGES.AUTH.connectionError);
        else if (error.message === FIREBASE_AUTH_ERRORS.serverError)
          toast.error(ERROR_MESSAGES.AUTH.serverError);
        else if (error.message === FIREBASE_AUTH_ERRORS.popupClosed)
          toast.error(ERROR_MESSAGES.AUTH.popupClosed);
        else {
          toast.error(error.message);
        }
      });
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center">
        <button
          onClick={() => setShowSignUp(true)}
          className=" absolute top-10 right-2 md:right-4 lg:right-16 active:scale-95 transition-all hover:bg-accentLight bg-accent font-medium p-3 px-10 rounded-lg gap-2 w-max"
        >
          Create account
        </button>

        <section className="space-y-4 text-xl min-w-[400px] mx-auto h-full">
          <h2 className="text-2xl font-medium">Continue to dashboard</h2>
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
            disabled={loading}
            className="flex items-center bg-accentLight p-3 rounded-lg gap-2 w-full justify-center"
          >
            {loading ? <CircularLoaderIcon color="white" /> : <p>Continue</p>}
          </button>
          <div className="text-center font-medium">or</div>
          <button
            onClick={handleGoogleAuth}
            disabled={googleLoading}
            className="flex items-center bg-grayLight p-3 rounded-lg gap-2 w-full justify-center"
          >
            {googleLoading ? (
              <CircularLoaderIcon />
            ) : (
              <>
                <FcGoogle /> <p>Continue with google</p>
              </>
            )}
          </button>
        </section>
      </div>
    </AuthLayout>
  );
};

export default Login;
