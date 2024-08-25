import React, { FormEvent, useEffect, useState } from "react";
import {
  GoogleIcon,
  HidePasswordIcon,
  ShowPasswordIcon,
} from "../../assets/icon/icon";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { ILogin } from "../../interfaces";
import { normalLogin, selectUserProfile, setIsLoggedIn } from "../../store/slices/auth.slice";
import Navbar from "../../components/Navbar/Navbar";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [inputAccount, setInputAccount] = useState<string>("");
  const [inputPsw, setInputPsw] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleLogin = async() => {
    const loginData: ILogin = {
      email: inputAccount,
      password: inputPsw,
    };
    const isLoginSuccessful = await dispatch(normalLogin(loginData));
    if(isLoginSuccessful){
      dispatch(setIsLoggedIn(true));
      navigate("/");
    } 
  };

  // const userRole = useSelector(selectUserProfile).userProfile.roles[0];
  
  // useEffect(()=>{
  // console.log("s");
  //   if(userRole){
  //     navigate("/");
  //   }
  // }, [navigate, userRole]);

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="layout flex justify-center flex-1">
        <div className="w-[26%] max-lg:w-[50%] max-md:w-[70%]">
          <div className="top-block">
            <div>
              <div className="text-[32px] font-semibold">Login</div>
              <div>
                Sign up as{" "}
                <Link
                  to={"/register"}
                  className="hover:text-[color:var(--yellow)] underline"
                >
                  Rentic user
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
          <form className="bottom-block" onSubmit={handleSubmitForm}>
            <div className="account field">
              <div className="text-lightGray">Email/Phone number</div>
              <input
                type="text"
                className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md hover:border-black"
                placeholder="Enter email or phone number"
                onChange={(e) => setInputAccount(e.target.value)}
              />
            </div>
            <div className="psw field">
              <div>Password</div>
              <div className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md hover:border-black flex gap-2">
                <input
                  className="flex-1"
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Enter password"
                  onChange={(e) => setInputPsw(e.target.value)}
                />
                <div
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
                </div>
              </div>
            </div>
            <div className="hover:text-[color:var(--yellow)] underline select-none">
              <div className="my-4">Forgot your password?</div>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-[17px] bg-yellow-400" />
              <div>Remember me</div>
            </div>
            <button
              onClick={(e: FormEvent) => {
                e.preventDefault();
                handleLogin();
              }}
              className="my-4 login-btn border-2 border-black bg-[color:var(--yellow)] hover:bg-[#ffcf4d] text-center w-full rounded-md font-medium py-[9px]"
            >
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
    </>
  );
};

export default Login;
