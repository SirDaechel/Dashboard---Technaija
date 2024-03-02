const OrdersTableBody = () => {
  return (
    <tbody>
      <tr className="border-b-[1px] border-b-solid border-b-gray-200">
        <td className="text-sm">27676</td>
        <td className="text-sm">David Okpala</td>
        <td className="text-sm">Terrazo</td>
        <td className="text-sm">02 March 2024</td>
        <td className="text-sm">₦10,000.00</td>
        <td>
          <p className="text-sm text-center rounded-md bg-green-100 text-green-800 p-2">
            Success
          </p>
        </td>
        <td className="text-sm">Card</td>
      </tr>
    </tbody>
  );
};

export default OrdersTableBody;
