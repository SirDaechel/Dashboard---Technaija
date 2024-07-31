import { sortArray } from "@/libs/utils";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";

type productsTableHeadProps = {
  products: TProduct[] | undefined;
  setProducts: Dispatch<SetStateAction<TProduct[] | undefined>>;
  checkedItems: {};
  selectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProductsTableHead = ({
  products,
  setProducts,
  checkedItems,
  selectAll,
}: productsTableHeadProps) => {
  const [openPriceSorting, setOpenPriceSorting] = useState(false);

  const filterPriceByAscendingOrder = () => {
    const sortedproducts = sortArray(products ?? [], "price", "asc");
    setProducts(sortedproducts);
    setOpenPriceSorting(false);
  };

  const filterPriceByDescendingOrder = () => {
    const sortedproducts = sortArray(products ?? [], "price", "desc");
    setProducts(sortedproducts);
    setOpenPriceSorting(false);
  };

  return (
    <thead>
      <tr className="border-b-[1px] border-b-gray-300">
        <th>
          <input
            className="flex w-5 h-5 rounded-lg border-[1px] border-solid border-gray-300 bg-white text-left"
            type="checkbox"
            onChange={selectAll}
            checked={
              !products?.length
                ? false
                : Object.keys(checkedItems).length === products?.length &&
                  Object.values(checkedItems).every((value) => value)
            }
          />
        </th>
        <th>
          <p className="text-sm text-left">Product ID</p>
        </th>
        <th>
          <p className="text-sm text-left">Image</p>
        </th>
        <th>
          <p className="text-sm text-left w-max">Product Name</p>
        </th>
        <th>
          <p className="text-sm text-left">Category</p>
        </th>

        <th>
          <div className="w-fit text-left relative">
            <button
              type="button"
              className="flex items-center justify-start gap-2 cursor-pointer w-fit"
              onClick={() => setOpenPriceSorting(!openPriceSorting)}
            >
              <p className="text-sm text-left">Price</p>
              <div className="flex flex-col">
                <Image
                  className="font-medium"
                  src="/chevron-arrow-up.svg"
                  width={12}
                  height={12}
                  alt="sort"
                />
                <Image
                  className="font-medium"
                  src="/chevron-arrow-down.svg"
                  width={12}
                  height={12}
                  alt="sort"
                />
              </div>
            </button>

            {openPriceSorting && (
              <div className="flex flex-col absolute bg-white py-2 px-1 rounded-lg drop-shadow-md z-10 top-full w-fit border-[1px] border-gray-300">
                <button
                  type="button"
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={filterPriceByAscendingOrder}
                >
                  acending
                </button>
                <button
                  type="button"
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={filterPriceByDescendingOrder}
                >
                  descending
                </button>
              </div>
            )}
          </div>
        </th>
        <th></th>
      </tr>
    </thead>
  );
};

export default ProductsTableHead;
