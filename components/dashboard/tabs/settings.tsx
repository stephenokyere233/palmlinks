import CircularLoaderIcon from "@/components/loader/circular";
import { firebaseAuth } from "@/config/firebase.config";
import { useUserProfile } from "@/hooks/useUserProfile.hook";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import Image from "next/image";

const Settings = () => {
  const [SEOTitle, setSEOTitle] = useState<string>("");
  const [SEODescription, setSEODescription] = useState<string>("");
  const { userProfile, getProfile } = useUserProfile();
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!firebaseAuth.currentUser) return;
    if (!userProfile) getProfile(firebaseAuth.currentUser.uid);

    setSEOTitle(userProfile?.settings.SEO?.title as string);
    if (userProfile?.settings.SEO.description)
      setSEODescription(userProfile?.settings.SEO?.description);
  }, [userProfile]);

  return (
    <div className="w-full max-w-[800px] mx-auto h-full">
      <h1 className="font-bold text-2xl py-6 tracking-wider border-b border-grayLight">
        Settings
      </h1>
      <div className=" rounded-lg shadow-md m-4 p-10 space-y-4">
        <div>
          <h2 className="text-xl font-semibold">SEO</h2>
          <p>Customize your SEO </p>
        </div>

        <input
          type="text"
          placeholder="SEO Title"
          value={SEOTitle}
          onChange={(e) => setSEOTitle(e.target.value)}
          className="p-3 outline-none indent-2 rounded-lg w-full bg-grayLight"
        />

        <textarea
          placeholder="SEO Description"
          value={SEODescription}
          onChange={(e) => setSEODescription(e.target.value)}
          className="p-3 outline-none indent-2 min-h-[150px] rounded-lg w-full bg-grayLight"
        />
        <Dropzone
          maxFiles={1}
          multiple={false}
          onDrop={(acceptedFiles) => {
            console.log(acceptedFiles);
            setFile(acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className=" bg-grayLight h-[200px] flex items-center justify-center rounded-lg p-4">
                
                  {
file?                    <Image
                      src={URL.createObjectURL(file)}
                      className="w-max h-full transition-all active:scale-95 "
                      width={300}
                      height={300}
                      alt="profile"
                    /> :<p>  Drag an Image here, or click to select one</p>
                  }
                </div>
              </div>
            </section>
          )}
        </Dropzone>

        <button
          style={{ background: "linear-gradient(to right, #da22ff, #9733ee)" }}
          className="text-white max-w-[200px] transition-all p-3 active:scale-95 px-8 text-xl font-medium rounded-lg"
          onClick={() => {
            if (!firebaseAuth.currentUser) return;

            // const updatedProfile = {
            //   ...userProfile,
            //   user: {
            //     ...userProfile.user,
            //     name: userName,
            //     bio: userBio,
            //   },
            // };
            // updateUserProfile(firebaseAuth.currentUser.uid, updatedProfile);
            // setUserProfile(updatedProfile);
          }}
        >
          {loading ? <CircularLoaderIcon color="black" /> : "Update SEO"}
        </button>
      </div>
      <div className=" rounded-lg shadow-md m-4 p-10 space-y-4">
        <h2 className="text-xl font-semibold">My Username</h2>
        <div className="items-center gap-1 px-4 p-1 outline-none indent-2 rounded-lg w-full bg-grayLight flex">
          <p>palm.link/</p>
          <input type="text" className="py-2 w-full bg-grayLight outline-none" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
