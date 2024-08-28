import React, { useState } from "react";
import { LocationIcon } from "../../../assets/icon/icon";
import AddPropertyPopUp from "./AddProperty";

const PropertyList = () => {
  const [isOpenAddPopup, setIsOpenAddPopup] = useState(false);
  const toggleAddPopup = () => {
    setIsOpenAddPopup(!isOpenAddPopup);
  };
  return (
    <div className="flex justify-center">
      <div className="w-[80%] p-7 flex flex-col gap-10 relative">
        <div
          onClick={toggleAddPopup}
          className="absolute top-7 right-7 bg-black text-white px-3 py-1 rounded-3xl select-none cursor-pointer hover:bg-[#3f3f3f]"
        >
          Add new property
        </div>
        <div className="flex justify-center">
          <div className="flex items-center gap-4 border rounded-3xl py-2 px-4 h-[60px] w-[450px] justify-between">
            <div className="w-8">
              <LocationIcon className="text-secondaryYellow w-full" />
            </div>
            <input
              className="w-[68%]"
              type="text"
              placeholder="Search by name of properties"
            />
            <div className="rounded-full duration-100 bg-primaryYellow hover:bg-lightYellow hover:py-2 hover:px-3 py-1 px-2 select-none cursor-pointer">
              Search
            </div>
          </div>
        </div>
        <PropertyItems />
      </div>
      {isOpenAddPopup && <AddPropertyPopUp togglePopup={toggleAddPopup} />}
    </div>
  );
};

const PropertyItems = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="flex w-full gap-[1.2%] flex-wrap gap-y-4">
      {arr.map((item, index) => (
        <div key={index} className="w-[24%] p-4 cursor-pointer bg-grayLight1 flex flex-col gap-[10px] hover:bg-grayLight2 rounded-xl hover:-translate-y-1 hover:shadow-xl duration-100 border">
          <div className="w-full">
            <img
              style={{ aspectRatio: "3/2" }}
              className="w-full object-cover rounded-md"
              src="https://chefjob.vn/wp-content/uploads/2020/04/homestay-duoc-nhieu-du-khach-lua-chon.jpg"
              alt=""
            />
          </div>
          <div className="text-[19px]">
            2,000,000 <span className="text-green-700 font-semibold">VND</span>
          </div>
          <div className="text-secondaryYellow text-[24px] font-bold">
            Villa 1
          </div>
          <div className="text-[11px]">Luxury life for the wealthy</div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
