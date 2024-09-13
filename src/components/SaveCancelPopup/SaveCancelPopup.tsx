import React from "react";

interface ISaveCancelPopupProps {
  handleSave: () => void;
  handleCancel: () => void;
}

const SaveCancelPopup = ({
  handleSave,
  handleCancel,
}: ISaveCancelPopupProps) => {
  return (
    <div
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
      }}
      className="select-none fixed z-10 bg-white bottom-3 w-fit border-2 border-secondaryYellow rounded-md flex gap-4 px-4 py-3 items-center"
    >
      <div className="max-sm:text-[12px]">Unsaved changes, do you want to save it ?</div>
      <div
        onClick={handleCancel}
        className="bg-white hover:bg-grayLight2 border-2 border-gray-400 p-1 rounded-md cursor-pointer"
      >
        Cancel
      </div>
      <div
        onClick={handleSave}
        className="bg-green-600 hover:bg-green-700 border-2 border-green-900 py-1 px-3 rounded-md cursor-pointer text-white"
      >
        Save
      </div>
    </div>
  );
};

export default SaveCancelPopup;
