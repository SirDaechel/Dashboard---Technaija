"use client";

import { useEffect, useState } from "react";
import { getCustomers } from "@/libs/actions/customer.action";
import ProductTable from "../builders/ProductTable";

const ProductsContent = () => {
  const [customers, setCustomers] = useState();

  useEffect(() => {
    const fetchCustomers = async () => {
      const customers = await getCustomers({ limit: 10 });
      setCustomers(customers?.customers);
    };
    fetchCustomers();
  }, []);

  return (
    <section>
      <ProductTable />
    </section>
  );
};

export default ProductsContent;
