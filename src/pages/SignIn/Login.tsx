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
import {
  googleAuth,
  normalLogin,
  selectAuthLoading,
  selectIsLogin,
  selectUserProfile,
  selectUserRole,
  setIsLoggedIn,
} from "../../store/slices/auth.slice";
import Navbar from "../../components/Navbar/Navbar";
import { useAppRole } from "../../utils/useAppRole.utils";
import { setCookie } from "../../utils/cookies.utils";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [inputAccount, setInputAccount] = useState<string>("");
  const [inputPsw, setInputPsw] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLogin);
  const authLoading = useSelector(selectAuthLoading);

  useEffect(() => {
    if (isLoggedIn && authLoading === "loaded") {
      navigate("/");
    }
  }, [authLoading, isLoggedIn]);

  const handleLogin = async () => {
    const loginData: ILogin = {
      email: inputAccount,
      password: inputPsw,
    };

    const result = await dispatch(normalLogin(loginData));
    const isLoginSuccessful = normalLogin.fulfilled.match(result);
    if (isLoginSuccessful && authLoading === "loaded") {
      dispatch(setIsLoggedIn(true));
      navigate("/");
    }
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  const handleGoogleLogin = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=https%3A%2F%2Fapi.rentic.click%2Fapi%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=643109067686-kch3limvdcqcjmio6kh6r4v890djc3ms.apps.googleusercontent.com`;
    window.location.href = googleAuthUrl;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token") || "";
    if(tokenParam){
      setCookie("token", tokenParam);
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="layout flex justify-center flex-1 pt-7">
        <div className="w-[26%] max-lg:w-[50%] max-md:w-[70%]">
          <div className="top-block">
            <div>
              <div className="text-[32px] font-bold text-center">Welcome back</div>
              <div>
                Sign up as{" "}
                <Link
                  to={"/register"}
                  className="text-secondaryYellow hover:text-yellow-500 underline"
                >
                  Rentic user
                </Link>
              </div>
            </div>
            <div onClick={handleGoogleLogin} className="cursor-pointer btn-group flex items-center w-full justify-center mt-[16px] border-solid border rounded-lg gap-[5px] px-[24px] py-[9px] LightGrayBackGround">
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
              <div className="text-lightGray">Email</div>
              <input
                required
                type="text"
                className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md focus:border-black"
                placeholder="Enter email or phone number"
                onChange={(e) => setInputAccount(e.target.value)}
              />
            </div>
            <div className="psw field">
              <div>Password</div>
              <div className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md hover:border-black flex gap-2">
                <input
                  required
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
            <div onClick={()=>navigate("/forget-password")} className="hover:text-[color:var(--yellow)] underline select-none mt-4 cursor-pointer">
              Forgot your password?
            </div>
            <button
              type="submit"
              className="my-4 login-btn hover:bg-yellow-500 bg-primaryYellow text-center w-full rounded-md font-medium py-[9px]"
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
