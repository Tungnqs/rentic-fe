import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  fetchAllMyTransactions,
  formatMoney,
  selectAllMyTransactions,
  selectFetchMyTransactionsLoading,
} from "../../store/slices/app.slice";
import Loader from "../../components/Loader/Loader";
import { BackIcon, SearchIcon } from "../../assets/icon/icon";
import { BreakPoint } from "../../interfaces";
import { useNavigate } from "react-router";
import { formatDateTime } from "../Conversation/Conversation";
import SearchBar from "../../components/SearchBar/SearchBar";
import Dropdown from "../../components/Dropdown/Dropdown";

const MyTransactions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllMyTransactions());
  }, []);

  const allMyTransactions = useSelector(selectAllMyTransactions);
  const loadingStatus = useSelector(selectFetchMyTransactionsLoading);
  const [searchingKeyword, setSearchingKeyword] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("");

  const transactionsToDisplay = useMemo(() => {
    let filteredTransactions = allMyTransactions;
    if (filteredStatus === "Pending") {
      filteredTransactions = allMyTransactions.filter(
        (item) => item.status === "PENDING"
      );
    } else if (filteredStatus === "Paid") {
      filteredTransactions = allMyTransactions.filter(
        (item) => item.status === "PAID"
      );
    } else if (filteredStatus === "Canceled") {
      filteredTransactions = allMyTransactions.filter(
        (item) => item.status === "CANCELLED"
      );
    } else if (filteredStatus === "Refunded") {
      filteredTransactions = allMyTransactions.filter(
        (item) => item.status === "REFUNDED"
      );
    }

    if (searchingKeyword.trim() !== "") {
      const filteredBySearch = filteredTransactions.filter((item) =>
        item.description.toLowerCase().includes(searchingKeyword.toLowerCase())
      );
      return filteredBySearch.length > 0 ? filteredBySearch : [];
    }
    return filteredTransactions;
  }, [allMyTransactions, filteredStatus, searchingKeyword]);

  return (
    <div className="flex justify-center py-10">
      <div className={`w-[90%] flex flex-col gap-5 max-w-[${BreakPoint.xl}]`}>
        <div className="flex justify-between flex-wrap gap-y-3">
          <div
            onClick={() => navigate("/")}
            className="flex gap-2 items-center cursor-pointer group"
          >
            <div className="w-[24px] text-secondaryYellow">
              <BackIcon className="w-full" />
            </div>
            <div className="group-hover:underline">Go back</div>
          </div>
          <div className="flex gap-3 max-md:w-full justify-between flex-wrap">
            <SearchBar customWidth={"md:w-[350px] max-md:flex-1"} icon={<SearchIcon className="w-6 text-secondaryYellow" />} setSearchingKeyword={setSearchingKeyword} searchPlaceholder="Search transactions by description" searchingKeyword={searchingKeyword}/>
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
        </div>
        <div className="text-red-600 font-semibold hidden max-[550px]:block">
          *Recommend to use application in landscape view
        </div>
        <div>
          <div className="thinBoxShadow rounded-md p-7">
            {loadingStatus === "loading" ? (
              <Loader />
            ) : (
              <div
                style={{ transform: "rotateX(180deg)" }}
                className="relative overflow-x-auto sm:rounded-lg"
              >
                <table
                  style={{ transform: "rotateX(180deg)" }}
                  className="w-full text-sm text-left rtl:text-right text-gray-700 "
                >
                  <thead className="text-xs text-gray-700 uppercase bg-grayLight2 ">
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
                          index % 2 === 0 ? "bg-white " : "bg-grayLight1 "
                        } border-b `}
                      >
                        <th
                          scope="row"
                          className="w-fit px-2 py-4 max-w-[150px] text-black overflow-hidden whitespace-pre-wrap break-words uppercase border "
                        >
                          {item.user.username}
                        </th>
                        <td className="px-2 py-4 max-w-[170px] overflow-hidden whitespace-pre-wrap break-words border ">
                          {item.user.email}
                        </td>
                        <td className="px-2 py-4 font-semibold whitespace-nowrap text-green-600 border ">
                          {formatMoney(item.amount)}₫
                        </td>
                        <td className="px-2 py-4 border  uppercase">
                          {item.method}
                        </td>
                        <td className="px-2 py-4 border  max-w-[150px] whitespace-pre-wrap break-words">
                          {item.description}
                        </td>
                        <td className="px-2 py-4 border  font-bold">
                          {item.status === "PENDING" && (
                            <span className="text-primaryYellow">PENDING</span>
                          )}
                          {item.status === "CANCELLED" && (
                            <span className="text-gray-500">CANCELLED</span>
                          )}
                          {item.status === "PAID" && (
                            <span className="text-blue-600">PAID</span>
                          )}
                          {item.status === "REFUNDED" && (
                            <span className="text-green-600">REFUNDED</span>
                          )}
                        </td>
                        <td className="px-2 py-4 border ">
                          {formatDateTime(item.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTransactions;
