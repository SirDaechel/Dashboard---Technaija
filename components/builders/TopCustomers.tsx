import { getCustomersWithOrderCount } from "@/libs/actions/order.actions";
import Image from "next/image";

const TopCustomers = async () => {
  const topCustomers = await getCustomersWithOrderCount();

  return (
    <section className="w-full p-2 border-[1px] border-gray-300">
      <h3 className="pb-2 border-b-[1px] border-b-gray-300 font-medium">
        Top customers
      </h3>
      <div className="flex flex-col gap-3 justify-between py-2">
        {topCustomers?.slice(0, 4).map((customer) => (
          <div key={customer.userId} className="flex items-center gap-3">
            <Image
              className="rounded-full"
              src={customer.userPhoto}
              width={40}
              height={40}
              alt="customer-img"
            />
            <div className="w-full flex items-center justify-between">
              <span className="flex flex-col gap-1 items-start">
                <p className="text-sm">
                  {customer.firstName} {customer.lastName}
                </p>
                <p className="text-xs text-gray-500 font-normal">
                  {customer.email}
                </p>
              </span>
              <p className="p-1 bg-[#272829] text-white rounded-full text-xs">
                {customer.ordersCount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCustomers;
