import { formatNumber, convertDateFormat } from "@/libs/utils";

type OrdersTableBodyProps = {
  fetchedOrders: TOrders[];
};

const OrdersTableBody = ({ fetchedOrders }: OrdersTableBodyProps) => {
  return (
    <>
      <tbody>
        {fetchedOrders.reverse().map((order) => (
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
            <td>
              <p className="text-sm">{[...order.products].join(" | ")}</p>
            </td>
            <td>
              <p className="text-sm w-max">{convertDateFormat(order.date)}</p>
            </td>
            <td>
              <p className="text-sm">{formatNumber(order.amount, "₦")}</p>
            </td>
            <td>
              <p className="text-sm text-center rounded-md bg-green-100 text-green-800 p-2">
                {order.status}
              </p>
            </td>
            <td>
              <p className="text-sm">{order.channel}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default OrdersTableBody;
