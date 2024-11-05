import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { selectOtpSendingStatus, sendOtpForVerification, verifyOtp } from '../../store/slices/auth.slice';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [otpInput, setOtpInput] = useState("")

    const handleSendOtpToEmail = () =>{
        dispatch(sendOtpForVerification());
    }

    const navigate = useNavigate();

    const sendingStatus = useSelector(selectOtpSendingStatus)

    const sendingMessage = useMemo(()=>{
        if(sendingStatus === "sent"){
            return "Please check your email to get OTP code!"
        }
        else if(sendingStatus === "sending"){
            return "Please wait for the process ..."
        }
        return "Click at button to get OTP code via Gmail"
    }, [sendingStatus])

    const handleVerifyOtp = async() => {
        if(otpInput){
            await dispatch(verifyOtp(otpInput));
            navigate("/")
        }else{
            toast.warning("Please enter OTP code!")
        }
    }

    return (
        <div className='flex justify-center'>
            <div className="w-fit mt-7 mb-[90px] flex flex-col gap-5 rounded-md p-5 max-lg:w-[65%] max-sm:w-[80%] mediumBoxShadow">
                <div>
                    <div className='text-[24px] font-semibold'>Email verification</div> 
                    <div className='text-[12px] text-red-600 font-semibold'>*OTP code will expire in 15 minutes for security reasons</div>
                </div>
                <div className='w-full flex flex-col gap-4 select-none'>
                    <div className='flex flex-col gap-2'>
                        <div onClick={handleSendOtpToEmail} className='bg-green-600 hover:bg-green-700 w-fit text-white py-1 px-3 rounded-sm cursor-pointer'>Send OTP</div>
                        <div className='text-[13px] font-semibold'>{sendingMessage}</div>
                    </div>
                    <input value={otpInput} onChange={(e)=>setOtpInput(e.target.value)} className='w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md hover:border-black' type="text" />
                    <div className='flex justify-end'>
                        <div onClick={handleVerifyOtp} className='py-1 px-3 rounded-sm bg-primaryYellow hover:bg-lightYellow text-black cursor-pointer font-semibold'>Submit</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;