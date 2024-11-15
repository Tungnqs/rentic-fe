import React, { useEffect, useMemo, useState } from "react";
import {
  BackIcon,
  BathIcon,
  BedIcon,
  HeartFillIcon,
  HeartIcon,
  LocationIcon,
  MessageIcon,
  ResizeIcon,
} from "../../../assets/icon/icon";
import { BreakPoint } from "../../../interfaces";
import { IPost } from "../../../interfaces/post.interface";
import { useNavigate } from "react-router";
import DataNotFound from "../../../components/DataNotFound/DataNotFound";
import { formatMoney } from "../../../store/slices/app.slice";
import DemoProperty from "../../../assets/images/demo-property.jpg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import {
  getAllMySavedPosts,
  selectAllMySavedPosts,
  selectSavedPostLoading,
  unSavePostById,
} from "../../../store/slices/post.slice";
import Loader from "../../../components/Loader/Loader";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { createConversation } from "../../../store/slices/chat.slice";

const SavedPosts = () => {
  const [searchingKeyword, setSearchingKeyword] = useState("");
  const [filteredPurpose, setFilteredPurpose] = useState("");
  const [filteredProperty, setFilteredProperty] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllMySavedPosts());
  }, []);

  const mySavedPosts = useSelector(selectAllMySavedPosts);
  const loadingStatus = useSelector(selectSavedPostLoading);

  const postToDisplay = useMemo(() => {
    let defaultPosts = mySavedPosts;

    if (filteredPurpose === "For buying") {
      defaultPosts = defaultPosts.filter((post) => post.type === "buy");
    } else if (filteredPurpose === "For renting") {
      defaultPosts = defaultPosts.filter((post) => post.type === "rent");
    }

    if (filteredProperty === "Apartment") {
      defaultPosts = defaultPosts.filter(
        (post) => post.property === "apartment"
      );
    } else if (filteredProperty === "Land") {
      defaultPosts = defaultPosts.filter((post) => post.property === "land");
    } else if (filteredProperty === "Condo") {
      defaultPosts = defaultPosts.filter((post) => post.property === "condo");
    } else if (filteredProperty === "House") {
      defaultPosts = defaultPosts.filter((post) => post.property === "house");
    }

    if (searchingKeyword.trim() !== "") {
      const filteredBySearch = defaultPosts.filter((post) =>
        post.title.toLowerCase().includes(searchingKeyword.toLowerCase())
      );
      return filteredBySearch.length > 0 ? filteredBySearch : [];
    }
    return defaultPosts;
  }, [filteredProperty, filteredPurpose, mySavedPosts, searchingKeyword]);

  return (
    <div className="flex justify-center">
      <div
        className={`w-[80%] max-xl:w-[90%] max-lg:w-[95%] p-7 max-lg:px-0 flex flex-col gap-10 relative max-w-[${BreakPoint.xl}]`}
      >
        <div className="flex flex-col gap-3">
          <div
            onClick={() => navigate(-1)}
            className="flex gap-2 items-center cursor-pointer group"
          >
            <div className="w-[24px] text-secondaryYellow">
              <BackIcon className="w-full" />
            </div>
            <div className="group-hover:underline text-[24px]">Return</div>
          </div>
          <div className="flex justify-between items-center max-md:flex-col max-md:gap-3">
            <div className="flex items-center gap-4 border rounded-3xl py-2 px-4 h-[60px] w-[50%] max-md:w-2/3 max-sm:w-full max-md:min-w-[230px] justify-between">
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
            <div className="w-1/3 max-md:w-[60%] max-[500px]:w-full">
              <div className="flex gap-3">
                <div className="flex-1">
                  <div className="text-[14px] font-semibold mb-2">Purpose</div>
                  <div>
                    <Dropdown
                      chooseValue={setFilteredPurpose}
                      dropdownValues={["All", "For buying", "For renting"]}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-semibold mb-2">Property</div>
                  <div>
                    <Dropdown
                      chooseValue={setFilteredProperty}
                      dropdownValues={[
                        "All",
                        "Apartment",
                        "Land",
                        "Condo",
                        "House",
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loadingStatus === "loading" ? (
          <Loader />
        ) : (
          <PostItems postToDisplay={postToDisplay} />
        )}
      </div>
    </div>
  );
};

interface IPostItemsProps {
  postToDisplay: IPost[];
}

const PostItems = ({ postToDisplay }: IPostItemsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleGoToChat = async (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await dispatch(createConversation(userId));
    navigate("/conversations");
  };

  const handleUnSavePost = (e: React.MouseEvent, post: IPost) => {
    e.stopPropagation();
    dispatch(unSavePostById(post.id));
  };

  return (
    <>
      {postToDisplay.length === 0 ? (
        <DataNotFound />
      ) : (
        <div className="flex w-full gap-[1%] flex-wrap gap-y-4">
          {postToDisplay.map((item) => (
            <div
              onClick={() => navigate("/publish-posts/" + item.id)}
              key={item.id}
              className="cursor-pointer w-[24%] max-lg:w-[32%] max-md:w-[49%] max-[550px]:w-full relative border-2 rounded-2xl hover:-translate-y-1 hover:shadow-xl hover:bg-grayLight1 duration-100"
            >
              <div
                className={`absolute top-4 left-4 ${
                  item.type === "buy"
                    ? "bg-primaryYellow"
                    : "bg-green-500 text-white"
                }  text-[14px] font-medium rounded-2xl px-2 py-[2px]`}
              >
                {item.type === "buy" ? "For Sale" : "For Rent"}
              </div>
              <div
                onClick={(e) => handleUnSavePost(e, item)}
                className="absolute top-4 right-4 w-fit bg-white rounded-lg border p-[2px] cursor-pointer shadow-md text-yellow-600 group/saveBtn"
              >
                <HeartFillIcon className="w-6 group-hover/saveBtn:hidden block" />
                <HeartIcon className="w-6 group-hover/saveBtn:block hidden" />
              </div>
              <img
                src={
                  item.images.length > 0 ? item.images[0].path : DemoProperty
                }
                className="xl:h-48 object-cover rounded-t-2xl max-xl:max-w-none w-full aspectPostImg"
                alt=""
              />
              <div className="p-4 flex flex-col gap-2 w-full">
                <div className="text-[20px] font-bold">{item.title}</div>
                <div className="text-secondaryYellow text-[24px] font-bold">
                  {formatMoney(item.price)}₫
                </div>
                <div className="flex items-center gap-2 text-gray-600 ">
                  <LocationIcon className="w-4 h-4 text-yellow-500" />
                  <p className="text-sm font-semibold truncate">
                    {item.commune}, {item.district}, {item.city}
                  </p>
                </div>
                <div className="text-sm font-semibold text-gray-700  uppercase">
                  {item.property}
                </div>
                <div className="flex items-center justify-between flex-wrap">
                  <div className="flex gap-3">
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <BedIcon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">{item.bedroom}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <BathIcon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">{item.bathroom}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <ResizeIcon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">{item.size}m²</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleGoToChat(item.userId as string, e)}
                    className="p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-full transition-colors"
                  >
                    <MessageIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SavedPosts;
