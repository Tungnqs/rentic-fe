import React, { useState } from "react";
import {
  GoogleIcon,
  HidePasswordIcon,
  ShowPasswordIcon,
} from "../../assets/icon/icon";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div className="layout flex justify-center">
      <div className="w-[26%]">
        <div className="top-block">
          <div>
            <div className="text-[32px] font-semibold">Login</div>
            <div>
              Sign in as{" "}
              <a
                href="#"
                className="hover:text-[color:var(--yellow)] underline"
              >
                Landowner
              </a>{" "}
              or{" "}
              <a
                href="#"
                className="hover:text-[color:var(--yellow)] underline"
              >
                Renter
              </a>
            </div>
          </div>
          <div className="cursor-pointer btn-group flex items-center w-full justify-center mt-[16px] border-solid border-2 border-black rounded-lg gap-[5px] px-[24px] py-[9px] LightGrayBackGround">
            <GoogleIcon className="w-[30px]" />
            <div className="text-[18px] font-medium">Sign with google</div>
          </div>
        </div>
        <div className="mid-block flex items-center gap-2 my-4">
          <div className="border-b border-2 border-[#dcdce5] flex-1"></div>
          <div className="font-medium">or</div>
          <div className="border-b border-2 border-[#dcdce5] flex-1"></div>
        </div>
        <form className="bottom-block">
          <div className="account field">
            <div className="text-lightGray">Email/Phone number</div>
            <input
              type="text"
              className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md hover:border-black"
              placeholder="Enter email or phone number"
            />
          </div>
          <div className="psw field">
            <div>Password</div>
            <div className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md hover:border-black flex gap-2">
              <input
                className="flex-1"
                type={isShowPassword ? "text" : "password"}
                placeholder="Enter password"
              />
              <button
                className="cursor-pointer"
                onClick={(e) => {
                  setIsShowPassword(!isShowPassword);
                  e.preventDefault();
                }}
              >
                {isShowPassword ? (
                  <ShowPasswordIcon className="w-[24px]" />
                ) : (
                  <HidePasswordIcon className="w-[24px]" />
                )}
              </button>
            </div>
          </div>
          <a href="#" className="hover:text-[color:var(--yellow)] underline">
            <div className="my-4">Forgot your password?</div>
          </a>
          <div className="flex gap-2">
            <input type="checkbox" className="w-[17px]" />
            <div>Remember me</div>
          </div>
          <button className="my-4 login-btn border-2 border-black bg-[color:var(--yellow)] text-center w-full rounded-md font-medium py-[9px]">
            Login
          </button>
        </form>
        <div className="text-center text-[14px]">
          By clicking Log in or Continue with, you agree to Rentic
        </div>
        <div className="text-center text-[14px]">
          <b>Term of Use</b> and <b>Privacy Policy</b>
        </div>
      </div>
    </div>
  );
};

export default Login;
