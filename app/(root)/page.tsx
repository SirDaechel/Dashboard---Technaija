import SalesBarChart from "@/components/charts/SalesBarChart";
import MetricCard from "@/components/ui/MetricCard";

export default function Home() {
  return (
    <section className="p-6">
      <div className="w-full flex items-center gap-6">
        <MetricCard title="Total Revenue" data={1234654} />
        <MetricCard title="Total Orders" data={345} />
        <MetricCard title="Total Customers" data={204} />
      </div>
      <div className="flex items-start justify-between">
        <SalesBarChart />
      </div>
    </section>
  );
}
