import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type SearchBoxProp = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  placeholder: string;
};

const SearchBox = ({ query, setQuery, placeholder }: SearchBoxProp) => {
  const clearQuery = () => {
    setQuery("");
  };

  return (
    <section className="flex items-center justify-between gap-2 py-2 px-3 w-[25%] border-[1px] border-gray-300 my-4 m:w-full">
      <input
        className="w-full transition text-sm font-light focus:border-[#272829] focus:transition focus:outline-none"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search ${placeholder}`}
      />
      {query && (
        <Image
          className="cursor-pointer"
          src="/close.svg"
          width={25}
          height={25}
          alt="search"
          onClick={clearQuery}
        />
      )}
    </section>
  );
};

export default SearchBox;
