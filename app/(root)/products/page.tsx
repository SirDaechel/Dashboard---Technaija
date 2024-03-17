import ProductsContent from "@/components/containers/ProductsContent";

const page = () => {
  return (
    <section className="p-6">
      <h1 className="font-medium text-xl">Products Management</h1>
      <section>
        <ProductsContent />
      </section>
    </section>
  );
};

export default page;
