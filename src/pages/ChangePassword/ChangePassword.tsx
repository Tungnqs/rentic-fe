import React, { FormEvent, ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { HidePasswordIcon, ShowPasswordIcon } from "../../assets/icon/icon";
import {
  authLogout,
  changeMyPassword,
  IChangeMyPasswordReq,
} from "../../store/slices/auth.slice";
import { useNavigate } from "react-router";

interface IChangePasswordProps {
  isManager?: boolean;
}

const ChangePassword = ({ isManager }: IChangePasswordProps) => {
  const [currentPasswordField, setCurrentPasswordField] = useState("");
  const [newPasswordField, setNewPasswordField] = useState("");
  const [newPasswordConfirmField, setNewPasswordConfirmField] = useState("");
  const [notification, setNotification] = useState<ReactNode | null>(null);

  const [isShowCurrentPsw, setIsShowCurrentPsw] = useState(false);
  const [isShowNewPsw, setIsShowNewPsw] = useState(false);
  const [isShowConfirmPsw, setIsShowConfirmPsw] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (
      !currentPasswordField ||
      !newPasswordField ||
      !newPasswordConfirmField
    ) {
      setNotification(
        <div className="text-[14px] text-red-600 font-semibold">
          *You must enter all required fields
        </div>
      );
      return;
    }
    
    else if(newPasswordField === currentPasswordField){
      setNotification(
        <div className="text-[14px] text-red-600 font-semibold">
          *New password must not be the same with the current one
        </div>
      );
      return;
    }

    else {
      if (newPasswordConfirmField !== newPasswordField) {
        setNotification(
          <div className="text-[14px] text-red-600 font-semibold">
            *Confirm password does not match with new password
          </div>
        );
        return;
      } else {
        const changePswRequest: IChangeMyPasswordReq = {
          currentPassword: currentPasswordField,
          newPassword: newPasswordConfirmField,
        };
        const changePswResult = await dispatch(
          changeMyPassword(changePswRequest)
        );
        const isChangedSuccessful =
          changeMyPassword.fulfilled.match(changePswResult);
        if (isChangedSuccessful) {
          dispatch(authLogout({ isChangePsw: true }));
          navigate("/login");
        }
      }
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isManager ? "bg-bgDarkPrimary text-grayLight2" : ""
      }`}
    >
      <div className="flex justify-center">
        <div
          className={`w-[500px] mt-7 mb-[90px] flex flex-col gap-5 rounded-md p-7 max-lg:w-[65%] max-sm:w-[80%] mediumBoxShadow ${
            isManager ? "bg-bgLeftNavbar" : ""
          }`}
        >
          <div className="text-center flex flex-col gap-2">
            <div className="text-[24px] font-semibold">
              Change your password
            </div>
            <div>Enter new password below to change your password</div>
          </div>
          <div>
            <div className="font-semibold">Current Password</div>
            <div className="relative">
              <input
                value={currentPasswordField}
                onChange={(e) => setCurrentPasswordField(e.target.value)}
                type={isShowCurrentPsw ? "text" : "password"}
                className={`w-full py-[10px] px-[14px] rounded-md ${
                  isManager
                    ? "bg-bgDarkPrimary"
                    : "border-2 border-[#dcdce5] hover:border-black"
                }`}
                placeholder="Current Password"
              />
              {isShowCurrentPsw ? (
                <ShowPasswordIcon
                  onClick={() => setIsShowCurrentPsw(!isShowCurrentPsw)}
                  className="absolute w-6 right-[10px] top-[11.6px] cursor-pointer"
                />
              ) : (
                <HidePasswordIcon
                  onClick={() => setIsShowCurrentPsw(!isShowCurrentPsw)}
                  className="absolute w-6 right-[10px] top-[11.6px] cursor-pointer"
                />
              )}
            </div>
          </div>
          <div>
            <div className="font-semibold">New Password</div>
            <div className="relative">
              <input
                value={newPasswordField}
                onChange={(e) => setNewPasswordField(e.target.value)}
                type={isShowNewPsw ? "text" : "password"}
                className={`w-full py-[10px] px-[14px] rounded-md ${
                  isManager
                    ? "bg-bgDarkPrimary"
                    : "border-2 border-[#dcdce5] hover:border-black"
                }`}
                placeholder="New Password"
              />
              {isShowNewPsw ? (
                <ShowPasswordIcon
                  onClick={() => setIsShowNewPsw(!isShowNewPsw)}
                  className="absolute w-6 right-[10px] top-[11.6px] cursor-pointer"
                />
              ) : (
                <HidePasswordIcon
                  onClick={() => setIsShowNewPsw(!isShowNewPsw)}
                  className="absolute w-6 right-[10px] top-[11.6px] cursor-pointer"
                />
              )}
            </div>
          </div>
          <div>
            <div className="font-semibold">Confirm new Password</div>
            <div className="relative">
              <input
                value={newPasswordConfirmField}
                onChange={(e) => setNewPasswordConfirmField(e.target.value)}
                type={isShowConfirmPsw ? "text" : "password"}
                className={`w-full py-[10px] px-[14px] rounded-md ${
                  isManager
                    ? "bg-bgDarkPrimary"
                    : "border-2 border-[#dcdce5] hover:border-black"
                }`}
                placeholder="Confirm new Password"
              />
              {isShowConfirmPsw ? (
                <ShowPasswordIcon
                  onClick={() => setIsShowConfirmPsw(!isShowConfirmPsw)}
                  className="absolute w-6 right-[10px] top-[11.6px] cursor-pointer"
                />
              ) : (
                <HidePasswordIcon
                  onClick={() => setIsShowConfirmPsw(!isShowConfirmPsw)}
                  className="absolute w-6 right-[10px] top-[11.6px] cursor-pointer"
                />
              )}
            </div>
          </div>
          {notification}
          <div className="flex justify-end items-center gap-5 select-none">
            <div
              onClick={() => navigate(-1)}
              className={`px-2 py-1  text-white cursor-pointer rounded-sm ${
                isManager
                  ? "bg-bgDarkSecondary hover:bg-gray-700"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
            >
              Cancel
            </div>
            <div
              onClick={handleChangePassword}
              className={`px-4 py-1 text-white cursor-pointer rounded-sm ${
                isManager
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
