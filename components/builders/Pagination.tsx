import { usePathname, useRouter } from "next/navigation";
import { createURL } from "@/libs/utils";
import Image from "next/image";

type PaginationProp = {
  pageNumbers: number[] | undefined;
  currentPage: number;
  UrlSearchParams: URLSearchParams;
  urlKey: string;
};

const Pagination = ({
  pageNumbers,
  currentPage,
  UrlSearchParams,
  urlKey,
}: PaginationProp) => {
  const router = useRouter();
  const pathname = usePathname();

  const paginate = async (num: number) => {
    UrlSearchParams.set(urlKey, num.toString());
    // Call the function that creates a URL string with the data from UrlSearchParams
    const pageURL = createURL(pathname, UrlSearchParams);
    // Push the created URL string to the URL
    router.push(`${pageURL}`);
  };

  const prevPage = () => {
    UrlSearchParams.set(
      urlKey,
      (currentPage - 1 > 0 ? currentPage - 1 : 1).toString()
    );
    // Call the function that creates a URL string with the data from UrlSearchParams
    const statusURL = createURL(pathname, UrlSearchParams);
    // Push the created URL string to the URL
    router.push(`${statusURL}`);
  };

  const nextPage = () => {
    UrlSearchParams.set(urlKey, (currentPage + 1).toString());
    // Call the function that creates a URL string with the data from UrlSearchParams
    const statusURL = createURL(pathname, UrlSearchParams);
    // Push the created URL string to the URL
    router.push(`${statusURL}`);
  };

  return (
    <section className="w-full flex items-center justify-center gap-4 my-6">
      <Image
        className="cursor-pointer"
        src="/border-arrow-left.svg"
        width={20}
        height={20}
        alt="paginate-back"
        onClick={prevPage}
      />
      <ul className="w-fit flex justify-center gap-2 items-center">
        {pageNumbers?.map((num: number) => (
          <li key={num}>
            <button
              style={{
                backgroundColor:
                  currentPage && currentPage == num ? "#272829" : "transparent",
                color: currentPage && currentPage == num ? "white" : "#272829",
              }}
              className="text-sm px-3 py-2 font-medium rounded bg-transparent"
              onClick={() => paginate(num)}
            >
              {num}
            </button>
          </li>
        ))}
      </ul>
      <Image
        className="cursor-pointer"
        src="/border-arrow-right.svg"
        width={20}
        height={20}
        alt="paginate-back"
        onClick={nextPage}
      />
    </section>
  );
};

export default Pagination;
