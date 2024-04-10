import { setOverlay } from "@/libs/redux-state/features/overlay/overlaySlice";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";

type CustomersTableProps = {
  customers: UsersWithOrderCount[] | undefined;
  checkedItems: CheckedItems;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setSingleCustomerToBeDeleted: Dispatch<SetStateAction<string | undefined>>;
};

const CustomerTableBody = ({
  customers,
  checkedItems,
  handleCheckboxChange,
  setShowDeleteModal,
  setSingleCustomerToBeDeleted,
}: CustomersTableProps) => {
  const dispatch = useDispatch();

  const openDeleteModal = (customerId: string) => {
    dispatch(setOverlay(true));
    setShowDeleteModal(true);
    setSingleCustomerToBeDeleted(customerId);
  };

  return (
    <tbody>
      {customers?.map((customer) => (
        <tr key={customer._id} className="border-b-[1px] border-b-gray-300">
          <td>
            <input
              className="flex w-5 h-5 rounded-lg border-[1px] border-solid border-gray-300 bg-white text-left"
              type="checkbox"
              value={customer._id}
              checked={checkedItems[customer._id] || false}
              onChange={handleCheckboxChange}
            />
          </td>
          <td className="text-sm w-max">
            <Image
              className="rounded-full"
              src={customer.photo}
              width={35}
              height={35}
              quality={100}
              alt="user-photo"
            />
          </td>
          <td className="text-sm w-max">
            {customer.firstName} {customer.lastName}
          </td>
          <td className="text-sm w-max">{customer.email}</td>
          <td className="text-sm w-max">{customer.numberOfOrders}</td>
          <td>
            <button
              type="button"
              className="h-full text-sm text-red-500"
              onClick={() => openDeleteModal(customer._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default CustomerTableBody;
