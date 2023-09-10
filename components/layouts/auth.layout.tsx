import { useRouter } from "next/router";
import React, { FC, ReactNode } from "react";
import { FiChevronLeft } from "react-icons/fi";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="flex min-h-screen justify-center items-center">
      <section className="lg:w-[50%] hidden lg:block bg-accent h-screen"></section>
      <section className=" w-full lg:w-[50%]  relative flex-1 px-4">
        <button
          onClick={() => router.back()}
          className="lg:hidden flex absolute -top-20 "
        >
          <FiChevronLeft size={24} />
          back
        </button>
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
