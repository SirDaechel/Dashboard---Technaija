import OrdersTableHead from "./OrdersTableHead";
import OrdersTableBody from "./OrdersTableBody";

const OrdersTable = () => {
  return (
    <section className="w-full mt-4 border-[1px] border-gray-300 overflow-x-auto p-8">
      <h2 className="font-medium text-xl mb-4">Recent Orders</h2>
      <table className="w-full">
        <OrdersTableHead />
        <OrdersTableBody />
      </table>
    </section>
  );
};

export default OrdersTable;
