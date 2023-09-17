import React, { useEffect, useState } from "react";
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
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { doc } from "firebase/firestore";
import { ERROR_MESSAGES, FIREBASE_AUTH_ERRORS } from "@/constants/errors";
const googleProvider = new GoogleAuthProvider();

const Signup = () => {
  const router = useRouter();
  const setShowSignUp = useStore((state) => state.setShowSignUp);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);

  const checkUserNameExists = () => {};
  useEffect(() => {
    if (router.query.username) {
      setName(router.query.username as string);
    }
  }, [router]);

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
    } catch (error: any) {
      console.error(error);
      setLoading(false);
      if (error.message === FIREBASE_AUTH_ERRORS.emailInUse)
        toast.error(ERROR_MESSAGES.AUTH.emailInUse);
      else if (error.message === FIREBASE_AUTH_ERRORS.invalidEmail)
        toast.error(ERROR_MESSAGES.AUTH.invalidEmail);
      else if (error.message === FIREBASE_AUTH_ERRORS.connectionError)
        toast.error(ERROR_MESSAGES.AUTH.connectionError);
      else if (error.message === FIREBASE_AUTH_ERRORS.weakPassword)
        toast.error(ERROR_MESSAGES.AUTH.weakPassword);
      else if (error.message === FIREBASE_AUTH_ERRORS.serverError)
        toast.error(ERROR_MESSAGES.AUTH.serverError);
      else {
        toast.error(error.message);
      }
    }
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
      <div className=" min-h-screen flex items-center">
        <button
          onClick={() => setShowSignUp(false)}
          className=" absolute top-10 right-16 active:scale-95 transition-all hover:bg-accentLight bg-accent font-medium p-3 px-10 rounded-lg gap-2 w-max"
        >
          Login
        </button>
        <section className="space-y-4 text-xl min-w-[400px] mx-auto relative">
          <h2 className="text-2xl font-medium">Create an account</h2>
          <div>
            <label htmlFor="">Username</label>
            <br />
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" w-full p-3 rounded-lg bg-grayLight outline-none"
            />
            <br />
            {nameError && (
              <p className="text-sm text-red-500 font-medium">username already taken</p>
            )}
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
          <button
            onClick={handleCreateNewUser}
            disabled={loading}
            className=" bg-accentLight p-3 rounded-lg gap-2 w-full"
          >
            {loading ? <CircularLoaderIcon /> : <p>Continue</p>}
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

          <div className="flex gap-2 items-center justify-center">
            {/* <p>Already a member?</p> */}
          </div>
        </section>
      </div>
    </AuthLayout>
  );
};

export default Signup;
