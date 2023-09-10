import Login from "@/components/auth/login";
import Signup from "@/components/auth/signup";
import { useStore } from "@/store";
import React from "react";

const AuthPage = () => {
  const showSignUp = useStore((state) => state.showSignUp);
  const setShowSignUp = useStore((state) => state.setShowSignUp);

  if (showSignUp) return <Signup />;
  return <Login/>;
};

export default AuthPage;
