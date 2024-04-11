import CouponForm from "@/components/containers/CouponForm";

const page = () => {
  return (
    <section className="p-6">
      <h1 className="font-medium text-xl">Coupon Management</h1>
      <section>
        <CouponForm />
      </section>
    </section>
  );
};

export default page;
