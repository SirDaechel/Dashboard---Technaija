import Image from "next/image";
import { SetStateAction } from "react";

type PerPageDropdownProps = {
  perPage: number;
  setPerPage: (value: SetStateAction<number>) => void;
};

const PerPageDropdown = ({ perPage, setPerPage }: PerPageDropdownProps) => {
  return (
    <section className="w-[10rem] flex item-center justify-center gap-3">
      <p className="w-full flex items-center justify-center text-sm">
        Per Page:
      </p>
      <span className="relative w-full">
        <Image
          className="absolute right-3 top-3"
          src="/chevron-arrow-down.svg"
          width={20}
          height={20}
          alt="arrow"
        />
        <select
          className="py-2 px-3 border-[1px] border-gray-300 focus:outline-none w-full appearance-none cursor-pointer"
          name="options"
          value={perPage}
          onChange={(e) => setPerPage(parseInt(e.target.value, 10))}
        >
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>20</option>
        </select>
      </span>
    </section>
  );
};

export default PerPageDropdown;
