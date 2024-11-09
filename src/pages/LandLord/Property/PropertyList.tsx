import React, { useEffect, useMemo, useState } from "react";
import { LocationIcon } from "../../../assets/icon/icon";
import AddPropertyPopUp from "./AddProperty/AddProperty";
import { useSelector } from "react-redux";
import {
  selectAllFetchedPosts,
  selectLoadingStatus,
} from "../../../store/slices/post.slice";
import { IPost } from "../../../interfaces/post.interface";
import { useNavigate } from "react-router";
import Loader from "../../../components/Loader/Loader";
import DataNotFound from "../../../components/DataNotFound/DataNotFound";
import { formatMoney } from "../../../store/slices/app.slice";
import DemoProperty from "../../../assets/images/demo-property.jpg";
import { BreakPoint } from "../../../interfaces";

const PropertyList = () => {
  const [isOpenAddPopup, setIsOpenAddPopup] = useState(false);
  const [searchingKeyword, setSearchingKeyword] = useState("");
  const toggleAddPopup = () => {
    setIsOpenAddPopup(!isOpenAddPopup);
  };

  const allMyPosts = useSelector(selectAllFetchedPosts);
  const loadingStatus = useSelector(selectLoadingStatus);

  const postToDisplay = useMemo(() => {
    let defaultPosts = allMyPosts;
    if (searchingKeyword.trim() !== "") {
      const filteredBySearch = defaultPosts.filter((post) =>
        post.title.toLowerCase().includes(searchingKeyword.toLowerCase())
      );
      return filteredBySearch.length > 0 ? filteredBySearch : [];
    }
    return defaultPosts;
  }, [allMyPosts, searchingKeyword]);

  return (
    <div className="flex justify-center">
      <div className={`w-[80%] max-xl:w-[90%] max-lg:w-[95%] p-7 max-lg:px-0 flex flex-col gap-10 relative max-w-[${BreakPoint.xl}]`}>
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-3">
          <div className="flex items-center gap-4 border rounded-3xl py-2 px-4 h-[60px] w-[50%] max-md:w-2/3 max-md:min-w-[230px] justify-between">
            <div className="w-fit">
              <LocationIcon className="text-secondaryYellow w-8" />
            </div>
            <input
              className="flex-1"
              value={searchingKeyword}
              onChange={(e) => setSearchingKeyword(e.target.value)}
              type="text"
              placeholder="Search properties by their names"
            />
          </div>
          <div>
            <div
              onClick={toggleAddPopup}
              className="bg-black text-white px-3 py-2 rounded-3xl select-none cursor-pointer hover:bg-[#3f3f3f]"
            >
              Add new property
            </div>
          </div>
        </div>
        {loadingStatus === "loading" ? (
          <Loader />
        ) : (
          <PropertyItems postToDisplay={postToDisplay} />
        )}
      </div>
      {isOpenAddPopup && <AddPropertyPopUp togglePopup={toggleAddPopup} />}
    </div>
  );
};

interface IPropertyItemsProps {
  postToDisplay: IPost[];
}

const PropertyItems = ({ postToDisplay }: IPropertyItemsProps) => {
  const navigate = useNavigate();
  return (
    <>
      {postToDisplay.length === 0 ? (
        <DataNotFound />
      ) : (
        <div className="flex w-full gap-[1%] flex-wrap gap-y-4">
          {postToDisplay.map((item) => (
            <div onClick={()=>navigate(item.id)} key={item.id} className="cursor-pointer w-[24%] max-lg:w-[32%] max-md:w-[49%] max-[550px]:w-full relative border-2 rounded-2xl hover:-translate-y-1 hover:shadow-xl hover:bg-grayLight1 duration-100">
              <div className={`absolute top-4 right-4 ${item.type === "buy" ? "bg-primaryYellow" : "bg-green-500 text-white" }  text-[14px] font-medium rounded-2xl px-2 py-[2px]`}>{item.type === "buy" ? "For Sale" : "For Rent"}</div>
              <img src={item.images.length > 0 ? item.images[0].path : DemoProperty} className="xl:h-48 object-cover rounded-t-2xl max-xl:max-w-none w-full aspectPostImg" alt="" />
              <div className="p-4 flex flex-col gap-2 w-full">
                <div className="text-[20px] font-bold">{item.title}</div>
                <div className="text-secondaryYellow text-[24px] font-bold">{formatMoney(item.price)}₫</div>
                <div className="flex justify-between">
                  <div className="text-darkGray truncate font-semibold text-[12px]">{item.city}</div>
                  <div className="text-[14px] font-bold">{item.isVerified ? <span className="text-green-600">Published</span> : <span className="text-red-600">Not Published</span>}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PropertyList;
