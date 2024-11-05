import { useSelector } from "react-redux";
import {
  selectAllFetchedPosts,
  selectLoadingStatus,
} from "../../../store/slices/post.slice";
import demoProperty from "../../../assets/images/demo-property.jpg";
import {
  AllowPetIcon,
  BathIcon,
  BedIcon,
  LocationIcon,
  NoPetIcon,
} from "../../../assets/icon/icon";
import { useNavigate } from "react-router";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import { useMemo, useState } from "react";
import { IPost } from "../../../interfaces/post.interface";
import { toast } from "react-toastify";
import Dropdown from "../../../components/Dropdown/Dropdown";
import DataNotFound from "../../../components/DataNotFound/DataNotFound";

const PostList = () => {
  const allUserPosts = useSelector(selectAllFetchedPosts);
  const loadingStatus = useSelector(selectLoadingStatus);
  const navigate = useNavigate();
  const handleDirectToDetail = (id: string) => {
    navigate(id);
  };

  const [filteredPost, setFilteredPost] = useState("");
  const [searchingKeyword, setSearchingKeyword] = useState("");

  const postToDisplay = useMemo(() => {
    let filteredByVerification = allUserPosts;
    if (filteredPost === "Verified") {
      filteredByVerification = allUserPosts.filter((post) => post.isVerified);
    } else if (filteredPost === "Unverified") {
      filteredByVerification = allUserPosts.filter((post) => !post.isVerified);
    }

    if (searchingKeyword.trim() !== "") {
      const filteredBySearch = filteredByVerification.filter((post) =>
        post.title.toLowerCase().includes(searchingKeyword.toLowerCase())
      );
      return filteredBySearch.length > 0 ? filteredBySearch : [];
    }
    return filteredByVerification;
  }, [allUserPosts, filteredPost, searchingKeyword]);

  return (
    <div className="p-8 pb-[65px] max-sm:p-2 bg-bgDarkPrimary text-grayLight2 min-h-screen flex flex-col gap-5">
      {loadingStatus === "loading" && <LoadingScreen />}
      <div className="text-[24px] font-semibold">
        All User's Posts of Property
      </div>
      <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-3 max-sm:items-start">
        <div className="flex items-center gap-4 border rounded-3xl py-2 px-4 h-[60px] w-[50%] max-md:min-w-[250px] justify-between">
          <div className="w-fit">
            <LocationIcon className="text-secondaryYellow w-8" />
          </div>
          <input
            className="flex-1 bg-transparent"
            value={searchingKeyword}
            onChange={(e) => setSearchingKeyword(e.target.value)}
            type="text"
            placeholder="Search properties by their names"
          />
        </div>
        <div>
          <Dropdown
            chooseValue={setFilteredPost}
            dropdownValues={["All", "Verified", "Unverified"]}
          />
        </div>
      </div>
      {postToDisplay.length === 0 ? (
        <DataNotFound />
      ) : (
        <div className="flex flex-wrap gap-3">
          {postToDisplay.map((post) => (
            <div
              key={post.id}
              className="w-[49%] max-md:w-full flex gap-2 p-2 border-2 border-[#979797] hover:border-[#d8d8d8] h-fit rounded-md cursor-pointer"
              onClick={() => handleDirectToDetail(post.id)}
            >
              <img
                src={
                  post.images.length > 0 ? post.images[0].path : demoProperty
                }
                className="aspectPostImg w-[40%] rounded-md cursor-pointer object-cover"
                alt=""
              />
              <div className="w-[60%] flex flex-col justify-between text-gray1 gap-1">
                <div className="text-[20px] font-bold text-grayLight2 truncate">
                  {post.title}
                </div>
                <div className="flex w-full">
                  <span className="w-[24px]">
                    <LocationIcon className="w-full text-secondaryYellow" />
                  </span>{" "}
                  <div className="truncate flex-1">
                    {post.district}, {post.city}
                  </div>
                </div>
                <div className="flex justify-between gap-2 max-sm:flex-col">
                  <div>Type: {post.property}</div>
                  <div>
                    {post.price} <b className="text-green-600">₫</b>
                  </div>
                </div>
                <div className="flex justify-between items-center max-xl:items-start gap-2 max-sm:gap-2 max-xl:flex-col">
                  <div className="flex max-sm:gap-2 gap-4 items-center">
                    <div className="flex gap-2 max-sm:gap-[2px] p-1 max-sm:p-[2px] border-2 border-[#979797] rounded-md">
                      <BedIcon className="w-[20px]" />
                      <div className="font-bold text-secondaryYellow">
                        {post.bedroom}
                      </div>
                    </div>
                    <div className="flex gap-1 max-sm:gap-[2px] p-1 max-sm:p-[2px] border-2 border-[#979797] rounded-md">
                      <BathIcon className="w-[20px]" />
                      <div className="font-bold text-secondaryYellow">
                        {post.bathroom}
                      </div>
                    </div>
                    <div className="flex gap-1 max-sm:gap-[2px] p-1 max-sm:p-[2px] border-2 border-[#979797] rounded-md">
                      {post.pet ? (
                        <AllowPetIcon className="w-[20px] text-green-600" />
                      ) : (
                        <NoPetIcon className="w-[20px] text-red-500" />
                      )}
                    </div>
                  </div>
                  <div>
                    Status:{" "}
                    {post.isVerified ? (
                      <span className="text-green-600">Verified</span>
                    ) : (
                      <span className="text-red-500">Unverified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
