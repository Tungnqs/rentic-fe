import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import {
  deletePackageById,
  getAllPackages,
  selectAdminLoadingStatus,
  selectAllPackages,
} from "../../../store/slices/admin.slice";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { SearchIcon } from "../../../assets/icon/icon";
import Loader from "../../../components/Loader/Loader";
import { formatDate } from "../../Moderator/Report/ReportList";
import { formatMoney } from "../../../store/slices/app.slice";
import AddPackagePopup from "./AddPackagePopup/AddPackagePopup";
import { IPackage } from "../../../interfaces/ads.interface";
import EditPackagePopUp from "./EditPackagePopUp/EditPackagePopUp";
import DarkConfirmModal from "../../../components/DarkConfirmModal/DarkConfirmModal";

const PackageList = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllPackages());
  }, []);

  const loadingStatus = useSelector(selectAdminLoadingStatus);
  const allPackages = useSelector(selectAllPackages);

  const [chosenPackageForDeleting, setChosenPackageForDeleting] = useState<IPackage | null>(null);
  const [chosenPackageForEditing, setChosenPackageForEditing] = useState<IPackage | null>(null);

  const [searchingKeyword, setSearchingKeyword] = useState("");
  const [showAddPackPopup, setShowAddPackPopup] = useState(false);

  const packagesToDisplay = useMemo(() => {
    let initialPackageList = allPackages;

    if (searchingKeyword.trim() !== "") {
      const searchingResult = initialPackageList.filter((pack) =>
        pack.name.toLowerCase().includes(searchingKeyword.toLowerCase())
      );
      return searchingResult.length > 0 ? searchingResult : [];
    }
    return initialPackageList;
  }, [allPackages, searchingKeyword]);

  const handleDeletePackage = async (packageId: string) => {
    await dispatch(deletePackageById(packageId));
    setChosenPackageForDeleting(null);
  };

  return (
    <div className="p-8 pb-[65px] max-sm:p-2 bg-bgDarkPrimary text-grayLight2 min-h-screen flex flex-col gap-5">
      {showAddPackPopup && (
        <AddPackagePopup
          togglePopup={() => setShowAddPackPopup(!showAddPackPopup)}
        />
      )}
      {chosenPackageForEditing && (
        <EditPackagePopUp
          currentPackage={chosenPackageForEditing}
          togglePopup={() => setChosenPackageForEditing(null)}
        />
      )}
      {chosenPackageForDeleting && (
        <DarkConfirmModal
          confirmBtnTitle="Delete"
          handleSubmit={() => handleDeletePackage(chosenPackageForDeleting.id)}
          togglePopup={() => setChosenPackageForDeleting(null)}
          popupContent={`Do you want to delete this package: "${chosenPackageForDeleting.name}"`}
          popupTitle="Delete Package"
          confirmBtnClass="bg-red-600 hover:bg-red-700"
        />
      )}
      <div className="text-[24px] font-semibold">Package Management</div>
      <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-3 max-sm:items-start">
        <SearchBar
          icon={<SearchIcon className="text-primaryYellow w-8" />}
          searchingKeyword={searchingKeyword}
          setSearchingKeyword={setSearchingKeyword}
          searchPlaceholder="Search package by its name..."
        />
        <div
          onClick={() => setShowAddPackPopup(true)}
          className="hover:bg-green-600 bg-green-700 text-gray-300 px-3 py-2 font-semibold rounded-sm cursor-pointer select-none"
        >
          Add package
        </div>
      </div>
      <div className="text-red-600 font-semibold hidden max-[550px]:block">
        *Recommend to use application in landscape view
      </div>
      {loadingStatus === "loading" ? (
        <Loader />
      ) : (
        <div
          style={{ transform: "rotateX(180deg)" }}
          className="relative overflow-x-auto shadow-md darkScrollBar sm:rounded-lg"
        >
          <table
            style={{ transform: "rotateX(180deg)" }}
            className="w-full text-[90%] text-left rtl:text-right text-gray-300"
          >
            <thead className="text-xs uppercase bg-gray-700 text-gray-300">
              <tr>
                <th scope="col" className="px-2 py-3">
                  Serial
                </th>
                <th scope="col" className="px-2 py-3">
                  Package name
                </th>
                <th scope="col" className="px-2 py-3">
                  Description
                </th>
                <th scope="col" className="px-2 py-3">
                  Date of Creation
                </th>
                <th scope="col" className="px-2 py-3">
                  Daily Rate
                </th>
                <th scope="col" className="px-2 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {packagesToDisplay.map((pack, index) => (
                <PackageColumn
                  key={index}
                  index={index}
                  packageItem={pack}
                  setChosenPackageForDeleting={setChosenPackageForDeleting}
                  setChosenPackageForEditing={setChosenPackageForEditing}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

interface IPackageColumnProps {
  packageItem: IPackage;
  index: number;
  setChosenPackageForDeleting: (pack: IPackage) => void;
  setChosenPackageForEditing: (pack: IPackage) => void;
}

const PackageColumn = ({
  packageItem,
  index,
  setChosenPackageForDeleting,
  setChosenPackageForEditing
}: IPackageColumnProps) => {

  return (
      <tr
        className={`${
          index % 2 === 0
            ? "bg-gray-900"
            : "bg-gray-800"
        } border border-gray-700`}
      >
        <th
          scope="row"
          className="px-2 py-4 max-w-[150px] overflow-hidden truncate border border-gray-700 text-center"
        >
          {index + 1}
        </th>
        <td className="px-2 py-4 font-medium whitespace-nowrap text-white border border-gray-700">
          {packageItem.name}
        </td>
        <td className="px-2 py-4 border border-gray-700 max-w-[150px] whitespace-pre-wrap break-words">
          {packageItem.description}
        </td>
        <td className="px-2 py-4 border border-gray-700">
          {formatDate(packageItem.createdAt)}
        </td>
        <td className="px-2 py-4 border border-gray-700 text-green-400">
          {formatMoney(packageItem.dailyRate)}₫
        </td>

        <td className="px-2 py-4 font-semibold text-grayLight2 text-center cursor-pointer select-none">
          <div
            onClick={() => setChosenPackageForDeleting(packageItem)}
            className="text-red-600 hover:text-red-500 hover:underline"
          >
            Delete
          </div>
          <div
            onClick={() => setChosenPackageForEditing(packageItem)}
            className="text-blue-500 hover:text-blue-400 hover:underline"
          >
            Edit
          </div>
        </td>
      </tr>
  );
};

export default PackageList;
