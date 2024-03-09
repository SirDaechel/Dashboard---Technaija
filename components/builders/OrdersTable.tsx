import OrdersTableHead from "./OrdersTableHead";
import OrdersTableBody from "./OrdersTableBody";
import { getOrders } from "@/libs/actions/order.actions";

const OrdersTable = async () => {
  const fetchedOrders = await getOrders(5);

  return (
    <section className="w-full mt-4 border-[1px] border-gray-300 overflow-x-auto p-8">
      <h2 className="font-medium text-xl mb-4">Recent Orders</h2>
      <table className="w-full">
        <OrdersTableHead />
        {fetchedOrders && fetchedOrders.orders.length > 0 && (
          <OrdersTableBody fetchedOrders={fetchedOrders.orders} />
        )}
      </table>
      {!fetchedOrders ||
        (fetchedOrders?.orders.length <= 0 && (
          <p className="w-full mt-4 text-center">
            There are no orders available
          </p>
        ))}
    </section>
  );
};

export default OrdersTable;
