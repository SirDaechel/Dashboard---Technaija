"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  ChartData,
  ChartOptions,
} from "chart.js";
import Image from "next/image";
import { getEachMonthOrderCount } from "@/libs/actions/order.actions";
import { useEffect, useState } from "react";
import Loader from "../ui/Loader";
import ChartTimeFrame from "../builders/ChartTimeFrame";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const LineChart = () => {
  const [months, setMonths] = useState<string[]>();
  const [orderCount, setOrderCount] = useState<number[]>();
  const [showTimeFrame, setShowTimeFrame] = useState(false);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string | null>(
    "This year"
  );
  const [showLoader, setShowLoader] = useState(false);
  const [isScreenWidth, setIsScreenWidth] = useState(0);

  useEffect(() => {
    const getChartData = async () => {
      setShowLoader(true);
      const retrivedChartData = await getEachMonthOrderCount();
      setMonths(retrivedChartData ? retrivedChartData.months : []);
      setOrderCount(retrivedChartData ? retrivedChartData.ordersCount : []);
      setShowLoader(false);
    };
    getChartData();
    setIsScreenWidth(window.innerWidth);
  }, []);

  const data: ChartData<"bar"> = {
    labels: months && months,
    datasets: [
      {
        label: "Orders",
        data: orderCount!,
        backgroundColor: "#272829",
        borderRadius: 5,
        barPercentage: 0.8,
        // barThickness: 22,
        minBarLength: 7,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    interaction: {
      intersect: false,
      mode: "index",
    },

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },

    responsive: true,

    maintainAspectRatio: true,

    aspectRatio: isScreenWidth <= 767 ? 1 : 2,

    indexAxis: "x",
    // indexAxis: isScreenWidth <= 767 ? "y" : "x",

    scales: {
      x: {
        border: {
          display: false,
        },

        grid: {
          display: false,
          tickLength: 17,
          tickColor: "transparent",
        },

        ticks: {
          font: {
            family: "'Poppins', sans-serif",
          },
        },
      },

      y: {
        border: {
          display: false,
          dash: [8, 4],
        },

        ticks: {
          // callback: (value: any) => value + "k",
          stepSize: 1,
          font: {
            family: "'Poppins', sans-serif",
          },
        },

        grid: {
          display: true,
          tickLength: 17,
          tickColor: "transparent",
        },
      },
    },
  };

  return (
    <section className="border-[1px] border-gray-300 p-8 overflow-hidden col-span-2">
      <div className="flex items-center justify-between mb-8">
        <span>
          <h2 className="font-medium text-xl">Sales Overview</h2>
          <p className="text-sm m:text-xs">Completed sales made overtime</p>
        </span>
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-1"
            onClick={() => setShowTimeFrame((prev) => !prev)}
          >
            <Image src="/calendar.svg" width={17} height={17} alt="calendar" />
            <p className="text-sm font-normal capitalize">
              {selectedTimeFrame && selectedTimeFrame}
            </p>
            <Image
              src="/chevron-arrow-down.svg"
              width={17}
              height={17}
              alt="arrow"
            />
          </button>
          <ChartTimeFrame
            setSelectedTimeFrame={setSelectedTimeFrame}
            showTimeFrame={showTimeFrame}
            setShowTimeFrame={setShowTimeFrame}
            setMonths={setMonths}
            setOrderCount={setOrderCount}
            setShowLoader={setShowLoader}
          />
        </div>
      </div>
      {!showLoader ? (
        <Bar data={data} options={options}></Bar>
      ) : (
        <section className="h-[70%] flex items-center justify-center">
          <Loader className="loader" />
        </section>
      )}
    </section>
  );
};

export default LineChart;
