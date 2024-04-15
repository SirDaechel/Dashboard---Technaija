"use client";

import Button from "../ui/IconButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SideBarNavProps = {
  closeMobileMenu: () => void;
};

const SideBarNav = ({ closeMobileMenu }: SideBarNavProps) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 m:items-center m:gap-6">
      <Link href="/" onClick={closeMobileMenu}>
        <Button
          classname={`w-full flex items-center gap-3 m:text-3xl ${
            pathname === "/" && "bg-[#45474B]"
          }`}
          src="/dashboard.svg"
          text="Dashboard"
        />
      </Link>
      <Link href="/orders" onClick={closeMobileMenu}>
        <Button
          classname={`w-full flex items-center gap-3 m:text-3xl ${
            pathname === "/orders" && "bg-[#45474B]"
          }`}
          src="/orders.svg"
          text="Orders"
        />
      </Link>
      <Link href="/products" onClick={closeMobileMenu}>
        <Button
          classname={`w-full flex items-center gap-3 m:text-3xl ${
            (pathname === "/products" && "bg-[#45474B]") ||
            (pathname === "/products/create-product" && "bg-[#45474B]") ||
            (pathname === "/products/edit-product" && "bg-[#45474B]")
          }`}
          src="/product.svg"
          text="Products"
        />
      </Link>
      <Link href="/customers" onClick={closeMobileMenu}>
        <Button
          classname={`w-full flex items-center gap-3 m:text-3xl ${
            pathname === "/customers" && "bg-[#45474B]"
          }`}
          src="/customer.svg"
          text="Customers"
        />
      </Link>
      <Link href="/coupons" onClick={closeMobileMenu}>
        <Button
          classname={`w-full flex items-center gap-3 m:text-3xl ${
            (pathname === "/coupons" && "bg-[#45474B]") ||
            (pathname === "/coupons/create-coupon" && "bg-[#45474B]")
          }`}
          src="/star.svg"
          text="Coupons"
        />
      </Link>
    </nav>
  );
};

export default SideBarNav;
