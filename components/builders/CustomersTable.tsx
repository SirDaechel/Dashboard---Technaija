import React, { Dispatch, SetStateAction } from "react";
import CustomersTableHead from "./CustomersTableHead";
import Loader from "../ui/Loader";
import CustomerTableBody from "./CustomerTableBody";

type CustomersTableProps = {
  customers: UsersWithOrderCount[] | undefined;
  setCustomers: Dispatch<SetStateAction<UsersWithOrderCount[] | undefined>>;
  showLoader?: boolean;
  checkedItems: CheckedItems;
  setCheckedItems: Dispatch<SetStateAction<CheckedItems>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setSingleCustomerToBeDeleted: Dispatch<SetStateAction<string | undefined>>;
};

const CustomersTable = ({
  customers,
  setCustomers,
  showLoader,
  checkedItems,
  setCheckedItems,
  setShowDeleteModal,
  setSingleCustomerToBeDeleted,
}: CustomersTableProps) => {
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

        customers?.forEach((customer: UsersWithOrderCount) => {
          newCheckedItems[customer._id] = true;
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
            <CustomersTableHead
              customers={customers}
              setCustomers={setCustomers}
              checkedItems={checkedItems}
              selectAll={selectAll}
            />
            {customers && customers.length > 0 && (
              <CustomerTableBody
                customers={customers}
                checkedItems={checkedItems}
                handleCheckboxChange={handleCheckboxChange}
                setShowDeleteModal={setShowDeleteModal}
                setSingleCustomerToBeDeleted={setSingleCustomerToBeDeleted}
              />
            )}
          </table>
          {!customers ? (
            <p className="w-full mt-4 text-center">
              There are no customers available
            </p>
          ) : (
            customers &&
            customers?.length <= 0 && (
              <p className="w-full mt-4 text-center">
                There are no customers available
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

export default CustomersTable;
