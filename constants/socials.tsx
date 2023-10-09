import { AiOutlineYoutube } from "react-icons/ai";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { BiLogoFacebook, BiLogoLinkedin } from "react-icons/bi";

export const SOCIALS_TO_ADD = [
  {
    name: "Twitter",
    icon: <FaXTwitter size={24} color="#1DA1F2" />,
    color: "#1DA1F2",
    baseUrl: "https://twitter.com/",
  },
  {
    name: "Instagram",
    icon: <FaInstagram size={24} color="#C13584" />,
    color: "#C13584",
    baseUrl: "https://www.instagram.com/",
  },
  {
    name: "Facebook",
    icon: <BiLogoFacebook size={24} color="#1877F2" />,
    color: "#1877F2",
    baseUrl: "https://www.facebook.com/",
  },
  {
    name: "LinkedIn",
    icon: <BiLogoLinkedin size={24} color="#0A66C2" />,
    color: "#0A66C2",
    baseUrl: "https://www.linkedin.com/in/",
  },
  {
    name: "YouTube",
    icon: <AiOutlineYoutube size={24} color="#FF0000" />,
    color: "#FF0000",
    baseUrl: "https://www.youtube.com/channel/",
  },
];
