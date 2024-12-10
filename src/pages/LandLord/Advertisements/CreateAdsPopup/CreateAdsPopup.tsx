import React, { useEffect, useMemo, useState } from "react";
import { ArrowDownIcon } from "../../../../assets/icon/icon";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPackages } from "../../../../store/slices/admin.slice";
import { IPackage } from "../../../../interfaces/ads.interface";
import { formatMoney } from "../../../../store/slices/app.slice";
import { createNewAds, IAdsRequest, selectAllFetchedPosts } from "../../../../store/slices/post.slice";
import { IPost } from "../../../../interfaces/post.interface";
import DropdownWithId, { IDropdownWithItems } from "../../../../components/DropdownWithId/DropdownWithId";
import { AppDispatch } from "../../../../store";
import { toast } from "react-toastify";

interface ICreateAdsPopupProps {
  togglePopup: () => void;
}

const CreateAdsPopup = ({ togglePopup }: ICreateAdsPopupProps) => {
    const allPackages = useSelector(selectAllPackages);
    const [chosenPackage, setChosenPackage] = useState<IPackage>(allPackages[0]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const allMyPosts = useSelector(selectAllFetchedPosts);
    const dispatch = useDispatch<AppDispatch>();

    const postDropDownValues = useMemo(()=>{
        const dropDownValues: IDropdownWithItems[] = [];
        if(allMyPosts.length > 0){
            const validPosts = allMyPosts.filter((post)=>{
              return !post.isReported && post.isVerified;
            })
            validPosts.map((post) => {
                const newValue: IDropdownWithItems = {
                    id: post.id,
                    title: post.title,
                }
                dropDownValues.push(newValue);
            })
        }
        return dropDownValues;
    }, [allMyPosts])
    
    const [chosenPost, setChosenPost] = useState(postDropDownValues[0]);
    console.log('chosenPost: ', chosenPost);

    const dateStatus = useMemo(() => {
        const dateNow = new Date();
        if (!startDate && !endDate) return "";
        const selectedStartDate = new Date(startDate);
        const selectedEndDate = new Date(endDate);
        if (selectedStartDate < dateNow || selectedEndDate < dateNow) {
            return "in the past";
        }
        if (selectedStartDate > selectedEndDate) {
            return "invalid end date";
        }
        return "";
    }, [endDate, startDate]);

    const handleAddNewAds = async()=>{
      if(!chosenPost){
        toast.warning("Require published post to subscribe ads!");
        return;
      }
      if(dateStatus === ""){
        const request: IAdsRequest = {
            adPackageId: chosenPackage.id,
            postId: chosenPost.id as string,
            endDate: endDate,
            startDate: startDate
        }
        dispatch(createNewAds(request));
        togglePopup();
      }
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 rounded-md">
      <div
        className="fixed inset-0 bg-black opacity-80"
        onClick={togglePopup}
      />
      <div className="relative z-10 w-[500px] max-h-[95vh] flex flex-col select-none">
        <div className="flex flex-col gap-4 bg-white pb-4 rounded-t-md">
          <div className="font-semibold text-[24px] px-4 pt-4">
            Subscribe advertisement for post
          </div>
          <div className="px-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <div>Choose advertisement package:</div>
                {allPackages.length > 0 && <PackageDropdown chooseValue={setChosenPackage} dropdownValues={allPackages}/>}
            </div>
            <div className="flex flex-col gap-2">
                <div>Choose Post to be advertised:</div>
                {postDropDownValues.length > 0 ? 
                  <DropdownWithId dropdownValues={postDropDownValues} chooseValue={setChosenPost} /> 
                : <div className="cursor-not-allowed w-full text-black bg-gray1 border-2 border-black font-medium rounded-lg text-sm px-5 py-2.5">There is no valid post to subscribe</div>}
            </div>
            <div className="flex justify-between">
                <div className="w-[48%]">
                    <div>Start date:</div>
                    <input onChange={(e)=>setStartDate(e.target.value)} type="date" className='w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md hover:border-black' />
                </div>
                <div className="w-[48%]">
                    <div>End date:</div>
                    <input onChange={(e)=>setEndDate(e.target.value)} type="date" className='w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md hover:border-black' />
                </div>
            </div>
            {dateStatus === "in the past" && (<div className='text-red-600 text-[14px] font-semibold'>*Advertisements date must be in the future</div>)}
            {dateStatus === "invalid end date" && (<div className='text-red-600 text-[14px] font-semibold'>*Invalid end date</div>)}
          </div>
        </div>
        <div className="flex justify-between bg-gray1 p-4 items-center rounded-b-md">
          <div
            onClick={togglePopup}
            className="hover:underline cursor-pointer w-fit"
          >
            Cancel
          </div>
          <div
            onClick={handleAddNewAds}
            className={`px-4 py-2 bg-primaryYellow hover:bg-lightYellow border-2 border-black select-none cursor-pointer rounded-lg font-semibold`}
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
};


interface IPackageDropdownProps {
  dropdownValues: IPackage[];
  chooseValue: (item: IPackage) => void;
}

const PackageDropdown = ({
  dropdownValues,
  chooseValue,
}: IPackageDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(dropdownValues[0].name);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChooseOption = (option: IPackage) => {
    setIsOpen(!isOpen);
    setTitle(option.name);
    chooseValue(option);
  };

  useEffect(()=>{
    chooseValue(dropdownValues[0]);
  }, [])

  return (
    <div className="relative inline-block w-full min-w-[130px]">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="w-full text-black bg-white hover:bg-gray-300 border-2 border-black font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center min-w-[130px] gap-3 justify-between truncate"
        type="button"
      >
        {title}
        <ArrowDownIcon />
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-full border border-[#c4c4c4]"
        >
          <ul
            className="py-2 text-sm max-h-[200px] overflow-y-scroll"
            aria-labelledby="dropdownDefaultButton"
          >
            {dropdownValues.map((pack, index) => (
              <li onClick={() => handleChooseOption(pack)} key={index}>
                <div className="flex justify-between items-center px-4 py-2 hover:bg-gray-100">
                  <div>
                    <div className="font-semibold">{pack.name}</div>
                    <div className="truncate text-[11px]">{pack.description}</div>
                  </div>
                  <div className="font-semibold text-green-600">{formatMoney(pack.dailyRate)}₫</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateAdsPopup;
