import OrdersTableHead from "./OrdersTableHead";
import OrdersTableBody from "./OrdersTableBody";
import Loader from "../ui/Loader";
import { Dispatch, SetStateAction } from "react";

type OrdersTableProp = {
  location: string;
  orders: TOrders[] | undefined;
  setOrders?: Dispatch<SetStateAction<TOrders[] | undefined>>;
  showLoader?: boolean;
};

const OrdersTable = ({
  location,
  orders,
  setOrders,
  showLoader,
}: OrdersTableProp) => {
  return (
    <section className="w-full mt-4 border-[1px] border-gray-300 overflow-x-auto p-8">
      {location === "home" && (
        <h2 className="font-medium text-xl mb-4">Recent Orders</h2>
      )}
      {!showLoader ? (
        <>
          <table className="w-full">
            <OrdersTableHead
              orders={orders}
              setOrders={setOrders && setOrders}
            />
            {orders && orders.length > 0 && <OrdersTableBody orders={orders} />}
          </table>
          {!orders ? (
            <p className="w-full mt-4 text-center">
              There are no orders available
            </p>
          ) : (
            orders &&
            orders?.length <= 0 && (
              <p className="w-full mt-4 text-center">
                There are no orders available
              </p>
            )
          )}
        </>
      ) : (
        <section className="h-[70%] flex items-center justify-center">
          <Loader className="loader" />
        </section>
      )}
    </section>
  );
};

export default OrdersTable;
