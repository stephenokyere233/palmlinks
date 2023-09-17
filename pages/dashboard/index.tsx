import Outlet from "@/components/dashboard/outlet";
import DashBoardLayout from "@/components/layouts/dash.layout";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { firebaseAuth } from "@/config/firebase.config";
import { useStore } from "@/store";

const Dashboard = () => {
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
  }, []);
  return (
    <DashBoardLayout>
      <Outlet />
    </DashBoardLayout>
  );
};

export default Dashboard;