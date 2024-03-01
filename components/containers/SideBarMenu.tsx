import Image from "next/image";
import SideBarNav from "../builders/SideBarNav";

const SideBarMenu = () => {
  return (
    <aside className="w-[15%] bg-[#272829] p-8 fixed top-0 left-0 bottom-0 flex flex-col items-center justify-start">
      <Image
        className="mb-10"
        src="/thetechnaija.svg"
        width={75}
        height={75}
        alt="logo"
      />
      <SideBarNav />
    </aside>
  );
};

export default SideBarMenu;
