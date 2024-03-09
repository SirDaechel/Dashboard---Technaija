import Image from "next/image";
import SideBarNav from "../builders/SideBarNav";
import Link from "next/link";

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
      <section className="flex flex-col h-full justify-between">
        <SideBarNav />
        <Link
          href="https://technaija.vercel.app/"
          target="_blank"
          className="w-full flex gap-2 py-2 px-3 bg-white text-[#272829] text-center text-sm font-medium rounded-md"
        >
          <p>Visit Technaija</p>
          <Image src="/link.svg" width={15} height={15} alt="go-to-technaija" />
        </Link>
      </section>
    </aside>
  );
};

export default SideBarMenu;
