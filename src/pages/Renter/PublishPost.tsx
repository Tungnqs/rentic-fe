import React, { useState } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import { SearchIcon } from "../../assets/icon/icon";
import PublishPropertyList from "./PublishPostItems/PublishPostItems";
import MapBlock from "./MapBlock/MapBlock";
import { useSelector } from "react-redux";
import { selectAllFetchedPosts, selectLoadingStatus } from "../../store/slices/post.slice";
import Loader from "../../components/Loader/Loader";

const PublishPost = () => {
  const [filteredPurpose, setFilteredPurpose] = useState("");
  const [filteredProperty, setFilteredProperty] = useState("");
  const allPublishPosts = useSelector(selectAllFetchedPosts);
  const loadingStatus = useSelector(selectLoadingStatus);


  return (
    <div className="flex justify-center">
      <div className="w-[90%] max-md:w-full py-7 max-md:p-7 flex gap-4">
        <div className="w-[60%] flex flex-col gap-7 z-20">
          <div className="flex flex-col gap-2">
            <div className="text-[25px]">All Publish Property Posts</div>
            <div>
              <div className="text-[16px]">Location</div>
              <input type="text" className="w-full py-[5px] px-[10px] border-2 border-[#dcdce5] rounded-md hover:border-black"/>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <div>Purpose</div>
                <div><Dropdown chooseValue={setFilteredPurpose} dropdownValues={["All", "For buying", "For renting"]}/></div>
              </div>
              <div className="flex-1">
                <div>Property</div>
                <div><Dropdown chooseValue={setFilteredProperty} dropdownValues={["All", "apartment", "land", "condo", "house"]}/></div>
              </div>
              <div className="flex items-end w-[100px]">
                <div className="flex justify-center items-center w-full py-4 bg-lightYellow hover:bg-primaryYellow text-white rounded-md cursor-pointer">
                  <SearchIcon className="w-6" />
                </div>
              </div>
            </div>
          </div>
          {loadingStatus === "loading" ? (<Loader />) : (
              <div className='flex gap-4 w-full flex-wrap'>
                {allPublishPosts.map((post)=>(
                  <div key={post.id} className='flex gap-2 border-2 p-3 rounded-lg hover:border-gray1 hover:shadow-xl cursor-pointer select-none w-[48%] max-xl:w-full relative text-[14px]'>
                  <PublishPropertyList post={post}/>
              </div>
            ))}
        </div>
            )}
        </div>
        <MapBlock allPublishPosts={allPublishPosts}/>
      </div>
    </div>
  );
};

export default PublishPost;
