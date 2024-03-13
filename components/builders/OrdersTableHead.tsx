"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { sortArray } from "@/libs/utils";

type OrdersTableHeadProps = {
  orders: TOrders[] | undefined;
  setOrders: Dispatch<SetStateAction<TOrders[] | undefined>>;
};

const OrdersTableHead = ({ orders, setOrders }: OrdersTableHeadProps) => {
  const [openDateSorting, setOpenDateSorting] = useState(false);
  const [openAmountSorting, setOpenAmountSorting] = useState(false);

  const filterDateByAscendingOrder = () => {
    const sortedOrders = sortArray(orders ? orders : [], "date", "asc");
    setOrders(sortedOrders);
    setOpenDateSorting(false);
  };

  const filterDateByDescendingOrder = () => {
    const sortedOrders = sortArray(orders ? orders : [], "date", "desc");
    setOrders(sortedOrders);
    setOpenDateSorting(false);
  };

  const filterAmountByAscendingOrder = () => {
    const sortedOrders = sortArray(orders ? orders : [], "amount", "asc");
    setOrders(sortedOrders);
    setOpenAmountSorting(false);
  };

  const filterAmountByDescendingOrder = () => {
    const sortedOrders = sortArray(orders ? orders : [], "amount", "desc");
    setOrders(sortedOrders);
    setOpenAmountSorting(false);
  };

  return (
    <thead className="border-b-[1px] border-b-solid border-b-gray-300">
      <tr>
        <th className="text-sm text-left">Order ID</th>
        <th className="text-sm text-left">Name</th>
        <th className="text-sm text-left">Product(s)</th>

        <th>
          <div className="w-fit text-left relative">
            <div
              className="flex items-center justify-start gap-2 cursor-pointer w-fit"
              onClick={() => setOpenDateSorting(!openDateSorting)}
            >
              <p className="text-sm text-left">Date</p>
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

            {openDateSorting && (
              <div className="flex flex-col absolute bg-white py-2 px-1 rounded-lg drop-shadow-md z-10 top-full w-fit border-[1px] border-gray-300">
                <p
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={filterDateByAscendingOrder}
                >
                  acending
                </p>
                <p
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={filterDateByDescendingOrder}
                >
                  descending
                </p>
              </div>
            )}
          </div>
        </th>

        <th>
          <div className="w-fit text-left relative">
            <div
              className="flex items-center justify-start gap-2 cursor-pointer w-fit"
              onClick={() => setOpenAmountSorting(!openAmountSorting)}
            >
              <p className="text-sm text-left">Amount</p>
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

            {openAmountSorting && (
              <div className="flex flex-col absolute bg-white py-2 px-1 rounded-lg drop-shadow-md z-10 top-full w-fit border-[1px] border-gray-300">
                <p
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={filterAmountByAscendingOrder}
                >
                  acending
                </p>
                <p
                  className="text-sm font-light py-1 px-1 cursor-pointer"
                  onClick={filterAmountByDescendingOrder}
                >
                  descending
                </p>
              </div>
            )}
          </div>
        </th>

        <th className="text-sm text-left">Status</th>
        <th>
          <p className="text-sm text-left w-max">Payment method</p>
        </th>
      </tr>
    </thead>
  );
};

export default OrdersTableHead;
