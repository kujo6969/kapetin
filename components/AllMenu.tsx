import Image from "next/image";
import React from "react";

const AllMenu = () => {
  return (
    <div className="flex flex-col p-5">
      <div className="flex flex-row items-end content-end gap-2">
        <Image alt="" src={"/menu_images/coffee.png"} width={50} height={50} />
        <h1 className="text-3xl font-bold">COFFEE</h1>
      </div>
    </div>
  );
};

export default AllMenu;
