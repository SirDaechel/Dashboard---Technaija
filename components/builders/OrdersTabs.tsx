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
    const url = createURL(pathname, UrlSearchParams);
    // Push the created URL string to the URL
    router.push(url);
  };

  const removeTabFromURL = () => {
    UrlSearchParams.delete("page");
    UrlSearchParams.delete("status");
    // Call the function that creates a URL string with the data from UrlSearchParams
    const url = createURL(pathname, UrlSearchParams);
    // Push the created URL string to the URL
    router.push(url);
  };

  return (
    <div className="w-fit mt-4 border-[1px] border-gray-300 p-2 flex items-center gap-2 m:overflow-x-auto m:w-full">
      <button
        type="button"
        className={`flex gap-2 text-sm p-2 hover:bg-[#272829] hover:text-white hover:transition rounded cursor-pointer m:min-w-fit ${
          UrlSearchParams.get("status") === null
            ? "bg-[#272829] text-white"
            : ""
        }`}
        onClick={() => removeTabFromURL()}
      >
        All Orders - {ordersCount}
      </button>
      <button
        type="button"
        className={`text-sm p-2 hover:bg-[#272829] hover:text-white hover:transition rounded cursor-pointer m:min-w-fit ${
          UrlSearchParams.get("status") === "success"
            ? "bg-[#272829] text-white"
            : ""
        }`}
        onClick={() => handleTabChange("success")}
      >
        Success - {ordersSuccessCount}
      </button>
      <button
        type="button"
        className={`text-sm p-2 hover:bg-[#272829] hover:text-white hover:transition rounded cursor-pointer m:min-w-fit ${
          UrlSearchParams.get("status") === "pending"
            ? "bg-[#272829] text-white"
            : ""
        }`}
        onClick={() => handleTabChange("pending")}
      >
        Pending - {ordersPendingCount}
      </button>
      <button
        type="button"
        className={`text-sm p-2 hover:bg-[#272829] hover:text-white hover:transition rounded cursor-pointer m:min-w-fit ${
          UrlSearchParams.get("status") === "failed"
            ? "bg-[#272829] text-white"
            : ""
        }`}
        onClick={() => handleTabChange("failed")}
      >
        Failed - {ordersFailedCount}
      </button>
    </div>
  );
};

export default OrdersTabs;
