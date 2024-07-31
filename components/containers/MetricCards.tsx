"use client";

import MetricCard from "@/components/ui/MetricCard";
import {
  filterOrdersBySixMonths,
  getLastSixMonthsOrders,
  getOrderCategoryCount,
} from "@/libs/actions/order.actions";
import { formatNumber } from "@/libs/utils";
import { useEffect, useState } from "react";

export default function MetricCards() {
  const [totalRevenue, setTotalRevenue] = useState("");
  const [totalOrders, setTotalOrders] = useState("");
  const [totalProfit, setTotalProfit] = useState("");
  const [revenuePercentage, setRevenuePercentage] = useState<number>();
  const [ordersPercentage, setOrdersPercentage] = useState<number>();
  const [profitPercentage, setProfitPercentage] = useState<number>();

  useEffect(() => {
    const initialMetricValues = async () => {
      // On initial render, get the total revenue and total orders for the last six months in parallel
      const [ordersRevenue, ordersTotal, totalProfit] = await Promise.all([
        filterOrdersBySixMonths(),
        getLastSixMonthsOrders(),
        filterOrdersBySixMonths(),
      ]);

      // On initial render, get the total revenue for the last six months
      setTotalRevenue(
        formatNumber(
          ordersRevenue?.theTotalRevenue ? ordersRevenue?.theTotalRevenue : 0,
          "₦"
        )
      );
      setRevenuePercentage(
        Number(
          ordersRevenue?.percentageChange
            ? ordersRevenue?.percentageChange?.toFixed(2)
            : 0
        )
      );

      // On initial render, set the total order for the last six months
      if (ordersTotal) {
        setTotalOrders(ordersTotal.totalOrders.toString());
      } else {
        setTotalOrders("0");
      }
      setOrdersPercentage(
        Number(
          ordersTotal?.percentageChange
            ? ordersTotal?.percentageChange?.toFixed(2)
            : 0
        )
      );

      // On initial render, set the total profit for the last six months
      setTotalProfit(
        formatNumber(
          totalProfit?.lastSixMonthProfit ? totalProfit?.lastSixMonthProfit : 0,
          "₦"
        )
      );
      setProfitPercentage(
        Number(
          totalProfit?.profitPercentageChange
            ? totalProfit?.profitPercentageChange?.toFixed(2)
            : 0
        )
      );

      getOrderCategoryCount();
    };

    initialMetricValues();
  }, []);

  const getIcon2 = (percentage: number | undefined) => {
    if (percentage === undefined) return null;
    if (percentage > 0) return "/up-arrow.svg";
    return "/down-arrow.svg";
  };

  return (
    <section className="w-full grid grid-cols-3 col-span-3 gap-4 m:flex m:flex-col">
      <MetricCard
        type="revenue"
        title="Total Revenue"
        data={totalRevenue}
        icon={"/wallet.svg"}
        icon2={getIcon2(revenuePercentage)}
        setter={setTotalRevenue}
        percentageValue={revenuePercentage}
        percentageSetter={setRevenuePercentage}
      />
      <MetricCard
        type="orders"
        title="Total Orders"
        data={totalOrders}
        icon={"/basket.svg"}
        icon2={getIcon2(ordersPercentage)}
        setter={setTotalOrders}
        percentageValue={ordersPercentage}
        percentageSetter={setOrdersPercentage}
      />
      <MetricCard
        type="profit"
        title="Total Profit"
        data={totalProfit}
        icon={"/cash.svg"}
        icon2={getIcon2(profitPercentage)}
        setter={setTotalProfit}
        percentageValue={profitPercentage}
        percentageSetter={setProfitPercentage}
      />
    </section>
  );
}
