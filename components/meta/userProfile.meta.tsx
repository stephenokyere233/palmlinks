import { Profile } from "@/interfaces";
import Head from "next/head";
import React, { FC } from "react";

const UserProfileMeta:FC<{data:any}> = ({ data }) => {
  const SITE_URL = "";
  return (
    <Head>
      <title>{`${data.title}`}</title>
      <meta name="title" content={`${data.title}`} />
      <meta name="description" content={`${data.description}`} />
      <link rel="canonical" href={`${SITE_URL}`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE_URL}/${data.profile_path}`} />
      <meta property="og:title" content={`${data.title}`} />
      <meta property="og:description" content={`${data.description}`} />
      <meta property="og:image" content={`${SITE_URL}/assets/images/help_img4.webp`} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${SITE_URL}`} />
      <meta property="twitter:title" content={`${data.title}`} />
      <meta property="twitter:description" content={`${data.description}`} />
      <meta property="twitter:image" content={`${data.og_image}`} />
    </Head>
  );
};

export default UserProfileMeta;
