import React, { useState } from 'react';

const Discover = () => {
    const [discoverType, setDiscoverType] = useState("Buying");

    return (
        <div className="block3 max-md:px-6 flex justify-center">
          <div className="w-[85%] max-md:w-full flex flex-col gap-3">
            <div className="font-bold text-[24px]">Discover how we can help</div>
            <div className="flex gap-4 w-fit items-center">
              <div onClick={()=>setDiscoverType("Buying")} className={`px-4 py-3 border border-black rounded-[55px] cursor-pointer  ${discoverType === "Buying" ? "bg-black hover:bg-darkGray text-white": "hover:bg-grayLight2"}`}>Buying</div>
              <div onClick={()=>setDiscoverType("Renting")} className={`px-4 py-3 border border-black rounded-[55px] cursor-pointer  ${discoverType === "Renting" ? "bg-black hover:bg-darkGray text-white": "hover:bg-grayLight2"}`}>Renting</div>
              <div onClick={()=>setDiscoverType("Selling")} className={`px-4 py-3 border border-black rounded-[55px] cursor-pointer  ${discoverType === "Selling" ? "bg-black hover:bg-darkGray text-white": "hover:bg-grayLight2"}`}>Selling</div>
            </div>
            <div>
              <div>
                <div className="">
                  <div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </div>
    );
};

export default Discover;