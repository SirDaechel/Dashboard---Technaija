"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import LinkButton from "../ui/LinkButton";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setOpenMobileMenu } from "@/libs/redux-state/features/menu/menuSlice";

const Topnav = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const openMobileMenu = () => {
    dispatch(setOpenMobileMenu(true));
  };

  return (
    <header className="w-full py-4 px-6 border-b-[1px] border-b-gray-00 drop-shadow-md m:fixed m:bg-white m:z-[25]">
      <nav className="flex items-center justify-between">
        <Image
          className="xl:hidden xxl:hidden xxxl:hidden ultra:hidden"
          src="menu.svg"
          width={25}
          height={25}
          alt="menu"
          onClick={openMobileMenu}
        />
        <h3 className="text-[#272829]">
          {pathname === "/"
            ? "Dashboard / Overview"
            : pathname === "/orders"
            ? "Orders"
            : pathname === "/products"
            ? "Products"
            : pathname === "/products/create-product"
            ? "Create product"
            : pathname === "/products/edit-product"
            ? "Edit product"
            : pathname === "/customers"
            ? "Customers"
            : pathname === "/coupons"
            ? "Coupons"
            : pathname === "/coupons/create-coupon"
            ? "Coupons"
            : "Technaija"}
        </h3>
        <SignedOut>
          <LinkButton
            link="/sign-in"
            classname="bg-[#272829] py-1 px-3 rounded text-white"
            text="Sign In"
          />
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </nav>
    </header>
  );
};

export default Topnav;
