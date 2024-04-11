import { Dispatch, SetStateAction } from "react";
import Loader from "../ui/Loader";
import CouponsTableHead from "./CouponsTableHead";
import CouponsTableBody from "./CouponsTableBody";

type CheckedItems = {
  [key: string]: boolean;
};

type CouponsTableProps = {
  coupons: TCoupon[] | undefined;
  showLoader?: boolean;
  checkedItems: CheckedItems;
  setCheckedItems: Dispatch<SetStateAction<CheckedItems>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setShowLoader2: Dispatch<SetStateAction<boolean>>;
  pageNumbers: number[] | undefined;
  currentPage: number;
  setSingleCouponToBeDeleted: Dispatch<SetStateAction<string | undefined>>;
  UrlSearchParams: URLSearchParams;
};

const CouponsTable = ({
  coupons,
  showLoader,
  checkedItems,
  setCheckedItems,
  setShowDeleteModal,
  setSingleCouponToBeDeleted,
  UrlSearchParams,
}: CouponsTableProps) => {
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

        coupons?.forEach((coupon: TCoupon) => {
          newCheckedItems[coupon._id] = true;
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
            <CouponsTableHead
              coupons={coupons}
              checkedItems={checkedItems}
              selectAll={selectAll}
            />
            {coupons && coupons.length > 0 && (
              <CouponsTableBody
                coupons={coupons}
                checkedItems={checkedItems}
                handleCheckboxChange={handleCheckboxChange}
                setShowDeleteModal={setShowDeleteModal}
                setSingleCouponToBeDeleted={setSingleCouponToBeDeleted}
                UrlSearchParams={UrlSearchParams}
              />
            )}
          </table>
          {!coupons ? (
            <p className="w-full mt-4 text-center">
              There are no coupons available
            </p>
          ) : (
            coupons &&
            coupons?.length <= 0 && (
              <p className="w-full mt-4 text-center">
                There are no coupons available
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

export default CouponsTable;
