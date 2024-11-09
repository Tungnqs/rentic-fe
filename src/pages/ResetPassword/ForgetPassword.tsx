import React, { ReactNode, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { BackIcon, LoadingIcon, SendIcon } from "../../assets/icon/icon";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { forgetPassword, selectForgetPswSendingStatus } from "../../store/slices/auth.slice";

const ForgetPassword = () => {
  const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [notification, setNotification] = useState<ReactNode>(<div className="text-[13px] font-semibold text-gray-400">Submit to receive your recover link</div>)
    const dispatch = useDispatch<AppDispatch>();
    const sendingStatus = useSelector(selectForgetPswSendingStatus);

    useEffect(()=>{
        if(sendingStatus === "sending"){
            setNotification(
                <div className="flex gap-2 items-center">
                    <LoadingIcon className="w-4" />
                    <div className="text-[13px] font-semibold text-secondaryYellow">Please wait for the process to be done...</div>
                </div>
            )
        } else if(sendingStatus === "sent"){
            setNotification(
                <div className="text-[13px] font-semibold text-green-600">Please check your email to get recover link</div>
            )
        }else if(sendingStatus === "fail"){
            setNotification(
                <div className="text-[13px] font-semibold text-red-600">*Fail to send your recover link</div>
            )
        }
    }, [sendingStatus])

    const handleSendForgetPasswordRequest = () =>{
        dispatch(forgetPassword(email));
    }

  return (
    <>
      <Navbar />
      <div className="flex justify-center select-none">
        <div className="w-fit mt-7 mb-[90px] flex flex-col gap-5 rounded-md p-[30px] max-lg:w-[65%] max-sm:w-[90%] mediumBoxShadow">
          <div className="text-center flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="cursor-pointer p-2 bg-primaryYellow text-white hover:bg-yellow-600 rounded-md">
                <BackIcon
                  onClick={() => navigate(-1)}
                  className="w-4"
                />
              </div>
              <div className="text-[24px] font-bold">Recover Your Password</div>
              <div />
            </div>
            <div>We will send you and email to reset your password</div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <div className="text-[14px] font-semibold">Email</div>
              <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                type="text"
                className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md focus:border-secondaryYellow"
                placeholder="Enter your email"
              />
            </div>
            <div className="min-h-8 flex items-center">{notification}</div>
            <div onClick={handleSendForgetPasswordRequest} className="cursor-pointer bg-black hover:bg-yellow-600 duration-100 text-white rounded-md w-full text-center py-2">Email me</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
