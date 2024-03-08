import { getEachMonthOrderCount } from "@/libs/actions/order.actions";
import { Dispatch, MouseEvent, SetStateAction } from "react";

type MetricTimeFrameProp = {
  setSelectedTimeFrame: Dispatch<SetStateAction<string | null>>;
  showTimeFrame: boolean;
  setShowTimeFrame: Dispatch<SetStateAction<boolean>>;
  setMonths: Dispatch<SetStateAction<string[] | undefined>>;
  setOrderCount: Dispatch<SetStateAction<number[] | undefined>>;
  setShowLoader: Dispatch<SetStateAction<boolean>>;
};

const ChartTimeFrame = ({
  setSelectedTimeFrame,
  showTimeFrame,
  setShowTimeFrame,
  setMonths,
  setOrderCount,
  setShowLoader,
}: MetricTimeFrameProp) => {
  const handleTimeFrame = async (
    e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>
  ) => {
    setSelectedTimeFrame(e.currentTarget.textContent);
    setShowLoader(true);

    // If this year is selected
    if (e.currentTarget?.textContent === "This year") {
      setShowTimeFrame(false);
      const retrivedChartData = await getEachMonthOrderCount();
      setMonths(retrivedChartData && retrivedChartData.months);
      setOrderCount(retrivedChartData && retrivedChartData.ordersCount);
    }

    // If last year is selected
    if (e.currentTarget?.textContent === "Last year") {
      setShowTimeFrame(false);
      // Pass an argument of 1 to subtract the current year by 1
      const retrivedChartData = await getEachMonthOrderCount(1);
      setMonths(retrivedChartData && retrivedChartData.months);
      setOrderCount(retrivedChartData && retrivedChartData.ordersCount);
    }

    setShowLoader(false);
  };

  return (
    <>
      {showTimeFrame && (
        <ul className="mt-2 absolute w-full items-center justify-center border-[1px] border-gray-300 bg-white drop-shadow">
          <li
            className="capitalize w-full text-sm cursor-pointer p-1 text-center hover:bg-gray-200 hover:transition"
            onClick={(e) => handleTimeFrame(e)}
          >
            This year
          </li>
          <li
            className="capitalize w-full text-sm cursor-pointer p-1 text-center hover:bg-gray-200 hover:transition"
            onClick={(e) => handleTimeFrame(e)}
          >
            Last year
          </li>
        </ul>
      )}
    </>
  );
};

export default ChartTimeFrame;
