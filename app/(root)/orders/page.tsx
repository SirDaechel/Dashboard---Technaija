import OrdersContent from "@/components/containers/OrdersContent";

const page = async () => {
  return (
    <section className="p-6">
      <h1 className="font-medium text-xl">Orders Management</h1>
      <section>
        <OrdersContent location="orders" />
      </section>
    </section>
  );
};

export default page;
