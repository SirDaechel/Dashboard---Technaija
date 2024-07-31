"use client";

import InputBox from "../ui/InputBox";
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { createCategory, getCategories } from "@/libs/actions/category.action";
import { usePathname } from "next/navigation";

type AddCategoryProps = {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
};

const AddCategory = ({
  selectedCategory,
  setSelectedCategory,
}: AddCategoryProps) => {
  const pathname = usePathname();

  const [openCategories, setOpenCategories] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState<TCategory[] | undefined>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories?.allCategories);
    };
    fetchCategories();
  }, []);

  // Set product category by clicking on listed category
  const handleSelectCategory = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const category = e.currentTarget.textContent;
    setSelectedCategory(category ?? "Select category");
    setOpenCategories(false);
  };

  // Set product category by adding a new category
  const handleAddNewCategory = async () => {
    if (newCategory.length > 0) {
      setSelectedCategory(
        newCategory.charAt(0).toUpperCase() + newCategory.slice(1)
      );
      await createCategory({
        category: newCategory.charAt(0).toUpperCase() + newCategory.slice(1),
        path: pathname,
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 border-[1px] border-gray-300 p-4 overflow-hidden">
      <h2 className="font-medium text-lg mb-4">Product Category</h2>
      <button
        type="button"
        className="bg-[#272829] text-white p-2 focus:outline-none mb-4"
        onClick={() => setOpenCategories((prev) => !prev)}
      >
        {selectedCategory}
      </button>
      <div
        className="border-t-[1px] border-t-gray-300 pt-4 flex flex-col gap-2"
        style={{ display: openCategories ? "flex" : "none" }}
      >
        <InputBox
          label="Add Category"
          htmlFor="Add Category"
          inputType="text"
          required
          placeholder="Add a new category"
          value={newCategory}
          setValue={setNewCategory}
        />
        <button
          type="button"
          className="bg-[#272829] text-white p-2 mb-3 disabled:bg-gray-100 disabled:text-[#272829] duration-200 transition disabled:duration-200 disabled:transition disabled:cursor-not-allowed"
          onClick={handleAddNewCategory}
          disabled={!!newCategory.length}
        >
          Add
        </button>
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <button
              type="button"
              key={category._id}
              className="border-b-[1px] border-b-gray-300 pb-3 cursor-pointer"
              onClick={(e) => handleSelectCategory(e)}
            >
              {category.category}
            </button>
          ))
        ) : (
          <p className="text-center">No category to display</p>
        )}
      </div>
    </div>
  );
};

export default AddCategory;
