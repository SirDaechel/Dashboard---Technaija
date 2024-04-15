import SideBarMenu from "../containers/SideBarMenu";

const SideBar = () => {
  return (
    <section className="w-[15%] h-screen bg-[#272829] overflow-hidden m:hidden xl:w-[25%]">
      <SideBarMenu />
    </section>
  );
};

export default SideBar;
