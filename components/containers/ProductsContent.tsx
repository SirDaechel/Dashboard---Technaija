"use client";

import { useEffect, useState } from "react";
import ProductTable from "../builders/ProductTable";
import { deleteProduct, getProducts } from "@/libs/actions/product.action";
import SearchBox from "../ui/SearchBox";
import LinkButton from "../ui/LinkButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "../builders/Pagination";
import PerPageDropdown from "../ui/PerPageDropdown";
import Loader from "../ui/Loader";
import { createURL } from "@/libs/utils";
import DeletePopup from "../builders/DeletePopup";
import { setOverlay } from "@/libs/redux-state/features/overlay/overlaySlice";
import { useDispatch } from "react-redux";

const ProductsContent = () => {
  const [products, setProducts] = useState<TProduct[]>();
  const [pageNumbers, setPageNumbers] = useState<number[]>();
  const [query, setQuery] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [showLoader, setShowLoader] = useState(true);
  const [showLoader2, setShowLoader2] = useState(false);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [checkedProducts, setCheckedProducts] = useState<
    {
      id: string;
    }[]
  >([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [singleProductToBeDeleted, setSingleProductToBeDeleted] =
    useState<string>();

  const searchParams = useSearchParams();
  const UrlSearchParams = new URLSearchParams(searchParams.toString());
  const currentPage = parseInt(UrlSearchParams.get("page") ?? "1", 10);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts({
        limit: perPage,
        page: currentPage ?? undefined,
      });
      setProducts(products?.products);
      setPageNumbers(products?.pageNumbers);
      setShowLoader(false);
    };
    fetchProducts();
  }, [currentPage, perPage]);

  // Create an array based on the search input and if no input, return the original array
  const filteredProductsSearch = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.original_category.toLowerCase().includes(query.toLowerCase())
  );

  // Create a new array (newCheckedProducts) off of checkedItems
  useEffect(() => {
    const newCheckedProducts = Object.keys(checkedItems).map((key) => ({
      id: key,
    }));
    setCheckedProducts(newCheckedProducts);
  }, [checkedItems]);

  // Delete product(s) function
  const deleteProducts = async () => {
    if (products && products.length <= 1) setShowLoader2(true);

    // If productId is true, then make it into an array and pass it as the value to the "products" key in the deleteProduct function
    const idToArray = singleProductToBeDeleted
      ? [{ id: singleProductToBeDeleted }]
      : [];

    if (checkedProducts.length > 0) {
      await deleteProduct({
        products: checkedProducts,
        path: pathname,
      });
    }

    if (idToArray.length > 0) {
      await deleteProduct({
        products: idToArray,
        path: pathname,
      });
    }

    setShowDeleteModal(false);
    dispatch(setOverlay(false));

    // if there is a single product in the table and on the current page being viewed, then that product is deleted, also delete that page
    if (
      products &&
      currentPage === pageNumbers?.length &&
      products.length <= 1
    ) {
      pageNumbers.pop();
      UrlSearchParams.set(
        "page",
        (currentPage - 1 > 0 ? currentPage - 1 : 1).toString()
      );
      // Call the function that creates a URL string with the data from UrlSearchParams
      const pageURL = createURL(pathname, UrlSearchParams);
      // Push the created URL string to the URL
      router.push(`${pageURL}`);
    }

    if (products && products.length <= 1) setShowLoader2(false);

    if (products && products.length > 1) window.location.reload();
  };

  return (
    <section>
      <DeletePopup
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteItem={deleteProducts}
      />
      {showLoader2 && (
        <section className="absolute w-full h-full top-0 bottom-0 left-0 right-0 transition-[0.3] ease-in-out duration-300 bg-white opacity-70 z-[56]">
          <Loader className="loader2" />
        </section>
      )}
      <div className="flex items-center justify-between gap-2 m:flex-col">
        <SearchBox query={query} setQuery={setQuery} placeholder="products" />
        <div className="flex items-center justify-center gap-3 m:flex-col m:gap-6 m:w-full">
          <div className="m:w-full flex justify-between gap-2">
            <button
              type="button"
              className="py-2 px-3 border-[1px] border-gray-400 text-sm"
              onClick={deleteProducts}
            >
              Delete product(s)
            </button>
            <PerPageDropdown perPage={perPage} setPerPage={setPerPage} />
          </div>
          <LinkButton
            text="Create Product"
            classname="min-w-max bg-[#272829] text-white py-2 px-3 m:w-full m:text-center"
            link="/products/create-product"
          />
        </div>
      </div>
      <ProductTable
        products={filteredProductsSearch}
        setProducts={setProducts}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        showLoader={showLoader}
        setShowDeleteModal={setShowDeleteModal}
        setSingleProductToBeDeleted={setSingleProductToBeDeleted}
        UrlSearchParams={UrlSearchParams}
      />
      {/* {products && products?.length > 0 && ( */}
      <Pagination
        pageNumbers={pageNumbers}
        currentPage={currentPage}
        UrlSearchParams={UrlSearchParams}
        urlKey="page"
      />
      {/* )} */}
    </section>
  );
};

export default ProductsContent;
