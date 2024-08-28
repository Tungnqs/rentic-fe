import React from "react";
import NotFoundImage from "../../assets/images/error-404-page.jpg";
import { BackIcon } from "../../assets/icon/icon";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex items-center flex-col select-none">
      <img src={NotFoundImage} alt="NotFoundImage" className="w-[80%]" />
      <Link to={"/"} className="bg-[#b4b3fc] px-3 py-2 cursor-pointer rounded-2xl text-white hover:bg-[#9e9df8] flex items-center gap-2">
        <div className="w-[18px]">
          <BackIcon className="w-full" />
        </div>
        Go Back
      </Link>
    </div>
  );
};

export default PageNotFound;
