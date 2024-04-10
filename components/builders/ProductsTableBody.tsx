import Image from "next/image";
import { createURL, formatNumber } from "@/libs/utils";
import { Dispatch, SetStateAction } from "react";
import { setOverlay } from "@/libs/redux-state/features/overlay/overlaySlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

type CheckedItems = {
  [key: string]: boolean;
};

type ProductTableProps = {
  products: TProduct[] | undefined;
  checkedItems: CheckedItems;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setSingleProductToBeDeleted: Dispatch<SetStateAction<string | undefined>>;
  UrlSearchParams: URLSearchParams;
};

const ProductsTableBody = ({
  products,
  checkedItems,
  handleCheckboxChange,
  setShowDeleteModal,
  setSingleProductToBeDeleted,
  UrlSearchParams,
}: ProductTableProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const openDeleteModal = (productId: string) => {
    dispatch(setOverlay(true));
    setShowDeleteModal(true);
    setSingleProductToBeDeleted(productId);
  };

  const getProductToEdit = (productId: string) => {
    UrlSearchParams.set("edit", productId);
    // Call the function that creates a URL string with the data from UrlSearchParams
    const pageURL = createURL("/products/edit-product", UrlSearchParams);
    // Push the created URL string to the URL
    router.push(`${pageURL}`);
  };

  return (
    <tbody>
      {products?.map((product) => (
        <tr key={product._id} className="border-b-[1px] border-b-gray-300">
          <td>
            <input
              className="flex w-5 h-5 rounded-lg border-[1px] border-solid border-gray-300 bg-white text-left"
              type="checkbox"
              value={product._id}
              checked={checkedItems[product._id] || false}
              onChange={handleCheckboxChange}
            />
          </td>
          <td className="text-sm">{product._id}</td>
          <td>
            <Image
              src={product.featured_image}
              width={50}
              height={50}
              quality={100}
              alt="product-img"
            />
          </td>
          <td className="text-sm w-max">{product.name}</td>
          <td className="text-sm w-max">{product.original_category}</td>
          <td className="text-sm">{formatNumber(product.price, "₦")}</td>
          <td>
            <div className="flex gap-2">
              <button
                type="button"
                className="h-full text-sm"
                onClick={() => getProductToEdit(product._id)}
              >
                Edit
              </button>
              <span> | </span>
              <button
                type="button"
                className="h-full text-sm text-red-500"
                onClick={() => openDeleteModal(product._id)}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ProductsTableBody;
