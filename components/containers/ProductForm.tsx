"use client";

import AddCategory from "@/components/builders/AddCategory";
import ProductGallery from "@/components/builders/ProductGallery";
import InputBox from "@/components/ui/InputBox";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ModelInput from "../ui/ModelInput";
import { toolbarOptions } from "@/libs/react-quill";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TProductSchema } from "@/libs/zod";
import { productSchema } from "@/libs/zod";
import FileUploader from "../builders/FileUploader";
import { createProduct } from "@/libs/actions/product.action";
import { usePathname } from "next/navigation";

type ProductFormProps = {
  type: string;
};

const ProductForm = ({ type }: ProductFormProps) => {
  const [model, setModel] = useState<
    {
      text: string;
    }[]
  >([]);
  const [modelsError, setModelsError] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Select category");

  const pathname = usePathname();

  const quillModule = {
    toolbar: toolbarOptions,
  };

  useEffect(() => {
    console.log(model);
  }, [model]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TProductSchema>({ resolver: zodResolver(productSchema) });

  const onSubmit = async (data: TProductSchema) => {
    const newProduct = {
      ...data,
      additional_information: { model },
      gallery: gallery.map((img) => ({
        image: img,
      })),
      original_category: selectedCategory,
      reviews: undefined,
    };

    await createProduct({ product: newProduct, path: pathname });

    console.log(newProduct);
    // reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="flex items-start justify-start gap-6">
        <div className="w-[70%] flex flex-col gap-8">
          <div className="h-fit border-[1px] border-gray-300 p-4 overflow-hidden">
            <h2 className="font-medium text-lg mb-4">General</h2>
            <div className="flex flex-col gap-8">
              <InputBox
                inputRegister={register("name")}
                label="Product Name"
                htmlFor="Product Name"
                inputType="text"
                required
                error={
                  errors.name && (
                    <p className="text-red-500">{`${errors.name.message}`}</p>
                  )
                }
              />
              <span>
                <p className="font-light">
                  Short Description <span>(Optional)</span>
                </p>
                <Controller
                  name="short_description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <ReactQuill
                      {...field}
                      className="h-[15rem] mb-12"
                      modules={quillModule}
                      theme="snow"
                    />
                  )}
                />
              </span>
            </div>
          </div>
          <div className="h-fit border-[1px] border-gray-300 p-4 overflow-hidden">
            <div>
              <h2 className="font-medium text-lg mb-4">Pricing</h2>
              <div className="flex flex-col gap-4">
                <InputBox
                  inputRegister={register("price")}
                  label="Base Price"
                  htmlFor="Base Price"
                  inputType="number"
                  required
                  error={
                    errors.price && (
                      <p className="text-red-500">{`${errors.price.message}`}</p>
                    )
                  }
                />
                <InputBox
                  inputRegister={register("sales_price")}
                  label="Sale Price"
                  htmlFor="Sale Price"
                  inputType="number"
                  error={
                    errors.sales_price && (
                      <p className="text-red-500">{`${errors.sales_price.message}`}</p>
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="h-fit border-[1px] border-gray-300 p-4 overflow-hidden">
            <div>
              <h2 className="font-medium text-lg mb-4">More Details</h2>
              <div className="flex flex-col">
                <span>
                  <p className="font-light">
                    Main Description <span className="text-red-400">*</span>
                  </p>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <ReactQuill
                        {...field}
                        className="h-[15rem] mb-12"
                        modules={quillModule}
                        theme="snow"
                      />
                    )}
                  />
                </span>
                <ModelInput
                  label="Models"
                  data={model}
                  setData={setModel}
                  error={modelsError}
                  setError={setModelsError}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[30%] flex flex-col gap-8">
          <div className="border-[1px] border-gray-300 p-4 overflow-hidden">
            <h2 className="font-medium text-lg mb-4">Thumbnail</h2>
            <div className="flex flex-col gap-4 items-center">
              <Controller
                name="featured_image"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FileUploader
                    type="big"
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                )}
              />
            </div>
          </div>
          <div className="border-[1px] border-gray-300 p-4 overflow-hidden">
            <h2 className="font-medium text-lg mb-4">Gallery</h2>
            <ProductGallery gallery={gallery} setGallery={setGallery} />
          </div>
          <AddCategory
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <button
            type="submit"
            className="mt-6 bg-[#272829] p-3 text-white disabled:bg-gray-100 disabled:text-[#272829] duration-200 transition disabled:duration-200 disabled:transition disabled:cursor-not-allowed"
            disabled={
              !selectedCategory.length || selectedCategory === "Select category"
                ? true
                : false
            }
          >
            {isSubmitting
              ? "...submitting"
              : type === "create"
              ? "Create Product"
              : "Edit Product"}
          </button>
        </div>
      </section>
    </form>
  );
};

export default ProductForm;
