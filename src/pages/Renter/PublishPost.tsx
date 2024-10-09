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

  return (
    <div className="flex justify-center">
      <div className="w-[95%] max-md:w-full py-7 max-md:p-7 max-md:flex-col-reverse flex gap-4">
        <div className="w-[60%] max-md:w-full flex flex-col gap-7 z-20">
          <div className="flex flex-col gap-2">
            <div className="text-[25px]">All Publish Property Posts</div>
            <div>
              <div className="text-[16px]">Search property by location</div>
              <input
                placeholder="Enter address..."
                value={searchingKeyword}
                onChange={(e) => setSearchingKeyword(e.target.value)}
                type="text"
                className="w-full py-[5px] px-[10px] border-2 border-[#dcdce5] rounded-md hover:border-black"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <div>Purpose</div>
                <div>
                  <Dropdown
                    chooseValue={setFilteredPurpose}
                    dropdownValues={["All", "For buying", "For renting"]}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div>Property</div>
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
            <div className="flex gap-4 w-full flex-wrap">
              {postToDisplay.map((post) => (
                <div
                  key={post.id}
                  className="flex gap-2 border-2 p-3 rounded-lg hover:border-gray1 hover:shadow-xl cursor-pointer select-none w-[48%] max-lg:w-full relative text-[14px]"
                >
                  <PublishPostItems post={post} />
                </div>
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
