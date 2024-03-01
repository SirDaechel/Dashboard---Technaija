import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import LinkButton from "../ui/LinkButton";

const Topnav = () => {
  return (
    <header className="w-full py-4 px-6 border-b-[1px] border-b-gray-00">
      <nav className="flex items-center justify-between">
        <h3 className="text-[#272829]">Dashboard / Overview</h3>
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
