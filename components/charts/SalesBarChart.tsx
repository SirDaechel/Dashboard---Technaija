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

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const SalesBarChart = () => {
  const isScreenWidth = window.innerWidth;

  const data: ChartData<"bar"> = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [24, 19, 13, 18, 28, 21, 34, 17, 36, 9, 18, 11],
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

    aspectRatio: isScreenWidth <= 767 ? 0.9 : 2,

    // indexAxis: "y",

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
          callback: (value: any) => value + "k",
          stepSize: 5,

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
    <section className="w-[66%] mt-8 border-[1px] border-gray-300 p-8 overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <span>
          <h2 className="font-medium text-xl">Sales Overview</h2>
          <p className="text-sm">Completed sales made overtime</p>
        </span>
        <button type="button" className="flex items-center gap-1">
          <Image src="/calendar.svg" width={17} height={17} alt="calendar" />
          <p>This year</p>
          <Image
            src="/chevron-arrow-down.svg"
            width={17}
            height={17}
            alt="arrow"
          />
        </button>
      </div>
      <Bar data={data} options={options}></Bar>
    </section>
  );
};

export default SalesBarChart;
