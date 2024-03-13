"use client";

import { useSearchParams } from "next/navigation";
import OrdersTable from "../builders/OrdersTable";
import OrdersTabs from "../builders/OrdersTabs";
import { getOrders } from "@/libs/actions/order.actions";
import { useEffect, useState } from "react";
import Pagination from "../builders/Pagination";

type OrdersContentProp = {
  location: string;
};

const OrdersContent = ({ location }: OrdersContentProp) => {
  const [orders, setOrders] = useState<TOrders[]>();
  const [ordersCount, setOrdersCount] = useState<number>();
  const [ordersSuccessCount, setOrdersSuccessCount] = useState<number>();
  const [ordersPendingCount, setOrdersPendingCount] = useState<number>();
  const [ordersFailedCount, setOrdersFailedCount] = useState<number>();
  const [pageNumbers, setPageNumbers] = useState<number[]>();
  const [showLoader, setShowLoader] = useState(true);

  const searchParams = useSearchParams();

  const UrlSearchParams = new URLSearchParams(searchParams.toString());

  const currentStatus = UrlSearchParams.get("status");

  const currentPage = parseInt(UrlSearchParams.get("page") || "1", 10);

  const perPage = 10;

  useEffect(() => {
    const fetchedOrders = async () => {
      const fetchedOrders = await getOrders({
        limit: perPage,
        status: currentStatus ? currentStatus : undefined,
        page: currentPage ? currentPage : undefined,
      });
      setOrders(fetchedOrders?.orders);
      setOrdersCount(fetchedOrders?.ordersCount);
      setOrdersSuccessCount(fetchedOrders?.ordersSuccessCount);
      setOrdersPendingCount(fetchedOrders?.ordersPendingCount);
      setOrdersFailedCount(fetchedOrders?.ordersFailedCount);
      setPageNumbers(fetchedOrders?.pageNumbers);
      setShowLoader(false);
    };
    fetchedOrders();
  }, [currentStatus, currentPage]);

  return (
    <section>
      <OrdersTabs
        ordersCount={ordersCount ? ordersCount : 0}
        ordersSuccessCount={ordersSuccessCount ? ordersSuccessCount : 0}
        ordersPendingCount={ordersPendingCount ? ordersPendingCount : 0}
        ordersFailedCount={ordersFailedCount ? ordersFailedCount : 0}
        UrlSearchParams={UrlSearchParams}
      />
      <OrdersTable
        location={location}
        orders={orders}
        setOrders={setOrders}
        showLoader={showLoader}
      />
      {orders && orders.length > 0 && (
        <Pagination
          pageNumbers={pageNumbers}
          currentPage={currentPage}
          UrlSearchParams={UrlSearchParams}
          urlKey="page"
        />
      )}
    </section>
  );
};

export default OrdersContent;