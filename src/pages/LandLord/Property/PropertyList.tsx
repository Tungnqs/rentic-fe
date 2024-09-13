import React, { useEffect, useState } from "react";
import { LocationIcon } from "../../../assets/icon/icon";
import AddPropertyPopUp from "./AddProperty/AddProperty";
import { useSelector } from "react-redux";
import {
  selectAllMyPosts,
  selectLoadingStatus,
} from "../../../store/slices/post.slice";
import { IPost } from "../../../interfaces/post.interface";
import { useNavigate } from "react-router";
import Loader from "../../../components/Loader/Loader";

const PropertyList = () => {
  const [isOpenAddPopup, setIsOpenAddPopup] = useState(false);
  const [searchingKeyword, setSearchingKeyword] = useState("");
  const toggleAddPopup = () => {
    setIsOpenAddPopup(!isOpenAddPopup);
  };

  const allMyPosts = useSelector(selectAllMyPosts);
  const loadingStatus = useSelector(selectLoadingStatus);
  // const [postToDisplay, setPostToDisplay] = useState<IAllPosts[]>([]);

  // useEffect(() => {
  //   if (allMyPosts.length > 0 && postToDisplay.length === 0) {
  //     setPostToDisplay(allMyPosts);
  //   }
  // }, [allMyPosts, postToDisplay.length]);

  // const searchPostsByTitle = () => {
  //   if (searchingKeyword.trim() === "") {
  //     setPostToDisplay(allMyPosts);
  //   } else {
  //     const filteredPosts = allMyPosts.filter((post) =>
  //       post.title.toLowerCase().includes(searchingKeyword.toLowerCase())
  //     );
  //     setPostToDisplay(filteredPosts.length > 0 ? filteredPosts : []);
  //   }
  // };

  return (
    <div className="flex justify-center">
      <div className="w-[80%] max-md:w-full p-7 flex flex-col gap-10 relative">
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-3">
          <div className="flex items-center gap-4 border rounded-3xl py-2 px-4 h-[60px] w-[70%] max-md:min-w-[300px] justify-between">
            <div className="w-8">
              <LocationIcon className="text-secondaryYellow w-full" />
            </div>
            <input
              className="flex-1"
              value={searchingKeyword}
              onChange={(e) => setSearchingKeyword(e.target.value)}
              type="text"
              placeholder="Search properties by their names"
            />
            <div
              // onClick={searchPostsByTitle}
              className="rounded-full duration-100 bg-primaryYellow hover:bg-lightYellow hover:py-2 hover:px-3 py-1 px-2 select-none cursor-pointer"
            >
              Search
            </div>
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
          <PropertyItems postToDisplay={allMyPosts} />
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
    <div className="flex w-full gap-2 flex-wrap gap-y-4 justify-evenly">
      {postToDisplay.map((item) => (
        <div
          onClick={() => navigate(item.id)}
          key={item.id}
          className="w-[250px] p-4 cursor-pointer bg-grayLight1 flex flex-col gap-[10px] hover:bg-grayLight2 rounded-xl hover:-translate-y-1 hover:shadow-xl duration-100 border"
        >
          <img
            style={{ aspectRatio: "3/2" }}
            className="w-full object-cover rounded-md"
            src={
              item.images.length > 0
                ? item.images[0]
                : "https://chefjob.vn/wp-content/uploads/2020/04/homestay-duoc-nhieu-du-khach-lua-chon.jpg"
            }
            alt=""
          />
          <div className="text-[19px]">
            {item.price}{" "}
            <span className="text-green-700 font-semibold">₫</span>
          </div>
          <div className="text-secondaryYellow text-[24px] font-bold truncate">
            {item.title}
          </div>
          <div className="text-[11px]">{item.city}</div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
