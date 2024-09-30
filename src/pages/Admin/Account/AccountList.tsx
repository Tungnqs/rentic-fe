import React, { useMemo, useState } from "react";
import { IUser } from "../../../interfaces/userProfile.interface";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { SearchIcon } from "../../../assets/icon/icon";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { blockUserById, unBlockUserById } from "../../../store/slices/admin.slice";

const AccountList = () => {
  const users: IUser[] = [
    {
      id: "asdasdsasd1231231231231312",
      firstName: "adasds",
      lastName: "qweqweq",
      roles: ["Landlord"],
      email: "asdads@gmail.com",
      phonenumber: "+84123456789",
      username: "tung",
      balance: 123213,
      isBlocked: false,
      createdAt: "22/12/2021",
    },
    {
      id: "asdasdsasd1231231231231312",
      firstName: "adasds",
      lastName: "qweqweq",
      roles: ["Landlord"],
      email: "asdads@gmail.com",
      phonenumber: "+84123456789",
      username: "anh1w3",
      balance: 123213,
      isBlocked: true,
      createdAt: "22/12/2021",
    },
    {
      id: "asdasdsasd1231231231231312",
      firstName: "adasds",
      lastName: "qweqweq",
      roles: ["Landlord"],
      email: "asdads@gmail.com",
      phonenumber: "+84123456789",
      username: "em123",
      balance: 123213,
      isBlocked: false,
      createdAt: "22/12/2021",
    },
    {
      id: "asdasdsasd1231231231231312",
      firstName: "adasds",
      lastName: "qweqweq",
      roles: ["Landlord"],
      email: "asdads@gmail.com",
      phonenumber: "+84123456789",
      username: "zedddd",
      balance: 12321300000,
      isBlocked: false,
      createdAt: "22/12/2021",
    },
    {
      id: "asdasdsasd1231231231231312",
      firstName: "adasds",
      lastName: "qweqweq",
      roles: ["Landlord"],
      email: "asdads@gmail.com",
      phonenumber: "+84123456789",
      username: "nekoo",
      balance: 123213,
      isBlocked: true,
      createdAt: "22/12/2021",
    },
  ];

  const [searchingKeyword, setSearchingKeyword] = useState("");
  const [filterType, setFilterType] = useState("");

  const usersToDisplay = useMemo(() => {
    let accountsByBlockStt = users;
    if (filterType === "Active") {
      accountsByBlockStt = users.filter((user) => user.isBlocked === false);
    } else if (filterType === "Inactive") {
      accountsByBlockStt = users.filter((user) => user.isBlocked);
    }

    if (searchingKeyword.trim() !== "") {
      const filteredBySearch = accountsByBlockStt.filter((user) =>
        user.username.toLowerCase().includes(searchingKeyword.toLowerCase())
      );
      return filteredBySearch.length > 0 ? filteredBySearch : [];
    }
    return accountsByBlockStt;
  }, [filterType, searchingKeyword, users]);

  const dispatch = useDispatch<AppDispatch>();

  const handleDisableAccount = async(userId: string)=>{
    await dispatch(blockUserById(userId));
  }

  const handleEnableAccount = async(userId: string)=>{
    await dispatch(unBlockUserById(userId));
  }

  return (
    <div className="p-8 max-sm:p-2 bg-bgDarkPrimary text-grayLight2 min-h-screen flex flex-col gap-5">
      <div className="text-[24px] font-semibold">Account Management</div>
      <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-3 max-sm:items-start">
        <SearchBar
        icon={<SearchIcon className="text-primaryYellow w-8" />}
          searchingKeyword={searchingKeyword}
          setSearchingKeyword={setSearchingKeyword}
          searchPlaceholder="Search user by their Username"
        />
        <div className="flex gap-2 items-center">
          <div>Filter by Activation:</div>
          <div>
            <Dropdown
              dropdownValues={["All", "Active", "Inactive"]}
              chooseValue={setFilterType}
            />
          </div>
        </div>
      </div>
      <div className="text-red-600 font-semibold hidden max-[550px]:block">
        *Recommend to use application in landscape view
      </div>
      <div
        style={{ transform: "rotateX(180deg)" }}
        className="relative overflow-x-auto shadow-md darkScrollBar sm:rounded-lg"
      >
        <table
          style={{ transform: "rotateX(180deg)" }}
          className="w-full text-[90%] text-left rtl:text-right text-gray-400"
        >
          <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">
                Account Id
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
                  className="px-2 py-4 max-w-[150px] overflow-hidden truncate border border-gray-700"
                >
                  {user.id}
                </th>
                <td className="px-2 py-4 border border-gray-700">{user.roles[0]}</td>
                <td className="px-2 py-4 font-medium whitespace-nowrap text-white border border-gray-700">{user.username}</td>
                <td className="px-2 py-4 border border-gray-700">
                  {user.firstName}, {user.lastName}{" "}
                </td>
                <td className="px-2 py-4 border border-gray-700">{user.email}</td>
                <td className="px-2 py-4 border border-gray-700">{user.phonenumber}</td>
                <td className="px-2 py-4 border border-gray-700">{user.balance}.₫</td>
                <td className="px-2 py-4 font-semibold border border-gray-700">
                  {user.isBlocked ? (
                    <span className="text-thirdYellow">Inactive</span>
                  ) : (
                    <span className="text-green-600">Active</span>
                  )}
                </td>
                <td className="px-2 py-4 font-semibold text-grayLight2 text-center cursor-pointer select-none">
                {user.isBlocked ? (
                    <span className="bg-blue-600 hover:bg-blue-800 p-2 rounded-sm" onClick={()=>handleEnableAccount(user.id)}>Enable</span>
                  ) : (
                    <span className="bg-red-600 hover:bg-red-800 p-2 rounded-sm" onClick={()=>handleDisableAccount(user.id)}>Disable</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountList;
