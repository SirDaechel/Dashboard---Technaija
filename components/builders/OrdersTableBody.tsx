import { formatNumber, convertDateFormat } from "@/libs/utils";

type OrdersTableBodyProps = {
  fetchedOrders: TOrders[];
};

const OrdersTableBody = ({ fetchedOrders }: OrdersTableBodyProps) => {
  // console.log(
  //   fetchedOrders.map((order) => {
  //     return order.products.map((product) => {
  //       return product.category; // Now the category is returned
  //     });
  //   })
  // );

  // fetchedOrders.map((order) => {
  //   order.products.map((product) => {
  //     console.log(product.name);
  //   });
  // });

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
            <td className="flex gap-2 flex-wrap">
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
