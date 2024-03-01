import Button from "../ui/IconButton";

const SideBarNav = () => {
  return (
    <nav className="flex flex-col gap-1">
      <Button
        classname="flex items-center gap-3"
        src="/dashboard.svg"
        text="Dashboard"
      />
      <Button
        classname="flex items-center gap-3"
        src="/orders.svg"
        text="Orders"
      />
      <Button
        classname="flex items-center gap-3"
        src="/product.svg"
        text="Products"
      />
      <Button
        classname="flex items-center gap-3"
        src="/customer.svg"
        text="Customers"
      />
      <Button
        classname="flex items-center gap-3"
        src="/bell.svg"
        text="Notifications"
      />
      <Button
        classname="flex items-center gap-3"
        src="/star.svg"
        text="Coupons"
      />
    </nav>
  );
};

export default SideBarNav;
