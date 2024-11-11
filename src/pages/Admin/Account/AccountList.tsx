import React, { useEffect, useMemo, useState } from "react";
import { IUser } from "../../../interfaces/userProfile.interface";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { MessageIcon, SearchIcon } from "../../../assets/icon/icon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import {
  blockUserById,
  getAllAccounts,
  selectAdminLoadingStatus,
  selectAllUserAccounts,
  unBlockUserById,
} from "../../../store/slices/admin.slice";
import DataNotFound from "../../../components/DataNotFound/DataNotFound";
import Loader from "../../../components/Loader/Loader";
import { formatMoney } from "../../../store/slices/app.slice";
import { selectUserProfile } from "../../../store/slices/auth.slice";
import { useNavigate } from "react-router";
import { createConversation } from "../../../store/slices/chat.slice";

const AccountList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const myProfile = useSelector(selectUserProfile);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllAccounts());
  }, []);

  const users = useSelector(selectAllUserAccounts);
  console.log("users: ", users);

  const [searchingKeyword, setSearchingKeyword] = useState("");
  const [activationFiltered, setActivationFiltered] = useState("");
  const [roleFiltered, setRoleFiltered] = useState("");

  const usersToDisplay = useMemo(() => {
    let accountsByBlockStt = users.filter((user) => user.id !== myProfile.id);
    if (activationFiltered === "Active") {
      accountsByBlockStt = accountsByBlockStt.filter((user) => user.isBlocked === false && user.id !== myProfile.id);
    } else if (activationFiltered === "Inactive") {
      accountsByBlockStt = accountsByBlockStt.filter((user) => user.isBlocked && user.id !== myProfile.id);
    }

    if (roleFiltered === "Renter") {
      accountsByBlockStt = accountsByBlockStt.filter((user) => user.roles[0] === "RENTER");
    } else if (roleFiltered === "Landlord") {
      accountsByBlockStt = accountsByBlockStt.filter((user) => user.roles[0] === "LANDLORD");
    }else if (roleFiltered === "Moderator") {
      accountsByBlockStt = accountsByBlockStt.filter((user) => user.roles[0] === "MODERATOR");
    }else if (roleFiltered === "Admin") {
      accountsByBlockStt = accountsByBlockStt.filter((user) => user.roles[0] === "ADMIN");
    }

    if (searchingKeyword.trim() !== "") {
      const filteredBySearch = accountsByBlockStt.filter((user) =>
        user.username.toLowerCase().includes(searchingKeyword.toLowerCase())
      );
      return filteredBySearch.length > 0 ? filteredBySearch : [];
    }
    return accountsByBlockStt;
  }, [activationFiltered, myProfile.id, roleFiltered, searchingKeyword, users]);

  const handleDisableAccount = async (userId: string) => {
    await dispatch(blockUserById(userId));
  };

  const handleEnableAccount = async (userId: string) => {
    await dispatch(unBlockUserById(userId));
  };

  const loadingStatus = useSelector(selectAdminLoadingStatus);

  const handleGoToChat = async (userId: string) => {
    await dispatch(createConversation(userId));
    navigate("/conversations");
  };

  return (
    <div className="p-8 pb-[65px] max-sm:p-2 bg-bgDarkPrimary text-grayLight2 min-h-screen flex flex-col gap-5">
      <div className="text-[24px] font-semibold">Account Management</div>
      <div className="flex flex-wrap justify-between items-center max-sm:flex-col gap-3 max-sm:items-start">
        <SearchBar
          icon={<SearchIcon className="text-primaryYellow w-8" />}
          searchingKeyword={searchingKeyword}
          setSearchingKeyword={setSearchingKeyword}
          searchPlaceholder="Search user by their Username"
          customWidth="w-[60%] max-md:w-full"
        />
        <div className="flex gap-4 flex-wrap">
          <div className="flex gap-2 items-center">
              <div>Role:</div>
              <div>
                <Dropdown
                  dropdownValues={["All", "Renter", "Landlord", "Moderator", "Admin"]}
                  chooseValue={setRoleFiltered}
                />
              </div>
            </div>
          <div className="flex gap-2 items-center">
            <div>Activation:</div>
            <div>
              <Dropdown
                dropdownValues={["All", "Active", "Inactive"]}
                chooseValue={setActivationFiltered}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-red-600 font-semibold hidden max-[550px]:block">
        *Recommend to use application in landscape view
      </div>
      {loadingStatus === "loading" ? (
        <Loader />
      ) : usersToDisplay.length > 0 ? (
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
                <th scope="col" className="px-2 py-3">
                  Contact
                </th>
                <th scope="col" className="px-2 py-3">
                  Role
                </th>
                <th scope="col" className="px-2 py-3">
                  Username
                </th>
                <th scope="col" className="px-2 py-3">
                  Full name
                </th>
                <th scope="col" className="px-2 py-3">
                  Email
                </th>
                <th scope="col" className="px-2 py-3">
                  Phone
                </th>
                <th scope="col" className="px-2 py-3">
                  Balance
                </th>
                <th scope="col" className="px-2 py-3">
                  Active status
                </th>
                <th scope="col" className="px-2 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {usersToDisplay.map((user, index) => (
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
                    className="px-2 py-4 max-w-[150px] overflow-hidden truncate border border-gray-700 flex justify-center"
                  >
                    <div
                      onClick={(e) =>
                        handleGoToChat(user.id)
                      }
                      className="p-2 border-2 rounded-md border-gray-500 cursor-pointer w-fit bg-darkInput text-white"
                    >
                      <MessageIcon className="w-4" />
                    </div>
                  </th>
                  <td className="px-2 py-4 border border-gray-700">
                    {user.roles[0]}
                  </td>
                  <td className="px-2 py-4 font-medium whitespace-nowrap text-white border border-gray-700">
                    {user.username}
                  </td>
                  <td className="px-2 py-4 border border-gray-700">
                    {user.firstName}, {user.lastName}{" "}
                  </td>
                  <td className="px-2 py-4 border border-gray-700">
                    {user.email}
                  </td>
                  <td className="px-2 py-4 border border-gray-700">
                    {user.phonenumber}
                  </td>
                  <td className="px-2 py-4 border border-gray-700">
                    {formatMoney(user.balance as number)}₫
                  </td>
                  <td className="px-2 py-4 font-semibold border border-gray-700">
                    {user.isBlocked ? (
                      <span className="text-thirdYellow">Inactive</span>
                    ) : (
                      <span className="text-green-600">Active</span>
                    )}
                  </td>
                  <td className="px-2 py-4 font-semibold text-grayLight2 text-center cursor-pointer select-none">
                    {user.isBlocked ? (
                      <span
                        className="bg-blue-600 hover:bg-blue-800 p-2 rounded-sm"
                        onClick={() => handleEnableAccount(user.id)}
                      >
                        Enable
                      </span>
                    ) : (
                      <span
                        className="bg-red-600 hover:bg-red-800 p-2 rounded-sm"
                        onClick={() => handleDisableAccount(user.id)}
                      >
                        Disable
                      </span>
                    )}
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

export default AccountList;
