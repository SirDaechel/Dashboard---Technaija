import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";

type ProductGalleryProps = {
  gallery: string[];
  setGallery: Dispatch<SetStateAction<string[]>>;
};

const ProductGallery = ({ gallery, setGallery }: ProductGalleryProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Select image from file manager then convert to URL
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Ensure reader.result is a string before adding to the gallery
      if (typeof reader.result === "string") {
        setGallery([...gallery, reader.result]);
      }
    };
    if (file) reader.readAsDataURL(file);
  };

  // Trigger the file input
  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  // Remove image from gallery
  const removeImg = (indexToRemove: number) => {
    const imageIndex = gallery.filter((_, index) => index !== indexToRemove);
    setGallery(imageIndex);
  };

  return (
    <span className="grid grid-cols-3 items-center justify-center gap-1">
      {gallery.length > 0 &&
        gallery.map((img, index) => (
          <div key={index} className="relative group w-max">
            <Image
              className="cursor-pointer duration-200 group-hover:opacity-20 group-hover:transition group-hover:duration-200"
              src={img}
              width={80}
              height={80}
              quality={100}
              alt="product-thumbnail"
            />
            <p
              className="hidden center text-red-500 cursor-pointer group-hover:flex"
              onClick={() => removeImg(index)}
            >
              remove
            </p>
          </div>
        ))}
      <div
        className="relative bg-gray-200 w-[4.5rem] h-[4.5rem] border-solid border-[1px] border-[#272829] flex items-center justify-center cursor-pointer"
        onClick={handleButtonClick}
      >
        <input
          ref={fileInputRef}
          accept="image/*"
          type="file"
          name="upload-img"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <Image
          className="flex items-center justify-center"
          src="/plus-circle.svg"
          width={25}
          height={25}
          alt="add-img"
        />
      </div>
    </span>
  );
};

export default ProductGallery;
