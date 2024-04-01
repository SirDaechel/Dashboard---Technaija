import { Dispatch, SetStateAction } from "react";
import ProductsTableBody from "./ProductsTableBody";
import ProductsTableHead from "./ProductsTableHead";
import Loader from "../ui/Loader";

type CheckedItems = {
  [key: string]: boolean;
};

type ProductTableProps = {
  products: TProduct[] | undefined;
  setProducts: Dispatch<SetStateAction<TProduct[] | undefined>>;
  checkedItems: CheckedItems;
  setCheckedItems: Dispatch<SetStateAction<CheckedItems>>;
  showLoader?: boolean;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setShowLoader2: Dispatch<SetStateAction<boolean>>;
  pageNumbers: number[] | undefined;
  currentPage: number;
  setSingleProductToBeDeleted: Dispatch<SetStateAction<string>>;
  UrlSearchParams: URLSearchParams;
};

const ProductTable = ({
  checkedItems,
  setCheckedItems,
  products,
  setProducts,
  showLoader,
  setShowDeleteModal,
  setSingleProductToBeDeleted,
  UrlSearchParams,
}: ProductTableProps) => {
  // Function to handle individual checkbox toggle
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    setCheckedItems((prevCheckedItems) => {
      // Create a copy of the current checked items
      const newCheckedItems: CheckedItems = { ...prevCheckedItems };

      if (checked) {
        // If the checkbox is checked, add it to the checked items
        newCheckedItems[value] = true;
      } else {
        // If the checkbox is unchecked, remove it from the checked items
        delete newCheckedItems[value];
      }

      return newCheckedItems;
    });
  };

  // Function to handle select all checkboxes
  const selectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    setCheckedItems(() => {
      // If the "Select All" checkbox is checked, add all items to checkedItems
      if (isChecked) {
        const newCheckedItems: CheckedItems = {};

        products?.forEach((product: TProduct) => {
          newCheckedItems[product._id] = true;
        });
        return newCheckedItems;
      } else {
        // If the "Select All" checkbox is unchecked, clear checkedItems
        return {};
      }
    });
  };

  return (
    <section className="w-full mt-4 border-[1px] border-gray-300 overflow-x-auto p-8">
      {!showLoader ? (
        <>
          <table className="w-full">
            <ProductsTableHead
              products={products}
              setProducts={setProducts}
              checkedItems={checkedItems}
              selectAll={selectAll}
            />
            {products && products.length > 0 && (
              <ProductsTableBody
                products={products}
                checkedItems={checkedItems}
                handleCheckboxChange={handleCheckboxChange}
                setShowDeleteModal={setShowDeleteModal}
                setSingleProductToBeDeleted={setSingleProductToBeDeleted}
                UrlSearchParams={UrlSearchParams}
              />
            )}
          </table>
          {!products ? (
            <p className="w-full mt-4 text-center">
              There are no products available
            </p>
          ) : (
            products &&
            products?.length <= 0 && (
              <p className="w-full mt-4 text-center">
                There are no products available
              </p>
            )
          )}
        </>
      ) : (
        <section className="h-[70%] flex items-center justify-center">
          <Loader className="loader" />
        </section>
      )}
    </section>
  );
};

export default ProductTable;
