import Button from "../ui/IconButton";
import Link from "next/link";

const SideBarNav = () => {
  return (
    <nav className="flex flex-col gap-1">
      <Link href="/">
        <Button
          classname="w-full flex items-center gap-3"
          src="/dashboard.svg"
          text="Dashboard"
        />
      </Link>
      <Link href="/orders">
        <Button
          classname="w-full flex items-center gap-3"
          src="/orders.svg"
          text="Orders"
        />
      </Link>
      <Link href="/products">
        <Button
          classname="w-full flex items-center gap-3"
          src="/product.svg"
          text="Products"
        />
      </Link>
      <Link href="/customers">
        <Button
          classname="w-full flex items-center gap-3"
          src="/customer.svg"
          text="Customers"
        />
      </Link>
      <Link href="/notifications">
        <Button
          classname="w-full flex items-center gap-3"
          src="/bell.svg"
          text="Notifications"
        />
      </Link>
      <Link href="/coupons">
        <Button
          classname="w-full flex items-center gap-3"
          src="/star.svg"
          text="Coupons"
        />
      </Link>
    </nav>
  );
};

export default SideBarNav;
