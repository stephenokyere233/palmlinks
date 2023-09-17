import Outlet from "@/components/dashboard/outlet";
import DashBoardLayout from "@/components/layouts/dash.layout";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { firebaseAuth } from "@/config/firebase.config";
import { useStore } from "@/store";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router=useRouter()
  const setAuthUser = useStore((state) => state.setAuthUser);
  async function listenForAuthStateChange() {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user && user.email) {
        setAuthUser(user);
      } else console.warn("logged out");
    });
  }

  useEffect(() => {
    listenForAuthStateChange();
  }, [firebaseAuth]);

  return (
    <DashBoardLayout>
      <Outlet />
    </DashBoardLayout>
  );
};

export default Dashboard;
