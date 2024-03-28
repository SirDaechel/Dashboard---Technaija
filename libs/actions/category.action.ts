"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import categories from "../database/models/category.model";
import { revalidatePath } from "next/cache";

export const createCategory = async ({ category, path }: NewCategoryParams) => {
  try {
    await connectToDatabase();

    await categories.create({ category: category });

    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};

export const getCategories = async () => {
  try {
    await connectToDatabase();

    const allCategories = await categories.find({});

    return { allCategories: JSON.parse(JSON.stringify(allCategories)) };
  } catch (error) {
    handleError(error);
  }
};
