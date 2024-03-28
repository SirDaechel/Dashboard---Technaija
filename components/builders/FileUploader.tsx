"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from "@/libs/utils";
import Image from "next/image";

type FileUploaderProps = {
  type: string;
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export default function FileUploader({
  type,
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center h-72 cursor-pointer overflow-hidden rounded-xl bg-gray-50 w-full"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : type === "big" ? (
        <div className="flex flex-col items-center justify-center py-5 text-grey-500">
          <img src="/upload.svg" width={50} height={50} alt="file upload" />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <button
            type="button"
            className="bg-[#272829] text-white py-2 px-3 rounded"
          >
            Select from computer
          </button>
        </div>
      ) : (
        <div className="relative bg-gray-200 w-[4.5rem] h-[4.5rem] border-solid border-[1px] border-[#272829] flex items-center justify-center cursor-pointer">
          <Image
            className="flex items-center justify-center"
            src="/plus-circle.svg"
            width={25}
            height={25}
            alt="add-img"
          />
        </div>
      )}
    </div>
  );
}
