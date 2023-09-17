/* eslint-disable react-hooks/exhaustive-deps */
import Login from "@/components/auth/login";
import Signup from "@/components/auth/signup";
import { useStore } from "@/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AuthPage = () => {
  const router = useRouter();
  const showSignUp = useStore((state) => state.showSignUp);
  useEffect(() => {
    if (showSignUp) {
      router.push("/auth", {
        query: {
          ...router.query,
          type: "signup",
        },
      });
    } else {
      router.push("/auth", {
        query: {
          ...router.query,
          type: "login",
        },
      });
    }
  }, [showSignUp]);

  useEffect(() => {
    if (router.query.type === "login") {
      setShowSignUp(false);
    } else if (router.query.type === "signup") {
      setShowSignUp(true);
    }
  }, [router]);

  const setShowSignUp = useStore((state) => state.setShowSignUp);

  if (showSignUp) return <Signup />;

  return <Login />;
};

export default AuthPage;
