import React, { FormEvent, useEffect, useState } from "react";
import {
  GoogleIcon,
  HidePasswordIcon,
  ShowPasswordIcon,
} from "../../assets/icon/icon";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { registerAccount } from "../../store/slices/authentication.slice";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [usernameField, setUsernameField] = useState("");
  const [pswField, setPswField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [phoneField, setPhoneField] = useState("");

  // useEffect(()=>{
  //   console.log("usernameField", usernameField);
  //   console.log("pswField", pswField);
  //   console.log("emailField", emailField);
  //   console.log("phoneField", phoneField);
  // }, [emailField, phoneField, pswField, usernameField])

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      registerAccount({
        email: emailField,
        password: pswField,
        phonenumber: phoneField,
        username: usernameField,
      })
    );
  };

  return (
    <div className="layout flex justify-center">
      <div className="w-[26%] max-lg:w-[50%] max-md:w-[70%]">
        <div className="top-block">
          <div>
            <div className="text-[32px] font-semibold">Sign up to Rentic</div>
            <div>
              <b className="font-medium">Already have an account?</b>{" "}
              <Link
                to={"/login"}
                className="hover:text-[color:var(--yellow)] underline"
              >
                Login
              </Link>
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
        <form
          className="bottom-block flex flex-col gap-[10px]"
          onSubmit={handleRegister}
        >
          <div className="account field">
            <div className="text-lightGray">Username</div>
            <input
              type="text"
              className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md hover:border-black"
              placeholder="Enter your name"
              onChange={(e) => setUsernameField(e.target.value)}
            />
          </div>
          <div className="account field">
            <div className="text-lightGray">Email</div>
            <input
              type="text"
              className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md hover:border-black"
              placeholder="Enter email"
              onChange={(e) => setEmailField(e.target.value)}
            />
          </div>
          <div className="account field">
            <div className="text-lightGray">Phone number</div>
            <input
              type="text"
              className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md hover:border-black"
              placeholder="Enter phone number"
              onChange={(e) => setPhoneField(e.target.value)}
            />
          </div>
          <div className="psw field">
            <div>Password</div>
            <div className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md hover:border-black flex gap-2">
              <input
                className="flex-1"
                type={isShowPassword ? "text" : "password"}
                placeholder="Enter password"
                onChange={(e) => setPswField(e.target.value)}
              />
              <div
                className="cursor-pointer"
                onClick={() => {
                  setIsShowPassword(!isShowPassword);
                }}
              >
                {isShowPassword ? (
                  <ShowPasswordIcon className="w-[24px]" />
                ) : (
                  <HidePasswordIcon className="w-[24px]" />
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" className="w-[17px]" />
            <div>Remember me</div>
          </div>
          <button
            type="submit"
            className="my-4 login-btn border-2 border-black bg-[color:var(--yellow)] hover:bg-[#ffcf4d] text-center w-full rounded-md font-medium py-[9px]"
          >
            Sign up
          </button>
        </form>
        <div className="text-center text-[14px]">
          By clicking Sign up or Continue with, you agree to Rentic
        </div>
        <div className="text-center text-[14px]">
          <b>Term of Use</b> and <b>Privacy Policy</b>
        </div>
      </div>
    </div>
  );
};

export default Register;
