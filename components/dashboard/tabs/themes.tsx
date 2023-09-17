import { COLORS, GRADIENTS } from "@/constants";
import React from "react";

const Themes = () => {
  return (
    <div className="w-full max-w-[800px] mx-auto h-full">
      <h1 className="font-bold text-2xl py-6 tracking-wider border-b border-grayLight">
        Themes
      </h1>

      <div className=" rounded-lg shadow-md m-4 p-10">
        <h2 className="text-xl font-semibold">Solid</h2>
        <section className="flex gap-4 pt-3 flex-wrap items-end ">
          {COLORS.map((color) => (
            <div
              key={color}
              className="w-[50px] cursor-pointer rounded-lg h-[50px]"
              style={{ background: color }}
            />
          ))}
        </section>
      </div>
      <div className=" rounded-lg shadow-md m-4 p-10">
        <h2 className="text-xl font-semibold">Gradients</h2>
        <section className="flex gap-4 pt-3 flex-wrap items-end ">
          {GRADIENTS.map((color) => (
            <div
              key={color}
              className="w-[50px] cursor-pointer rounded-lg h-[50px]"
              style={{ background: color }}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Themes;
