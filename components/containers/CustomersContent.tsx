"use client";

import {
  deleteCustomer,
  getCustomersWithOrderCount,
} from "@/libs/actions/customer.action";
import CustomersTable from "../builders/CustomersTable";
import SearchBox from "../ui/SearchBox";
import { useEffect, useState } from "react";
import PerPageDropdown from "../ui/PerPageDropdown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { createURL } from "@/libs/utils";
import { setOverlay } from "@/libs/redux-state/features/overlay/overlaySlice";
import DeletePopup from "../builders/DeletePopup";
import Pagination from "../builders/Pagination";

const CustomersContent = () => {
  const [query, setQuery] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [pageNumbers, setPageNumbers] = useState<number[]>();
  const [customers, setCustomers] = useState<UsersWithOrderCount[]>();
  const [showLoader, setShowLoader] = useState(true);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [checkedCustomers, setCheckedCustomers] = useState<
    {
      id: string;
    }[]
  >([]);
  const [singleCustomerToBeDeleted, setSingleCustomerToBeDeleted] =
    useState<string>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const searchParams = useSearchParams();
  const UrlSearchParams = new URLSearchParams(searchParams.toString());
  const currentPage = parseInt(UrlSearchParams.get("page") || "1", 10);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCustomers = async () => {
      const customers = await getCustomersWithOrderCount({
        limit: perPage,
        page: currentPage ?? undefined,
      });
      setCustomers(customers?.customers);
      setPageNumbers(customers?.pageNumbers);
      setShowLoader(false);
    };
    fetchCustomers();
  }, []);

  // Create an array based on the search input and if no input, return the original array
  const filteredCustomersSearch = customers?.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(query.toLowerCase()) ||
      customer.lastName?.toLowerCase().includes(query.toLowerCase())
  );

  // Create a new array (newCheckedCustomers) off of checkedItems
  useEffect(() => {
    const newCheckedCustomers = Object.keys(checkedItems).map((key) => ({
      id: key,
    }));
    setCheckedCustomers(newCheckedCustomers);
  }, [checkedItems]);

  const deleteCustomers = async () => {
    // If customerId is true, then make it into an array and pass it as the value to the "customers" key in the deleteCustomer function
    const idToArray = singleCustomerToBeDeleted
      ? [{ id: singleCustomerToBeDeleted }]
      : [];

    if (checkedCustomers.length > 0) {
      await deleteCustomer({
        customers: checkedCustomers,
        path: pathname,
      });
    }

    if (idToArray.length > 0) {
      await deleteCustomer({
        customers: idToArray,
        path: pathname,
      });
    }

    setShowDeleteModal(false);
    dispatch(setOverlay(false));

    // if there is a single customer in the table and on the current page being viewed, then that customer is deleted, also delete that page
    if (
      customers &&
      currentPage === pageNumbers?.length &&
      customers.length <= 1
    ) {
      pageNumbers.pop();
      UrlSearchParams.set(
        "page",
        (currentPage - 1 > 0 ? currentPage - 1 : 1).toString()
      );
      // Call the function that creates a URL string with the data from UrlSearchParams
      const pageURL = createURL(pathname, UrlSearchParams);
      // Push the created URL string to the URL
      router.push(`${pageURL}`);
    }

    if (customers && customers.length > 1) window.location.reload();
  };

  return (
    <section>
      <DeletePopup
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteItem={deleteCustomers}
      />
      <div className="flex items-center justify-between gap-2 m:flex-col">
        <SearchBox query={query} setQuery={setQuery} placeholder="customers" />
        <div className="flex items-center justify-center gap-3 m:w-full m:justify-between">
          <button
            type="button"
            className="py-2 px-3 border-[1px] border-gray-400 text-sm"
            onClick={() => deleteCustomers()}
          >
            Delete Customer(s)
          </button>
          <PerPageDropdown perPage={perPage} setPerPage={setPerPage} />
        </div>
      </div>
      <CustomersTable
        customers={filteredCustomersSearch}
        setCustomers={setCustomers}
        showLoader={showLoader}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        setShowDeleteModal={setShowDeleteModal}
        setSingleCustomerToBeDeleted={setSingleCustomerToBeDeleted}
      />
      {/* {customers && customers?.length > 0 && ( */}
      <Pagination
        pageNumbers={pageNumbers}
        currentPage={currentPage}
        UrlSearchParams={UrlSearchParams}
        urlKey="page"
      />
      {/* )} */}
    </section>
  );
};

export default CustomersContent;
