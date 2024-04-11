"use client";

import Button from "../ui/IconButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarNav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      <Link href="/">
        <Button
          classname={`w-full flex items-center gap-3 ${
            pathname === "/" && "bg-[#45474B]"
          }`}
          src="/dashboard.svg"
          text="Dashboard"
        />
      </Link>
      <Link href="/orders">
        <Button
          classname={`w-full flex items-center gap-3 ${
            pathname === "/orders" && "bg-[#45474B]"
          }`}
          src="/orders.svg"
          text="Orders"
        />
      </Link>
      <Link href="/products">
        <Button
          classname={`w-full flex items-center gap-3 ${
            (pathname === "/products" && "bg-[#45474B]") ||
            (pathname === "/products/create-product" && "bg-[#45474B]") ||
            (pathname === "/products/edit-product" && "bg-[#45474B]")
          }`}
          src="/product.svg"
          text="Products"
        />
      </Link>
      <Link href="/customers">
        <Button
          classname={`w-full flex items-center gap-3 ${
            pathname === "/customers" && "bg-[#45474B]"
          }`}
          src="/customer.svg"
          text="Customers"
        />
      </Link>
      <Link href="/coupons">
        <Button
          classname={`w-full flex items-center gap-3 ${
            pathname === "/coupons" && "bg-[#45474B]"
          }`}
          src="/star.svg"
          text="Coupons"
        />
      </Link>
    </nav>
  );
};

export default SideBarNav;
