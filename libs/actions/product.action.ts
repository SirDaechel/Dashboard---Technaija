"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Products from "../database/models/product.model";
import { revalidatePath } from "next/cache";

export const getProducts = async ({ limit, page }: getProductParams) => {
  try {
    await connectToDatabase();

    let productQuery;

    productQuery = Products.find({}).limit(limit);

    const productsCount = await Products.find({}).countDocuments();

    // Apply pagination if page is provided
    if (page) {
      productQuery = productQuery.skip((page - 1) * limit);
    }

    // Get the total number of the current product query
    const totalPages = Math.ceil(productsCount / limit);

    const pageNumbers: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const productsData = await productQuery;

    return {
      products: JSON.parse(JSON.stringify(productsData.reverse())),
      pageNumbers,
    };
  } catch (error) {
    handleError(error);
  }
};

export const createProduct = async ({ product, path }: CreateProductParams) => {
  try {
    await connectToDatabase();

    const newProduct = await Products.create(product);

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newProduct));
  } catch (error) {
    handleError(error);
  }
};

export const deleteProduct = async ({
  products,
  path,
}: deleteProductsParams) => {
  try {
    await connectToDatabase();

    // Construct an array of ids from products
    const idsToDelete = products.map((product) => product.id);

    // Perform the deletion
    await Products.deleteMany({
      _id: { $in: idsToDelete },
    });

    revalidatePath(path ?? "");
  } catch (error) {
    handleError(error);
  }
};

export const getProductById = async (productId: string) => {
  try {
    await connectToDatabase();

    const product = await Products.findById(productId);

    if (!product) throw new Error("Product not found");

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    handleError(error);
  }
};

export const updateProduct = async ({
  productId,
  product,
  path,
}: UpdateProductParams) => {
  try {
    await connectToDatabase();

    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      { ...product },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedProduct));
  } catch (error) {
    handleError(error);
  }
};
