import React from "react";

interface IAddPropertyPopUpProps {
  togglePopup: () => void;
}

const AddPropertyPopUp = ({ togglePopup }: IAddPropertyPopUpProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div
        className="fixed inset-0 bg-black opacity-80"
        onClick={togglePopup}
      />
      <div className="relative bg-white z-10 w-[50%] p-4 flex flex-col gap-5">
        <div className="text-[24px] font-semibold text-secondaryYellow">Add a new property</div>
        <div className="flex gap-5">
          <div className="flex flex-col gap-2 flex-1">
            <div>
              <div>Property name:</div>
              <input className="border-2 border-black rounded-md w-full" type="text" />
            </div>
            <div>
              <div>Address</div>
              <input className="border-2 border-black rounded-md w-full" type="text" />
            </div>
            <div>
              <div>Price</div>
              <input
                className="border-2 border-black rounded-md w-full"
                type="number"
              />
            </div>
          </div>
          <div className="flex-1">
            <img className="w-full" src="https://i0.wp.com/www.cssscript.com/wp-content/uploads/2018/03/Simple-Location-Picker.png?fit=561%2C421&ssl=1" alt="" />
          </div>
        </div>
        <div className="flex justify-between">
          <div
            onClick={togglePopup}
            className="hover:underline cursor-pointer w-fit"
          >
            Cancel
          </div>
          <div className="px-3 py-1 bg-primaryYellow hover:bg-lightYellow select-none cursor-pointer rounded-lg font-semibold">Add new Property</div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyPopUp;
