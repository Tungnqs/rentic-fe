import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { SearchIcon } from "../../../assets/icon/icon";
import Loader from "../../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { fetchAllTransactions, selectAllUserTransactions, selectFetchAllTransactionsLoading } from "../../../store/slices/admin.slice";
import Dropdown from "../../../components/Dropdown/Dropdown";
import DataNotFound from "../../../components/DataNotFound/DataNotFound";
import { formatMoney } from "../../../store/slices/app.slice";
import { formatDateTime } from "../../Conversation/Conversation";

const Transactions = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, []);

  const [searchingKeyword, setSearchingKeyword] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("")
  const allTransactions = useSelector(selectAllUserTransactions);
  const loadingStatus = useSelector(selectFetchAllTransactionsLoading);

  const transactionsToDisplay = useMemo(() => {
    let filteredTransactions = allTransactions;
    if (filteredStatus === "Pending") {
        filteredTransactions = allTransactions.filter((item) => item.status === "PENDING");
    } else if (filteredStatus === "Paid") {
        filteredTransactions = allTransactions.filter((item) => item.status === "PAID");
    }else if (filteredStatus === "Canceled") {
        filteredTransactions = allTransactions.filter((item) => item.status === "CANCELLED");
    }else if (filteredStatus === "Refunded") {
        filteredTransactions = allTransactions.filter((item) => item.status === "REFUNDED");
    }

    if (searchingKeyword.trim() !== "") {
      const filteredBySearch = filteredTransactions.filter((item) =>
        item.user.email.toLowerCase().includes(searchingKeyword.toLowerCase())
      );
      return filteredBySearch.length > 0 ? filteredBySearch : [];
    }
    return filteredTransactions;
  }, [allTransactions, filteredStatus, searchingKeyword]);

  return (
    <div className="p-8 pb-[65px] max-sm:p-2 bg-bgDarkPrimary text-grayLight2 min-h-screen flex flex-col gap-5">
      <div className="text-[24px] font-semibold">Account Management</div>
      <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-3 max-sm:items-start">
        <SearchBar
          icon={<SearchIcon className="text-primaryYellow w-8" />}
          searchingKeyword={searchingKeyword}
          setSearchingKeyword={setSearchingKeyword}
          searchPlaceholder="Search for transaction by client email"
        />
        <div className="flex gap-2 items-center">
          <div>Filter by Status:</div>
          <div>
            <Dropdown
              dropdownValues={["All", "Pending", "Paid", "Canceled", "Refunded"]}
              chooseValue={setFilteredStatus}
            />
          </div>
        </div>
      </div>
      <div className="text-red-600 font-semibold hidden max-[550px]:block">
        *Recommend to use application in landscape view
      </div>
      {loadingStatus === "loading" ? (
        <Loader />
      ) : transactionsToDisplay.length > 0 ? (
        <div
          style={{ transform: "rotateX(180deg)" }}
          className="relative overflow-x-auto shadow-md darkScrollBar sm:rounded-lg"
        >
          <table
            style={{ transform: "rotateX(180deg)" }}
            className="w-full text-[90%] text-left rtl:text-right text-gray-300"
          >
            <thead className="text-xs  uppercase bg-gray-700 text-gray-300">
              <tr>
                <th scope="col" className="px-2 py-3 w-fit">
                  Username
                </th>
                <th scope="col" className="px-2 py-3">
                  Email
                </th>
                <th scope="col" className="px-2 py-3">
                  Amount
                </th>
                <th scope="col" className="px-2 py-3">
                  Method
                </th>
                <th scope="col" className="px-2 py-3">
                  Description
                </th>
                <th scope="col" className="px-2 py-3">
                  Status
                </th>
                <th scope="col" className="px-2 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {transactionsToDisplay.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                  } border border-gray-700`}
                >
                  <th
                    scope="row"
                    className="w-fit px-2 py-4 max-w-[150px] text-gray1 overflow-hidden whitespace-pre-wrap break-words uppercase border border-gray-700"
                  >
                    {item.user.username}
                  </th>
                  <td className="px-2 py-4 max-w-[170px] overflow-hidden whitespace-pre-wrap break-words border border-gray-700">
                    {item.user.email}
                  </td>
                  <td className="px-2 py-4 font-semibold whitespace-nowrap text-green-600 border border-gray-700">
                    {formatMoney(item.amount)}₫
                  </td>
                  <td className="px-2 py-4 border border-gray-700 uppercase">
                    {item.method}
                  </td>
                  <td className="px-2 py-4 border border-gray-700 max-w-[150px] whitespace-pre-wrap break-words">
                    {item.description}
                  </td>
                  <td className="px-2 py-4 border border-gray-700 font-bold">
                    {item.status === "PENDING" && (<span className="text-secondaryYellow">PENDING</span>)}
                    {item.status === "CANCELLED" && (<span className="text-gray-500">CANCELLED</span>)}
                    {item.status === "PAID" && (<span className="text-blue-600">PAID</span>)}
                    {item.status === "REFUNDED" && (<span className="text-green-700">REFUNDED</span>)}
                  </td>
                  <td className="px-2 py-4 border border-gray-700">
                    {formatDateTime(item.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <DataNotFound />
      )}
    </div>
  );
};

export default Transactions;
