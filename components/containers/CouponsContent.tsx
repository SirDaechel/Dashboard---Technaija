"use client";

import { useEffect, useState } from "react";
import CouponsTable from "../builders/CouponsTable";
import { deleteCoupon, getCoupons } from "@/libs/actions/coupon.action";
import PerPageDropdown from "../ui/PerPageDropdown";
import SearchBox from "../ui/SearchBox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DeletePopup from "../builders/DeletePopup";
import Loader from "../ui/Loader";
import { setOverlay } from "@/libs/redux-state/features/overlay/overlaySlice";
import { useDispatch } from "react-redux";
import { createURL } from "@/libs/utils";
import LinkButton from "../ui/LinkButton";
import Pagination from "../builders/Pagination";

const CouponsContent = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const [showLoader, setShowLoader] = useState(true);
  const [coupons, setCoupons] = useState<TCoupon[] | undefined>([]);
  const [perPage, setPerPage] = useState(5);
  const [query, setQuery] = useState("");
  const [pageNumbers, setPageNumbers] = useState<number[]>();
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [checkedCoupons, setCheckedCoupons] = useState<
    {
      id: string;
    }[]
  >([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [singleCouponToBeDeleted, setSingleCouponToBeDeleted] =
    useState<string>();
  const [showLoader2, setShowLoader2] = useState(false);

  const searchParams = useSearchParams();
  const UrlSearchParams = new URLSearchParams(searchParams.toString());
  const currentPage = parseInt(UrlSearchParams.get("page") || "1", 10);

  // Fetch all coupons from database on initial render
  useEffect(() => {
    const getAllCoupons = async () => {
      const couponsList = await getCoupons({
        limit: perPage,
        page: currentPage ? currentPage : undefined,
      });
      setCoupons(couponsList?.coupons);
      setPageNumbers(couponsList?.pageNumbers);
      setShowLoader(false);
    };
    getAllCoupons();
  }, [currentPage, perPage]);

  // Create an array based on the search input and if no input, return the original array
  const filteredCouponSearch = coupons?.filter((coupon) =>
    coupon.code.toLowerCase().includes(query.toLowerCase())
  );

  // Create a new array (newCheckedCoupons) off of checkedItems
  useEffect(() => {
    const newCheckedCoupons = Object.keys(checkedItems).map((key) => ({
      id: key,
    }));
    setCheckedCoupons(newCheckedCoupons);
  }, [checkedItems]);

  // Delete coupon(s) function
  const deleteCoupons = async () => {
    if (coupons && coupons.length <= 1) setShowLoader2(true);

    // If couponId is true, then make it into an array and pass it as the value to the "coupons" key in the deletecoupon function
    const idToArray = singleCouponToBeDeleted
      ? [{ id: singleCouponToBeDeleted }]
      : [];

    if (checkedCoupons.length > 0) {
      await deleteCoupon({
        coupons: checkedCoupons,
        path: pathname,
      });
    }

    if (idToArray.length > 0) {
      await deleteCoupon({
        coupons: idToArray,
        path: pathname,
      });
    }

    setShowDeleteModal(false);
    dispatch(setOverlay(false));

    // if there is a single coupon in the table and on the current page being viewed, then that coupon is deleted, also delete that page
    if (coupons && currentPage === pageNumbers?.length && coupons.length <= 1) {
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

    if (coupons && coupons.length <= 1) setShowLoader2(false);

    if (coupons && coupons.length > 1) window.location.reload();
  };

  return (
    <section>
      <DeletePopup
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteItem={deleteCoupons}
      />
      {showLoader2 && (
        <section className="absolute w-full h-full top-0 bottom-0 left-0 right-0 transition-[0.3] ease-in-out duration-300 bg-white opacity-70 z-[56]">
          <Loader className="loader2" />
        </section>
      )}
      <div className="flex items-center justify-between gap-2 m:flex-col">
        <SearchBox query={query} setQuery={setQuery} placeholder="coupon" />
        <div className="flex items-center justify-center gap-3 m:flex-col m:gap-6 m:w-full">
          <div className="m:w-full flex justify-between gap-2">
            <button
              type="button"
              className="py-2 px-3 border-[1px] border-gray-400 text-sm"
              onClick={deleteCoupons}
            >
              Delete coupon(s)
            </button>
            <PerPageDropdown perPage={perPage} setPerPage={setPerPage} />
          </div>
          <LinkButton
            text="Create Coupon"
            classname="min-w-max bg-[#272829] text-white py-2 px-3 m:w-full m:text-center"
            link="/coupons/create-coupon"
          />
        </div>
      </div>
      <CouponsTable
        coupons={filteredCouponSearch}
        showLoader={showLoader}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        setShowDeleteModal={setShowDeleteModal}
        setShowLoader2={setShowLoader2}
        pageNumbers={pageNumbers}
        currentPage={currentPage}
        setSingleCouponToBeDeleted={setSingleCouponToBeDeleted}
        UrlSearchParams={UrlSearchParams}
      />
      {/* {coupons && coupons?.length > 0 && ( */}
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

export default CouponsContent;
