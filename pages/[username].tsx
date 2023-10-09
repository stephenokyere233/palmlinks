import React, { useEffect } from "react";
import { COLLECTIONS } from "@/constants/enums";
import { firestoreDB } from "@/config/firebase.config";
import { Profile } from "@/interfaces";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { timestampToDate } from "@/utils/timestampToString.util";
import Watermark from "@/components/watermark";
import { GRADIENTS } from "@/constants";
import Image from "next/image";
import { BiShareAlt } from "react-icons/bi";
import UserProfileMeta from "@/components/meta/userProfile.meta";
import { SOCIALS_TO_ADD } from "@/constants/socials";

export async function getStaticPaths() {
  const profilesRef = collection(firestoreDB, COLLECTIONS.PROFILES);
  const querySnapshot = await getDocs(profilesRef);
  const paths = querySnapshot.docs.map((doc) => ({
    params: { username: doc.data().profile_path as string },
  }));

  return {
    paths,
    fallback: false, // Set to false to return a 404 if the username is not found
  };
}

export async function getStaticProps(context: { params: { username: any } }) {
  const { username } = context.params;

  try {
    const profilesRef = collection(firestoreDB, COLLECTIONS.PROFILES);
    const q = query(profilesRef, where("profile_path", "==", username));
    const querySnapshot = await getDocs(q);

    let userData: Profile | null = null;

    querySnapshot.forEach((doc) => {
      // Assuming timestampToDate is correctly defined and working
      userData = {
        ...doc.data(),
        dateCreated: timestampToDate(doc.data().dateCreated),
        lastUpdated: timestampToDate(doc.data().lastUpdated),
      } as Profile;
      console.log(doc.data());
    });

    if (!userData) {
      return {
        notFound: true, // Return a 404 page if the user is not found
      };
    }

    console.log(userData);
    return {
      props: { userData },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      notFound: true, // Handle the error by returning a 404 page
    };
  }
}

const GeneratedUserProfile = ({ userData }: any) => {
  useEffect(() => {
    console.log(userData);
  }, []);

  // if (!userData || userData.length < 1) return <></>;
  return (
    <>
      <UserProfileMeta data={userData.settings.seo as Profile} />
      <div className="w-full py-10 px-4 md:px-6 lg:p-10 min-h-screen bg-accentLight flex justify-center">
        <div className="lg:min-w-[600px] w-full items-center flex flex-col ">
          <header className="relative w-full">
            <div className="rounded-full text-primary m-2 bg-white w-10 left-10 h-10 flex items-center justify-center ">
              <BiShareAlt size={24} />
            </div>
          </header>
          <main>
            <section className="flex items-center flex-col">
              <Image
                src="/profile.png"
                className="rounded-full border-[10px] border-primary w-[120px]"
                width={200}
                height={200}
                alt="profile"
              />
              <div className="text-center">
                <h2 className="text-[25px] font-semibold">{userData.user.name}</h2>
                <p className="text-[20px] font-medium text-zinc-800 break-words max-w-[300px] md:max-w-[400px]">
                  {userData.user.bio}
                </p>
              </div>
            </section>
            <section className="flex flex-col gap-4 mt-6">
              {[...userData.links.socials, ...userData.links.other_links].map((link) => {
                const data = SOCIALS_TO_ADD.filter(
                  (item) => link.baseUrl === item.baseUrl
                );
                const icon = data[0].icon;
                return (
                  <button
                    className="bg-grayLight hover:bg-primary hover:text-white transition-all active:scale-95 text-xl flex gap-6 shadow-lg p-4 rounded-lg"
                    key={link.baseUrl}
                  >
                    {icon}
                    {link.baseUrl.split("https://")[1] + link.username}
                  </button>
                );
              })}
            </section>
            <div className=" fixed bottom-6 right-4 lg:right-10">
              <Watermark />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default GeneratedUserProfile;
