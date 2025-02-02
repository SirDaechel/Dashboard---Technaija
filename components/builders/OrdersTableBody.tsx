"use client";

import { formatNumber, convertDateFormat } from "@/libs/utils";

type OrdersTableBodyProps = {
  orders: TOrders[];
};

const OrdersTableBody = ({ orders }: OrdersTableBodyProps) => {
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-white";
    }
  };

  return (
    <tbody>
      {orders.map((order) => (
        <tr
          key={order._id}
          className="border-b-[1px] border-b-solid border-b-gray-200"
        >
          <td>
            <p className="text-sm">{order.orderId}</p>
          </td>
          <td>
            <p className="text-sm w-max">
              {order.firstname} {order.lastname}
            </p>
          </td>
          <td className="flex items-center gap-2 flex-wrap w-fit">
            {order.products.map((product) => (
              <p key={product._id} className="w-max text-sm">
                {product.name} {product.model ? `- ${product.model}` : ""} |
              </p>
            ))}
          </td>
          <td>
            <p className="text-sm w-max">{convertDateFormat(order.date)}</p>
          </td>
          <td>
            <p className="text-sm">{formatNumber(order.amount, "₦")}</p>
          </td>
          <td>
            <p
              className={`text-sm text-center rounded-md ${getStatusClasses(
                order.status
              )} p-2`}
            >
              {order.status}
            </p>
          </td>
          <td>
            <p className="text-sm">{order.channel}</p>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default OrdersTableBody;
