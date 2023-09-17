import React, { useState } from "react";

const Settings = () => {
  const [SEOTitle, setSEOTitle] = useState<string>("");
  const [SEODescription, setSEODescription] = useState<string>("");
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
