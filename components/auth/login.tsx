import React from "react";
import Link from "next/link";
import AuthLayout from "../layouts/auth.layout";
import { FcGoogle } from "react-icons/fc";
import { useStore } from "@/store";

const Login = () => {
  const setShowSignUp = useStore((state) => state.setShowSignUp);
  return (
    <AuthLayout>
      <section className="space-y-4 text-xl max-w-[400px] mx-auto h-full">
        <h2 className="text-2xl font-medium">Log in to your account</h2>
        <div>
          <label htmlFor="">Email</label>
          <br />
          <input
            type="email"
            className=" w-full p-3 rounded-lg bg-grayLight outline-none"
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <br />
          <input
            type="email"
            className=" w-full p-3 rounded-lg bg-grayLight outline-none"
          />
        </div>
        <div className="text-center font-medium">or</div>
        <button className="flex items-center bg-accentLight p-3 rounded-lg gap-2 w-full justify-center">
          <FcGoogle /> <p>Continue with google</p>
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
