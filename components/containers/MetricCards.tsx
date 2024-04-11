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
  const [totalProfit, setTotaProfit] = useState("");
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
      setTotaProfit(
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

  return (
    <section className="w-full grid grid-cols-3 col-span-3 gap-4">
      <MetricCard
        type="revenue"
        title="Total Revenue"
        data={totalRevenue}
        icon={"/wallet.svg"}
        icon2={
          revenuePercentage && revenuePercentage > 0
            ? "/up-arrow.svg"
            : revenuePercentage && revenuePercentage <= 0
            ? "/down-arrow.svg"
            : null
        }
        setter={setTotalRevenue}
        percentageValue={revenuePercentage}
        percentageSetter={setRevenuePercentage}
      />
      <MetricCard
        type="orders"
        title="Total Orders"
        data={totalOrders}
        icon={"/basket.svg"}
        icon2={
          ordersPercentage && ordersPercentage > 0
            ? "/up-arrow.svg"
            : ordersPercentage && ordersPercentage <= 0
            ? "/down-arrow.svg"
            : null
        }
        setter={setTotalOrders}
        percentageValue={ordersPercentage}
        percentageSetter={setOrdersPercentage}
      />
      <MetricCard
        type="profit"
        title="Total Profit"
        data={totalProfit}
        icon={"/cash.svg"}
        icon2={
          profitPercentage && profitPercentage > 0
            ? "/up-arrow.svg"
            : profitPercentage && profitPercentage <= 0
            ? "/down-arrow.svg"
            : null
        }
        setter={setTotaProfit}
        percentageValue={profitPercentage}
        percentageSetter={setProfitPercentage}
      />
    </section>
  );
}
