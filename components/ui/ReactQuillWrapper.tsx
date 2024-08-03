import dynamic from "next/dynamic";
import { useMemo } from "react";
import { toolbarOptions } from "@/libs/react-quill";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ReactQuillWrapper = ({ ...props }) => {
  const modules = useMemo(
    () => ({
      toolbar: toolbarOptions,
    }),
    []
  );

  return <ReactQuill modules={modules} theme="snow" {...props} />;
};

export default ReactQuillWrapper;
