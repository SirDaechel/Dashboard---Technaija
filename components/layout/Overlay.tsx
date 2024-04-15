"use client";

import { useSelector } from "react-redux";
import { overlayState } from "@/libs/redux-state/features/overlay/overlaySlice";

const Overlay = () => {
  const theoverlay = useSelector(overlayState);
  const { overlay } = theoverlay;

  return (
    <section
      className="bg-black w-full h-full fixed top-0 right-0 opacity-50 z-[35]"
      style={{ display: overlay ? "block" : "none" }}
    ></section>
  );
};

export default Overlay;
