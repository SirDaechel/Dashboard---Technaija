const OrdersTableHead = () => {
  return (
    <thead className="border-b-[1px] border-b-solid border-b-gray-300">
      <tr>
        <th className="text-sm text-left">Order ID</th>
        <th className="text-sm text-left">Name</th>
        <th className="text-sm text-left">Product(s)</th>
        <th className="text-sm text-left">Date</th>
        <th className="text-sm text-left">Amount</th>
        <th className="text-sm text-left">Status</th>
        <th>
          <p className="text-sm text-left w-max">Payment method</p>
        </th>
      </tr>
    </thead>
  );
};

export default OrdersTableHead;
