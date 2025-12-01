import React from "react";
import Image from "next/image";
import { appleImg, bagImg, searchImg } from "@/utils";
import { navLists } from "@/constants";

const Nav = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex items-center justify-center bg-black">
      <nav className="flex items-center justify-between w-full max-w-200">
        <Image src={appleImg} alt="iphone_logo" height={18} width={18} />
        <div className="flex gap-x-5 max-sm:hidden text-[#86868b]">
          {navLists.map((nav) => (
            <a href="#" key={nav} className=" text-xs px-3 hover:text-blue-500">
              {nav}
            </a>
          ))}
        </div>

        <div className="flex items-baseline max-sm:justify-end max-sm:flex-1 gap-7">
          <Image src={searchImg} alt="shop icon" width={18} height={19} />
          <Image src={bagImg} alt="shop icon" width={18} height={19} />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
