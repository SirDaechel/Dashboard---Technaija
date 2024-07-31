"use client";

import AddCategory from "@/components/builders/AddCategory";
import ProductGallery from "@/components/builders/ProductGallery";
import InputBox from "@/components/ui/InputBox";
import { useEffect, useState } from "react";
import ModelInput from "../ui/ModelInput";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TProductSchema, productSchema } from "@/libs/zod";
import FileUploader from "../builders/FileUploader";
import { createProduct, updateProduct } from "@/libs/actions/product.action";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/libs/uploadthing";
import { productDefaultValues } from "@/constants";
import ReactQuillWrapper from "../ui/ReactQuillWrapper";

type ProductFormProps = {
  type: string;
  product?: TProduct;
};

const ProductForm = ({ type, product }: ProductFormProps) => {
  const [model, setModel] = useState<
    {
      text: string;
    }[]
  >([]);

  const [files, setFiles] = useState<File[]>([]);
  const [gallery, setGallery] = useState<
    {
      image: string;
    }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState("Select category");

  const router = useRouter();

  // Set initial form values based on the operation type.
  // If editing an existing product, use its details; otherwise, use default values.
  const initialValues =
    product && type === "edit"
      ? {
          ...product,
        }
      : productDefaultValues;

  // Effect hook to initialize form state when editing a product.
  useEffect(() => {
    // Check if a product is being edited.
    if (product && type === "edit") {
      // Set the model state. Use the product's model if available, or default to an empty array.
      setModel(
        product.additional_information?.model
          ? product.additional_information?.model
          : []
      );
      // Set the selected category state to the product's original category.
      setSelectedCategory(product.original_category);
      // Set the gallery state. Use the product's gallery if available, or default to an empty array.
      setGallery(product.gallery ? product.gallery : []);
    }
  }, []);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues,
  });

  const { startUpload } = useUploadThing("imageUploader");

  const onSubmit = async (data: TProductSchema) => {
    // Initialize the URL for the featured image.
    let uploadedImageUrl = data.featured_image;

    // If there are files to upload, start the upload process.
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      // If the upload fails, exit the function early.
      if (!uploadedImages) {
        return;
      }

      // Update the featured image URL with the first uploaded image's URL.
      uploadedImageUrl = uploadedImages[0].url;
    }

    // If creating a new product, send a request to the product creation endpoint.
    if (type === "create") {
      try {
        // Construct the new product object and send the create request.
        const newProduct = await createProduct({
          product: {
            ...data,
            featured_image: uploadedImageUrl,
            additional_information: { model },
            gallery: gallery.map((img) => ({
              image: img.image,
            })),
            original_category: selectedCategory,
            reviews: [],
          },
          path: "/products",
        });

        // If the product is successfully created, navigate to the products page and reset the form.
        if (newProduct) {
          router.push("/products");
          reset();
        }
      } catch (error) {
        console.log(error);
      }
    }

    // If editing an existing product, send a request to the product update endpoint.
    if (type === "edit") {
      // If the product to edit doesn't exist, navigate back.
      if (!product) {
        router.back();
        return;
      }

      try {
        // Construct the updated product object and send the update request.
        const updatedProduct = await updateProduct({
          productId: product._id,
          product: {
            ...data,
            featured_image: uploadedImageUrl,
            additional_information: { model },
            gallery: gallery.map((img) => ({
              image: img.image,
            })),
            original_category: selectedCategory,
            reviews: [],
          },
          path: "/products",
        });

        // If the product is successfully updated, navigate to the products page and reset the form.
        if (updatedProduct) {
          router.push("/products");
          reset();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="flex items-start justify-start gap-6 m:flex-col m:w-full">
        <div className="w-[70%] flex flex-col gap-8 m:w-full">
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
                {typeof window !== "undefined" && (
                  <Controller
                    name="short_description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <ReactQuillWrapper
                        {...field}
                        className="h-[15rem] mb-12"
                      />
                    )}
                  />
                )}
                {errors.short_description && (
                  <p className="text-red-500">{`${errors.short_description.message}`}</p>
                )}
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
                  {typeof window !== "undefined" && (
                    <Controller
                      name="description"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <ReactQuillWrapper
                          {...field}
                          className="h-[15rem] mb-12"
                        />
                      )}
                    />
                  )}
                  {errors.description && (
                    <p className="text-red-500">{`${errors.description.message}`}</p>
                  )}
                </span>
                <ModelInput label="Models" data={model} setData={setModel} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[30%] flex flex-col gap-8 m:w-full">
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
            className={`mt-6 p-3 disabled:bg-gray-100 disabled:text-[#272829] duration-200 transition disabled:duration-200 disabled:transition disabled:cursor-not-allowed ${
              isSubmitting
                ? "bg-gray-100 text-[#272829]"
                : "bg-[#272829] text-white"
            }`}
            disabled={
              !selectedCategory.length ||
              selectedCategory === "Select category" ||
              isSubmitting
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
