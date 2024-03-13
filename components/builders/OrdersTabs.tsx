import { createURL } from "@/libs/utils";
import { usePathname, useRouter } from "next/navigation";

type OrdersTabProp = {
  ordersCount: number | undefined;
  ordersSuccessCount: number | undefined;
  ordersPendingCount: number | undefined;
  ordersFailedCount: number | undefined;
  UrlSearchParams: URLSearchParams;
};

const OrdersTabs = ({
  ordersCount,
  ordersSuccessCount,
  ordersPendingCount,
  ordersFailedCount,
  UrlSearchParams,
}: OrdersTabProp) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabChange = (tab: string) => {
    UrlSearchParams.set("page", "1");
    UrlSearchParams.set("status", tab);
    // Call the function that creates a URL string with the data from UrlSearchParams
    const statusURL = createURL(pathname, UrlSearchParams);
    // Push the created URL string to the URL
    router.push(`${statusURL}`);
  };

  const removeTabFromURL = () => {
    UrlSearchParams.delete("page");
    UrlSearchParams.delete("status");
    // Call the function that creates a URL string with the data from UrlSearchParams
    const statusURL = createURL(pathname, UrlSearchParams);
    // Push the created URL string to the URL
    router.push(`${statusURL}`);
  };

  return (
    <div className="w-fit mt-4 border-[1px] border-gray-300 p-2 flex items-center gap-2">
      <div
        className={`flex gap-2 text-sm p-2 hover:bg-[#272829] hover:text-white hover:transition rounded cursor-pointer ${
          UrlSearchParams.get("status") === null
            ? "bg-[#272829] text-white"
            : ""
        }`}
        onClick={() => removeTabFromURL()}
      >
        <p>All Orders - {ordersCount && ordersCount}</p>
      </div>
      <p
        className={`text-sm p-2 hover:bg-[#272829] hover:text-white hover:transition rounded cursor-pointer ${
          UrlSearchParams.get("status") === "success"
            ? "bg-[#272829] text-white"
            : ""
        }`}
        onClick={() => handleTabChange("success")}
      >
        Success - {ordersSuccessCount && ordersSuccessCount}
      </p>
      <p
        className={`text-sm p-2 hover:bg-[#272829] hover:text-white hover:transition rounded cursor-pointer ${
          UrlSearchParams.get("status") === "pending"
            ? "bg-[#272829] text-white"
            : ""
        }`}
        onClick={() => handleTabChange("pending")}
      >
        Pending - {ordersPendingCount && ordersPendingCount}
      </p>
      <p
        className={`text-sm p-2 hover:bg-[#272829] hover:text-white hover:transition rounded cursor-pointer ${
          UrlSearchParams.get("status") === "failed"
            ? "bg-[#272829] text-white"
            : ""
        }`}
        onClick={() => handleTabChange("failed")}
      >
        Failed - {ordersFailedCount && ordersFailedCount}
      </p>
    </div>
  );
};

export default OrdersTabs;
