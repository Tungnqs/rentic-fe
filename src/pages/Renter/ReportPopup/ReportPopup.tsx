import React from "react";

interface IReportPopupProps {
  togglePopup: () => void;
  handleSubmit: () => void;
  confirmBtnTitle: string;
  popupContent: string;
  confirmBtnClass?: string;
  popupTitle: string;
  reasonInput: string;
  setReasonInput:(value:string)=> void;
}

const ReportPopup = ({
  togglePopup,
  confirmBtnTitle,
  handleSubmit,
  popupContent,
  confirmBtnClass,
  popupTitle,
  reasonInput,
  setReasonInput
}: IReportPopupProps) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 rounded-md"
    >
      <div
        className="fixed inset-0 bg-black opacity-80"
        onClick={togglePopup}
      />
      <div className="relative z-10 w-[400px] max-h-[95vh] flex flex-col select-none">
        <div className="flex flex-col gap-4 bg-white pb-4 rounded-t-md">
          <div className="font-semibold text-[24px] px-4 pt-4">
            {popupTitle}
          </div>
          <div className="px-4 flex flex-col gap-4">
            <div className="text-[18px]">{popupContent}</div>
            <input value={reasonInput} onChange={(e)=>setReasonInput(e.target.value)} type="text" className="w-full py-[10px] px-[14px] border-2 rounded-md border-black"/>
          </div>
          
        </div>
        <div className="flex justify-between bg-gray1 p-4 items-center rounded-b-md">
          <div
            onClick={togglePopup}
            className="hover:underline cursor-pointer w-fit"
          >
            Cancel
          </div>
          <div
            onClick={handleSubmit}
            className={`px-4 py-2 ${confirmBtnClass ? confirmBtnClass : "bg-primaryYellow hover:bg-lightYellow"} select-none cursor-pointer rounded-md font-semibold`}
          >
            {confirmBtnTitle}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPopup;
