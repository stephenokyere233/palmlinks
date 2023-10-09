/* eslint-disable react-hooks/exhaustive-deps */
import Outlet from "@/components/dashboard/outlet";
import DashBoardLayout from "@/components/layouts/dash.layout";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { firebaseAuth } from "@/config/firebase.config";
import { useStore } from "@/store";
import { useRouter } from "next/router";
import { useUserProfile } from "@/hooks/useUserProfile.hook";
import DashLoader from "@/components/loader/dash.loader";

const Dashboard = () => {
  const router = useRouter();
  const setAuthUser = useStore((state) => state.setAuthUser);
  const authUser = useStore((state) => state.authUser);
  const { userProfile, getProfile } = useUserProfile();

  async function listenForAuthStateChange() {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user && user.email) {
        setAuthUser(user);
        console.log(user);
      } else console.warn("logged out");
    });
  }


  useEffect(() => {
    listenForAuthStateChange();
    if (authUser) {
      if (!userProfile) getProfile(authUser.uid);
    }
  }, []);


  if (!authUser)
    return (
      <div className="w-full bg-accentLight flex flex-col h-screen items-center justify-center">
        <DashLoader />;
      </div>
    );

  return (
    <DashBoardLayout>
      <Outlet />
    </DashBoardLayout>
  );
};

export default Dashboard;
