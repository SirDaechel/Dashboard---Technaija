"use client";

import MetricCard from "@/components/ui/MetricCard";
import {
  filterOrdersBySixMonths,
  getLastSixMonthsOrders,
} from "@/libs/actions/order.actions";
import { formatNumber } from "@/libs/utils";
import { useEffect, useState } from "react";

export default function MetricCards() {
  const [totalRevenue, setTotalRevenue] = useState("");
  const [totalOrders, setTotalOrders] = useState("");
  const [totalCustomers, setTotalCustomers] = useState("");
  const [revenuePercentage, setRevenuePercentage] = useState<number>();
  const [ordersPercentage, setOrdersPercentage] = useState<number>();
  const [customersPercentage, setCustomersPercentage] = useState<number>();

  useEffect(() => {
    const initialMetricValues = async () => {
      // On initial render, get the total revenue and total orders for the last six months in parallel
      const [ordersRevenue, ordersTotal] = await Promise.all([
        filterOrdersBySixMonths(),
        getLastSixMonthsOrders(),
      ]);

      // On initial render, get the total revenue for the last six months
      setTotalRevenue(formatNumber(ordersRevenue?.theTotalRevenue, "₦"));
      setRevenuePercentage(ordersRevenue?.percentageChange);

      // On initial render, set the total order for the last six months
      if (ordersTotal) setTotalOrders(ordersTotal.totalOrders.toString());
      setOrdersPercentage(Number(ordersTotal?.percentageChange?.toFixed(2)));
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
        percentage={revenuePercentage}
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
        percentage={ordersPercentage}
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
        type="customers"
        title="Total Customers"
        data={totalCustomers}
        icon={"/customer2.svg"}
        percentage={customersPercentage}
        icon2="/up-arrow.svg"
        setter={setTotalCustomers}
        percentageValue={customersPercentage}
        percentageSetter={setCustomersPercentage}
      />
    </section>
  );
}
