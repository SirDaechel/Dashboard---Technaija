type productsTableHeadProps = {
  coupons: TCoupon[] | undefined;
  checkedItems: {};
  selectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CouponsTableHead = ({
  coupons,
  checkedItems,
  selectAll,
}: productsTableHeadProps) => {
  return (
    <thead className="border-b-[1px] border-b-solid border-b-gray-300">
      <tr>
        <th>
          <input
            className="flex w-5 h-5 rounded-lg border-[1px] border-solid border-gray-300 bg-white text-left"
            type="checkbox"
            onChange={selectAll}
            checked={
              !coupons?.length
                ? false
                : Object.keys(checkedItems).length === coupons?.length &&
                  Object.values(checkedItems).every((value) => value)
            }
          />
        </th>
        <th className="text-sm text-left">Code</th>
        <th className="text-sm text-left">Discount</th>
        <th className="text-sm text-left">Limit</th>
      </tr>
    </thead>
  );
};

export default CouponsTableHead;
