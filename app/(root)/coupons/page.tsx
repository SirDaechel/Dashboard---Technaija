import CouponsContent from "@/components/containers/CouponsContent";
import React from "react";

const page = () => {
  return (
    <section className="p-6">
      <h1 className="font-medium text-xl">Coupon Management</h1>
      <section>
        <CouponsContent />
      </section>
    </section>
  );
};

export default page;
