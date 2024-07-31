import dynamic from "next/dynamic";
import { useMemo } from "react";
import { toolbarOptions } from "@/libs/react-quill";

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ReactQuillWrapper = ({ ...props }) => {
  const modules = useMemo(
    () => ({
      toolbar: toolbarOptions,
    }),
    []
  );

  return (
    <>
      <style jsx global>{`
        @import "react-quill/dist/quill.snow.css";
      `}</style>
      <ReactQuill modules={modules} theme="snow" {...props} />
    </>
  );
};

export default ReactQuillWrapper;
