import { FC } from "react";

const DashLoader: FC<{ color?: string }> = ({ color = "black" }) => {
  return <span className={`dash-loader`}></span>;
};

export default DashLoader;
