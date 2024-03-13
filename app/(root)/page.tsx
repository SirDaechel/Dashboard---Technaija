import OrdersTable from "@/components/builders/OrdersTable";
import TopCustomers from "@/components/builders/TopCustomers";
import SalesBarChart from "@/components/charts/SalesBarChart";
import TopCatgeoryChart from "@/components/charts/TopCatgeoryChart";
import MetricCards from "@/components/containers/MetricCards";
import { getOrders } from "@/libs/actions/order.actions";

export default async function Home() {
  const fetchedOrders = await getOrders({ limit: 5 });

  return (
    <section className="p-6">
      <div className="w-full grid grid-cols-3 gap-4">
        <MetricCards />
        <SalesBarChart />
        <div className="grid grid-rows-2 gap-4">
          <TopCatgeoryChart />
          <TopCustomers />
        </div>
      </div>
      <OrdersTable location="home" orders={fetchedOrders?.orders} />
    </section>
  );
}
