import OrdersTable from "@/components/builders/OrdersTable";
import TopCustomers from "@/components/builders/TopCustomers";
import SalesBarChart from "@/components/charts/SalesBarChart";
import TopCatgeoryChart from "@/components/charts/TopCatgeoryChart";
import MetricCard from "@/components/ui/MetricCard";

export default function Home() {
  return (
    <section className="p-6">
      {/* <div className="w-full flex items-center gap-6">
        <MetricCard
          title="Total Revenue"
          data={1234654}
          icon={"/wallet.svg"}
          percentage="+4.32%"
          icon2="/up-arrow.svg"
        />
        <MetricCard
          title="Total Orders"
          data={345}
          icon={"/basket.svg"}
          percentage="+4.32%"
          icon2="/up-arrow.svg"
        />
        <MetricCard
          title="Total Customers"
          data={204}
          icon={"/customer2.svg"}
          percentage="+4.32%"
          icon2="/up-arrow.svg"
        />
      </div>
      <div className="flex items-start justify-between overflow-hidden">
        <SalesBarChart />
        <span className="w-[32%] flex flex-col gap-4 justify-between">
          <TopCatgeoryChart />
          <TopCustomers />
        </span>
      </div> */}
      <div className="w-full grid grid-cols-3 gap-4">
        <MetricCard
          title="Total Revenue"
          data={1234654}
          icon={"/wallet.svg"}
          percentage="+4.32%"
          icon2="/up-arrow.svg"
        />
        <MetricCard
          title="Total Orders"
          data={345}
          icon={"/basket.svg"}
          percentage="+4.32%"
          icon2="/up-arrow.svg"
        />
        <MetricCard
          title="Total Customers"
          data={204}
          icon={"/customer2.svg"}
          percentage="+4.32%"
          icon2="/up-arrow.svg"
        />
        <SalesBarChart />
        <div className="grid grid-rows-2 gap-4">
          <TopCatgeoryChart />
          <TopCustomers />
        </div>
      </div>
      <OrdersTable />
    </section>
  );
}
