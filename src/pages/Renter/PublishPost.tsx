import React, { useMemo, useState } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import { SearchIcon } from "../../assets/icon/icon";
import MapBlock from "./MapBlock/MapBlock";
import { useSelector } from "react-redux";
import {
  selectAllFetchedPosts,
  selectLoadingStatus,
} from "../../store/slices/post.slice";
import Loader from "../../components/Loader/Loader";
import PublishPostItems from "./PublishPostItems/PublishPostItems";
import { useNavigate } from "react-router";
import DataNotFound from "../../components/DataNotFound/DataNotFound";

const PublishPost = () => {
  const [filteredPurpose, setFilteredPurpose] = useState("");
  const [filteredProperty, setFilteredProperty] = useState("");
  const [searchingKeyword, setSearchingKeyword] = useState("");
  const allPublishPosts = useSelector(selectAllFetchedPosts);
  const loadingStatus = useSelector(selectLoadingStatus);

  const postToDisplay = useMemo(() => {
    let allPosts = allPublishPosts;
    if (filteredPurpose === "For buying") {
      allPosts = allPosts.filter((post) => post.type === "buy");
    } else if (filteredPurpose === "For renting") {
      allPosts = allPosts.filter((post) => post.type === "rent");
    }

    if (filteredProperty === "Apartment") {
      allPosts = allPosts.filter((post) => post.property === "apartment");
    } else if (filteredProperty === "Land") {
      allPosts = allPosts.filter((post) => post.property === "land");
    } else if (filteredProperty === "Condo") {
      allPosts = allPosts.filter((post) => post.property === "condo");
    } else if (filteredProperty === "House") {
      allPosts = allPosts.filter((post) => post.property === "house");
    }

    if (searchingKeyword.trim() !== "") {
      const searchWords = searchingKeyword
        .toLowerCase()
        .split(" ")
        .filter((word) => word.trim() !== "");

      allPosts = allPosts.filter((post) => {
        const combinedLocation =
          `${post.commune} ${post.district} ${post.city}`.toLowerCase();
        return searchWords.every((word) => combinedLocation.includes(word));
      });
    }

    return allPosts;
  }, [allPublishPosts, filteredProperty, filteredPurpose, searchingKeyword]);
  console.log('postToDisplay: ', postToDisplay);

  return (
    <div className="flex justify-center bg-grayLight2">
      <div className="w-[95%] max-w-[1280px] max-md:w-full py-7 max-md:p-7 max-lg:flex-col-reverse flex gap-4">
        <div className="w-[60%] max-lg:w-full flex flex-col gap-7 z-20 p-5 rounded-md bg-white">
          <div className="flex flex-col gap-4">
            <div className="text-[25px] font-semibold text-center">All Publish Property Posts</div>
            <div className="flex flex-col gap-2">
              <div className="text-[16px] font-semibold">Search property by location</div>
              <input
                placeholder="Enter address..."
                value={searchingKeyword}
                onChange={(e) => setSearchingKeyword(e.target.value)}
                type="text"
                className="w-full py-[5px] px-[10px] border-2 border-[#dcdce5] rounded-md hover:border-black focus:border-secondaryYellow"
              />
            </div>
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
          {loadingStatus === "loading" ? (
            <Loader />
          ) : postToDisplay.length > 0 ? (
            <div className="flex gap-x-[2%] gap-y-4 w-full flex-wrap">
              {postToDisplay.map((post) => (
                  <PublishPostItems post={post} />
              ))}
            </div>
          ) : <DataNotFound />}
        </div>
        <MapBlock allPublishPosts={postToDisplay} />
      </div>
    </div>
  );
};

export default PublishPost;
