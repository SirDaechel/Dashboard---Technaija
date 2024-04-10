import CustomersContent from "@/components/containers/CustomersContent";

const page = () => {
  return (
    <section className="p-6">
      <h1 className="font-medium text-xl">Customers Management</h1>
      <section>
        <CustomersContent />
      </section>
    </section>
  );
};

export default page;
