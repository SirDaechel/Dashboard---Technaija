import { Dispatch, SetStateAction } from "react";
import { setOverlay } from "@/libs/redux-state/features/overlay/overlaySlice";
import { useDispatch } from "react-redux";

type CouponTableProps = {
  coupons: TCoupon[] | undefined;
  checkedItems: CheckedItems;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setSingleCouponToBeDeleted: Dispatch<SetStateAction<string | undefined>>;
  UrlSearchParams: URLSearchParams;
};

const CouponsTableBody = ({
  coupons,
  checkedItems,
  handleCheckboxChange,
  setShowDeleteModal,
  setSingleCouponToBeDeleted,
}: CouponTableProps) => {
  const dispatch = useDispatch();

  const openDeleteModal = (couponId: string) => {
    dispatch(setOverlay(true));
    setShowDeleteModal(true);
    setSingleCouponToBeDeleted(couponId);
  };

  return (
    <tbody>
      {coupons?.map((coupon) => (
        <tr key={coupon._id} className="border-b-[1px] border-b-gray-300">
          <td>
            <input
              className="flex w-5 h-5 rounded-lg border-[1px] border-solid border-gray-300 bg-white text-left"
              type="checkbox"
              value={coupon._id}
              checked={checkedItems[coupon._id] || false}
              onChange={handleCheckboxChange}
            />
          </td>
          <td className="text-sm w-max">{coupon.code}</td>
          <td className="text-sm w-max">{coupon.discount}</td>
          <td className="text-sm">{coupon.limit ? coupon.limit : "N/A"}</td>
          <td>
            <div>
              <button
                type="button"
                className="h-full text-sm text-red-500"
                onClick={() => openDeleteModal(coupon._id)}
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

export default CouponsTableBody;
