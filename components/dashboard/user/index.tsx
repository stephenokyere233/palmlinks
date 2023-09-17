import React from "react";
import Image from "next/image";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "@/services/auth.service";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const User = () => {
  const router = useRouter();
  const logOut = () => {
    signOut()
      .then(() => {
        router.push("/");
        toast.success("Logout successful")
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className=" flex flex-col gap-4">
      <div className="h-16 flex items-center hover:bg-grayLight active:scale-95 transition-all justify-center shadow-md rounded-lg">
        <div className="flex items-center gap-3">
          <Image
            src="/profile.png"
            className="rounded-full w-[40px]"
            width={200}
            height={200}
            alt="profile"
          />
          <h3 className="">stephenokyere@gmail.com</h3>
        </div>
      </div>
      <button
        onClick={logOut}
        className="flex bg-red-100 font-semibold shadow-md justify-center text-xl items-center p-3 gap-2 rounded-lg"
      >
        <p>Logout</p>
        <BiLogOut color="red" size={24} />
      </button>
    </section>
  );
};

export default User;
