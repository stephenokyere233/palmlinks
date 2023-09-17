import { FC } from "react";

const CircularLoaderIcon: FC<{ color?: string }> = ({ color = "black" }) => {
  return <span style={{ border: `3px solid ${color}` }} className={`loader`}></span>;
};

export default CircularLoaderIcon;
