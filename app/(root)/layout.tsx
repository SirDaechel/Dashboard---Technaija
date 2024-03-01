import SideBar from "@/components/layout/SideBar";
import Topnav from "@/components/layout/Topnav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex items-start justify-start">
        <SideBar />
        <section className="w-[85%]">
          <Topnav />
          {children}
        </section>
      </main>
    </>
  );
}
