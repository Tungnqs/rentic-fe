import React, { useEffect, useMemo, useState } from "react";

import SearchBar from "../../../components/SearchBar/SearchBar";

import { SearchIcon } from "../../../assets/icon/icon";

import Loader from "../../../components/Loader/Loader";

import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../../../store";
import {
  fetchAllTransactions,
  selectAllUserTransactions,
  selectFetchAllTransactionsLoading,
} from "../../../store/slices/admin.slice";
import Dropdown from "../../../components/Dropdown/Dropdown";

import DataNotFound from "../../../components/DataNotFound/DataNotFound";

import { formatMoney } from "../../../store/slices/app.slice";

import { formatDateTime } from "../../Conversation/Conversation";

const Transactions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchingKeyword, setSearchingKeyword] = useState("");

  const [filteredStatus, setFilteredStatus] = useState("");

  const allTransactions = useSelector(selectAllUserTransactions);

  const loadingStatus = useSelector(selectFetchAllTransactionsLoading);

  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, []);

  const transactionsToDisplay = useMemo(() => {
    let filteredTransactions = allTransactions;

    if (filteredStatus) {
      const statusMap: { [key: string]: string } = {
        Pending: "PENDING",

        Paid: "PAID",

        Canceled: "CANCELLED",

        Refunded: "REFUNDED",
      };

      if (filteredStatus !== "All") {
        filteredTransactions = allTransactions.filter(
          (item) => item.status === statusMap[filteredStatus]
        );
      }
    }

    if (searchingKeyword.trim()) {
      return filteredTransactions.filter((item) =>
        item.user.email.toLowerCase().includes(searchingKeyword.toLowerCase())
      );
    }

    return filteredTransactions;
  }, [allTransactions, filteredStatus, searchingKeyword]);

  const getStatusBadgeStyle = (status: string) => {
    const styles = {
      PENDING: "bg-amber-50 text-amber-700 ring-amber-600/20",

      CANCELLED: "bg-gray-50 text-gray-600 ring-gray-500/20",

      PAID: "bg-blue-50 text-blue-700 ring-blue-600/20",

      REFUNDED: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    };

    return `${
      styles[status as keyof typeof styles]
    } inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset`;
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
      </div>

      <div className="lg:flex lg:items-center lg:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <SearchBar
            icon={<SearchIcon className="w-5 h-5 text-gray-400" />}
            searchingKeyword={searchingKeyword}
            setSearchingKeyword={setSearchingKeyword}
            searchPlaceholder="Search by client email..."
          />
        </div>

        <div className="mt-4 lg:mt-0 flex items-center gap-2">
          <span className="text-sm text-gray-700">Status:</span>

          <Dropdown
            dropdownValues={["All", "Pending", "Paid", "Canceled", "Refunded"]}
            chooseValue={setFilteredStatus}
          />
        </div>
      </div>

      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {loadingStatus === "loading" ? (
              <div className="flex justify-center py-8">
                <Loader />
              </div>
            ) : transactionsToDisplay.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      User
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Amount
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Method
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {transactionsToDisplay.map((transaction, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-0">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">
                            {transaction.user.username}
                          </div>

                          <div className="text-sm text-gray-500">
                            {transaction.user.email}
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="font-medium text-emerald-600">
                          {formatMoney(transaction.amount)}₫
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 uppercase">
                        {transaction.method}
                      </td>

                      <td className="px-3 py-4 text-sm text-gray-900">
                        <div className="max-w-xs break-words">
                          {transaction.description}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={getStatusBadgeStyle(transaction.status)}
                        >
                          {transaction.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatDateTime(transaction.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <DataNotFound />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
