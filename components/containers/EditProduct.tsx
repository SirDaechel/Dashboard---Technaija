"use client";

import { getProductById } from "@/libs/actions/product.action";
import ProductForm from "./ProductForm";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../ui/Loader";

const EditProduct = () => {
  const [productToEdit, setProductToEdit] = useState<TProduct>();
  const searchParams = useSearchParams();
  const UrlSearchParams = new URLSearchParams(searchParams.toString());
  const productId = UrlSearchParams.get("edit");

  // Retrieve the product ID from the URL and fetch the corresponding product details.
  useEffect(() => {
    const getProductToEdit = async () => {
      try {
        // If `productId` is present, call `getProductById` to fetch product details.
        // Otherwise, pass an empty string to avoid invalid requests.
        const product = await getProductById(productId ? productId : "");
        // Update the state with the fetched product details for editing.
        setProductToEdit(product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProductToEdit();
  }, [productId]);

  return (
    <section>
      {productToEdit ? (
        <ProductForm type="edit" product={productToEdit} />
      ) : (
        <Loader className="loader2" />
      )}
    </section>
  );
};

export default EditProduct;
