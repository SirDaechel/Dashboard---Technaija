"use client";

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

  const getHeaderText = (pathname: string) => {
    const pathMap: { [key: string]: string } = {
      "/": "Dashboard / Overview",
      "/orders": "Orders",
      "/products": "Products",
      "/products/create-product": "Create product",
      "/products/edit-product": "Edit product",
      "/customers": "Customers",
      "/coupons": "Coupons",
      "/coupons/create-coupon": "Coupons",
    };

    return pathMap[pathname] || "Technaija";
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
        <h3 className="text-[#272829]">{getHeaderText(pathname)}</h3>
      </nav>
    </header>
  );
};

export default Topnav;
