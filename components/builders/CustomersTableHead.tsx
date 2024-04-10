import { sortArray } from "@/libs/utils";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

type CustomersTableHeadProps = {
  customers: UsersWithOrderCount[] | undefined;
  checkedItems: {};
  setCustomers: Dispatch<SetStateAction<UsersWithOrderCount[] | undefined>>;
  selectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomersTableHead = ({
  customers,
  setCustomers,
  checkedItems,
  selectAll,
}: CustomersTableHeadProps) => {
  const [openOrderCountSorting, setOpenOrderCountSorting] = useState(false);

  const filterOrdersCountByAscendingOrder = () => {
    const sortedcustomers = sortArray(
      customers ? customers : [],
      "ordersCount",
      "asc"
    );
    setCustomers && setCustomers(sortedcustomers);
    setOpenOrderCountSorting(false);
  };

  const filterOrdersCountByDescendingOrder = () => {
    const sortedcustomers = sortArray(
      customers ? customers : [],
      "ordersCount",
      "desc"
    );
    setCustomers && setCustomers(sortedcustomers);
    setOpenOrderCountSorting(false);
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
              !customers?.length
                ? false
                : Object.keys(checkedItems).length === customers?.length &&
                  Object.values(checkedItems).every((value) => value)
            }
          />
        </th>
        <th>
          <p className="text-sm text-left">Photo</p>
        </th>
        <th>
          <p className="text-sm text-left">Name</p>
        </th>
        <th>
          <p className="text-sm text-left">Email</p>
        </th>
        <th>
          <div className="w-fit text-left relative">
            <div
              className="flex items-center justify-start gap-2 cursor-pointer w-fit"
              onClick={() => setOpenOrderCountSorting(!openOrderCountSorting)}
            >
              <p className="text-sm text-left">No. of orders</p>
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
            </div>

            {openOrderCountSorting && (
              <div className="flex flex-col absolute bg-white py-2 px-1 rounded-lg drop-shadow-md z-10 top-full w-fit border-[1px] border-gray-300">
                <p
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={filterOrdersCountByAscendingOrder}
                >
                  acending
                </p>
                <p
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={filterOrdersCountByDescendingOrder}
                >
                  descending
                </p>
              </div>
            )}
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default CustomersTableHead;
