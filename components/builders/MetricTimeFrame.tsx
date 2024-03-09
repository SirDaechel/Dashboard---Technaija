import {
  filterOrdersByAllTime,
  filterOrdersByLastMonth,
  filterOrdersBySixMonths,
  filterOrdersByToday,
  getAllOrdersCount,
  getLastMonthOrders,
  getLastSixMonthsOrders,
  getTodayOrders,
} from "@/libs/actions/order.actions";
import { formatNumber } from "@/libs/utils";
import { Dispatch, MouseEvent, SetStateAction } from "react";

type MetricTimeFrameProp = {
  type: string;
  setSelectedTimeFrame: Dispatch<SetStateAction<string | null>>;
  showTimeFrame: boolean;
  setShowTimeFrame: Dispatch<SetStateAction<boolean>>;
  setter: Dispatch<SetStateAction<string>>;
  percentageSetter: Dispatch<SetStateAction<number | undefined>>;
};

const MetricTimeFrame = ({
  type,
  setSelectedTimeFrame,
  showTimeFrame,
  setShowTimeFrame,
  setter,
  percentageSetter,
}: MetricTimeFrameProp) => {
  // Change time frame
  const handleTimeFrame = async (
    e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>
  ) => {
    setSelectedTimeFrame(e.currentTarget.textContent);

    if (type === "revenue") {
      setShowTimeFrame(false);

      // If today is selected
      if (e.currentTarget?.textContent === "today") {
        const totalRevenue = await filterOrdersByToday();
        setter(formatNumber(totalRevenue?.theTotalRevenue, "₦"));
        percentageSetter(Number(totalRevenue?.percentageChange?.toFixed(2)));
      }

      // If last month is selected
      if (e.currentTarget?.textContent === "last month") {
        const totalRevenue = await filterOrdersByLastMonth();
        setter(formatNumber(totalRevenue?.theTotalRevenue, "₦"));
        percentageSetter(Number(totalRevenue?.percentageChange?.toFixed(2)));
      }

      // If 6 months is selected
      if (e.currentTarget?.textContent === "6 months") {
        const totalRevenue = await filterOrdersBySixMonths();
        setter(formatNumber(totalRevenue?.theTotalRevenue, "₦"));
        percentageSetter(Number(totalRevenue?.percentageChange?.toFixed(2)));
      }

      // If all time is selected
      if (e.currentTarget?.textContent === "all time") {
        const totalRevenue = await filterOrdersByAllTime();
        setter(formatNumber(totalRevenue?.allTimeOrders, "₦"));
        percentageSetter(undefined);
      }
    }

    if (type === "orders") {
      setShowTimeFrame(false);

      // If today is selected
      if (e.currentTarget?.textContent === "today") {
        const totalOrders = await getTodayOrders();
        if (totalOrders) setter(totalOrders?.totalOrders.toString());
        percentageSetter(Number(totalOrders?.percentageChange?.toFixed(2)));
      }

      // If last month is selected
      if (e.currentTarget?.textContent === "last month") {
        const totalOrders = await getLastMonthOrders();
        if (totalOrders) setter(totalOrders?.totalOrders.toString());
        percentageSetter(Number(totalOrders?.percentageChange?.toFixed(2)));
      }

      // If 6 months is selected
      if (e.currentTarget?.textContent === "6 months") {
        const totalOrders = await getLastSixMonthsOrders();
        if (totalOrders) setter(totalOrders.totalOrders.toString());
        percentageSetter(Number(totalOrders?.percentageChange?.toFixed(2)));
      }

      // If all time is selected
      if (e.currentTarget?.textContent === "all time") {
        const totalOrders = await getAllOrdersCount();
        if (totalOrders) setter(totalOrders.toString());
        percentageSetter(undefined);
      }
    }

    if (type === "profit") {
      setShowTimeFrame(false);

      // If today is selected
      if (e.currentTarget?.textContent === "today") {
        const totalProfit = await filterOrdersByToday();
        setter(formatNumber(totalProfit?.theTotalProfit, "₦"));
        percentageSetter(
          Number(totalProfit?.profitPercentageChange?.toFixed(2))
        );
      }

      // If last month is selected
      if (e.currentTarget?.textContent === "last month") {
        const totalProfit = await filterOrdersByLastMonth();
        setter(formatNumber(totalProfit?.lastMonthProfit, "₦"));
        percentageSetter(
          Number(totalProfit?.profitPercentageChange?.toFixed(2))
        );
      }

      // If last six months is selected
      if (e.currentTarget?.textContent === "6 months") {
        const totalProfit = await filterOrdersBySixMonths();
        setter(formatNumber(totalProfit?.lastSixMonthProfit, "₦"));
        percentageSetter(
          Number(totalProfit?.profitPercentageChange?.toFixed(2))
        );
      }

      // If last all time is selected
      if (e.currentTarget?.textContent === "all time") {
        const totalRevenue = await filterOrdersByAllTime();
        setter(formatNumber(totalRevenue?.allTimeProfit, "₦"));
        percentageSetter(undefined);
      }
    }
  };

  return (
    <>
      {showTimeFrame && (
        <ul className="mt-2 absolute w-full items-center justify-center border-[1px] border-gray-300 bg-white drop-shadow">
          <li
            className="capitalize w-full text-sm cursor-pointer p-1 text-center hover:bg-gray-200 hover:transition"
            onClick={(e) => handleTimeFrame(e)}
          >
            today
          </li>
          <li
            className="capitalize w-full text-sm cursor-pointer p-1 text-center hover:bg-gray-200 hover:transition"
            onClick={(e) => handleTimeFrame(e)}
          >
            last month
          </li>
          <li
            className="capitalize w-full text-sm cursor-pointer p-1 text-center hover:bg-gray-200 hover:transition"
            onClick={(e) => handleTimeFrame(e)}
          >
            6 months
          </li>
          <li
            className="capitalize w-full text-sm cursor-pointer p-1 text-center hover:bg-gray-200 hover:transition"
            onClick={(e) => handleTimeFrame(e)}
          >
            all time
          </li>
        </ul>
      )}
    </>
  );
};

export default MetricTimeFrame;
