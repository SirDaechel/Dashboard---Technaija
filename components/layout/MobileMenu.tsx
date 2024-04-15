"use client";

import Image from "next/image";
import SideBarMenu from "../containers/SideBarMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  menuState,
  setOpenMobileMenu,
} from "@/libs/redux-state/features/menu/menuSlice";

const MobileMenu = () => {
  const dispatch = useDispatch();

  const mobileMenu = useSelector(menuState);
  const { openMobileMenu } = mobileMenu;

  const closeMobileMenu = () => {
    dispatch(setOpenMobileMenu(false));
  };

  return (
    <section
      className={`relative w-[15%] h-screen bg-[#272829] overflow-hidden m:w-full m:fixed m:z-30 ease-in-out transition duration-300 animate-slideInLeft xl:hidden xxl:hidden xxxl:hidden ultra:hidden  ${
        openMobileMenu ? "m:block" : "m:hidden"
      }`}
    >
      <Image
        className="absolute top-11 z-30 right-9 xl:hidden xxl:hidden xxxl:hidden ultra:hidden"
        src="close-white.svg"
        width={35}
        height={35}
        alt="close"
        onClick={closeMobileMenu}
      />
      <SideBarMenu closeMobileMenu={closeMobileMenu} />
    </section>
  );
};

export default MobileMenu;
