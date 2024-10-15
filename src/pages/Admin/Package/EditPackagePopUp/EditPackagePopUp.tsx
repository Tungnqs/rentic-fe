import React, { useState } from "react";
import Counter from "../../../../components/Counter/Counter";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { editPackageById, IPackageReqBody } from "../../../../store/slices/admin.slice";
import { IPackage } from "../../../../interfaces/ads.interface";

interface IConfirmModalProps {
  togglePopup: () => void;
  currentPackage: IPackage;
}

const EditPackagePopUp = ({ togglePopup, currentPackage }: IConfirmModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [dailyRate, setDailyRate] = useState(currentPackage.dailyRate);
  const [packageName, setPackageName] = useState(currentPackage.name);
  const [description, setDescription] = useState(currentPackage.description);

  const handleEditPackage = async () => {
    const request: IPackageReqBody ={
      dailyRate: dailyRate,
      description: description,
      name: packageName,
    }
    await dispatch(editPackageById({packageId: currentPackage.id, data: request}));
    togglePopup();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 rounded-md text-grayLight2">
      <div
        className="fixed inset-0 bg-black opacity-80"
        onClick={togglePopup}
      />
      <div className="relative z-10 w-[400px] max-h-[95vh] flex flex-col select-none">
        <div className="flex flex-col gap-4 bg-bgDarkPopupBody pb-4 rounded-t-md">
          <div className="font-semibold text-[24px] px-4 pt-4">
            Edit Package
          </div>
          <div className="px-4 flex flex-col gap-2">
            <div>
              <div>Package name</div>
              <input
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                type="text"
                className="rounded-md bg-darkInput w-full py-[10px] px-[14px]"
              />
            </div>
            <div>
              <div>Daily rate (in VND)</div>
              <Counter
                noNeedBtn={true}
                defaultValue={dailyRate}
                setValue={setDailyRate}
                isDark
              />
            </div>
            <div>
              <div>Description</div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="rounded-md bg-darkInput w-full py-[10px] px-[14px] max-h-[150px] min-h-[55px]"
                name=""
                id=""
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex justify-between bg-bgDarkPopupFooter p-4 items-center rounded-b-md">
          <div
            onClick={togglePopup}
            className="hover:underline cursor-pointer w-fit"
          >
            Cancel
          </div>
          <div
            onClick={handleEditPackage}
            className={`px-4 py-2 bg-primaryYellow hover:bg-lightYellow text-black select-none cursor-pointer rounded-md font-semibold`}
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPackagePopUp;
