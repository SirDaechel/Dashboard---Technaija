import Image from "next/image";
import SideBarNav from "../builders/SideBarNav";
import Link from "next/link";

type SideBarMenuProps = {
  closeMobileMenu?: () => void;
};

const SideBarMenu = ({ closeMobileMenu }: SideBarMenuProps) => {
  return (
    <aside className="w-[15%] bg-[#272829] p-8 fixed top-0 left-0 bottom-0 flex flex-col items-center justify-start m:w-full m:gap-24 xl:w-[25%] ultra:relative ultra:h-screen ultra:w-full">
      <Image
        className="mb-10 m:mb-0 m:w-[100px] m:h-[100px]"
        src="/thetechnaija.svg"
        width={75}
        height={75}
        alt="logo"
      />
      <section className="flex flex-col h-full justify-between m:gap-10 m:w-full">
        <SideBarNav closeMobileMenu={closeMobileMenu && closeMobileMenu} />
        <Link
          href="https://technaija.vercel.app/"
          target="_blank"
          className="w-full flex gap-2 py-2 px-3 bg-white text-[#272829] text-center text-sm font-medium rounded-md m:bg-transparent m:text-white m:pb-1 m:text-xl m:rounded-none m:w-full m:justify-center"
        >
          <p>Visit Technaija</p>
          <Image
            src="/link.svg"
            width={15}
            height={15}
            alt="go-to-technaija"
            className="m:hidden"
          />
        </Link>
      </section>
    </aside>
  );
};

export default SideBarMenu;
