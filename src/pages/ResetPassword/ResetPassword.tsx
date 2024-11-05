import React, { ReactNode, useEffect, useState } from "react";
import { HidePasswordIcon, ShowPasswordIcon } from "../../assets/icon/icon";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import Navbar from "../../components/Navbar/Navbar";
import {
  IResetPasswordReq,
  resetPassword,
} from "../../store/slices/auth.slice";

const ResetPassword = () => {
  const [newPasswordField, setNewPasswordField] = useState("");
  const [newPasswordConfirmField, setNewPasswordConfirmField] = useState("");
  const [notification, setNotification] = useState<ReactNode | null>(null);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  const [isShowNewPsw, setIsShowNewPsw] = useState(false);
  const [isShowConfirmPsw, setIsShowConfirmPsw] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token") || "";
    const emailParam = urlParams.get("email") || "";

    setToken(tokenParam);
    setEmail(emailParam);
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (!newPasswordField || !newPasswordConfirmField) {
      setNotification(
        <div className="text-[14px] text-red-600 font-semibold">
          *You must enter all required fields
        </div>
      );
      return;
    }

    if (newPasswordConfirmField !== newPasswordField) {
      setNotification(
        <div className="text-[14px] text-red-600 font-semibold">
          *Confirm password does not match with new password
        </div>
      );
      return;
    }

    const request: IResetPasswordReq = {
      email: email,
      newPassword: newPasswordConfirmField,
      token: token,
    };
    const resetPasswordResult = await dispatch(resetPassword(request));
    const isResetSuccessful =
      resetPassword.fulfilled.match(resetPasswordResult);
    if (isResetSuccessful) {
      navigate("/login");
    }
  };
  return (
    <>
      <Navbar />
      <div className={`min-h-screen`}>
        <div className="flex justify-center">
          <div
            className={`w-[500px] mt-7 mb-[90px] flex flex-col gap-5 rounded-md p-7 max-lg:w-[65%] max-sm:w-[80%] mediumBoxShadow`}
          >
            <div className="text-center flex flex-col gap-2">
              <div className="text-[24px] font-semibold">Reset Password</div>
              <div>Enter new password below to reset your password</div>
            </div>
            <div>
              <div className="font-semibold">New Password</div>
              <div className="relative">
                <input
                  value={newPasswordField}
                  onChange={(e) => setNewPasswordField(e.target.value)}
                  type={isShowNewPsw ? "text" : "password"}
                  className={`w-full py-[10px] px-[14px] rounded-md border-2 border-[#dcdce5] hover:border-black`}
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
                  className={`w-full py-[10px] px-[14px] rounded-md border-2 border-[#dcdce5] hover:border-black`}
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
                onClick={handleChangePassword}
                className={`px-4 py-1 text-white cursor-pointer rounded-sm bg-green-500 hover:bg-green-600`}
              >
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
