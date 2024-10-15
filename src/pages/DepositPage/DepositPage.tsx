import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile } from "../../store/slices/auth.slice";
import AnonymousAvatar from "../../assets/images/anonymous-avatar.png";
import { AppDispatch } from "../../store";
import {
  createPaymentLink,
  IDataForCreatePaymentLink,
} from "../../store/slices/payment.slice";
import { useNavigate } from "react-router";
import { usePayOS, PayOSConfig } from "payos-checkout";
import useScript from "react-script-hook/lib/use-script";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { formatMoney } from "../../store/slices/app.slice";

const DepositPage = () => {
  const userProfile = useSelector(selectUserProfile);
  const [chosenValue, setChosenValue] = useState(5000);
  const dispatch = useDispatch<AppDispatch>();
  const handleChooseValue = (value: number) => {
    setChosenValue(value);
  };
  const [popUpLoading, setPopUpLoading] = useState(false);
  const navigate = useNavigate();
  const DIRECT_URL = `${window.location.origin}/payment/`;

    const [loading, error] = useScript({
    src: process.env.REACT_APP_PAYOS_SCRIPT as string,
    checkForExisting: true,
  });

  const handleShowPaymentPopup = async (response: any) => {
    if (response) {
      let url = response.checkoutUrl;
      if (url.startsWith("https://dev.pay.payos.vn")) {
        url = url.replace(
          "https://dev.pay.payos.vn",
          "https://next.dev.pay.payos.vn"
        );
      }
      let { open } = window.PayOSCheckout.usePayOS({
        RETURN_URL: DIRECT_URL,
        ELEMENT_ID: "config_root",
        CHECKOUT_URL: url,
        onExit: (eventData: any) => {
          console.log("eventData.orderCode", eventData.orderCode);
        },
        onSuccess: (eventData: any) => {
          console.log(eventData);
          window.location.href = `${DIRECT_URL}${eventData.orderCode}`;
        },
        onCancel: (eventData: any) => {
          console.log(eventData);
          window.location.href = `${DIRECT_URL}${eventData.orderCode}`;
        },
      });
      open();
      setPopUpLoading(false);
    }else{
      setPopUpLoading(false)
    }
  };

  const handleDeposit = async () => {
    setPopUpLoading(true);
    const reqBody: IDataForCreatePaymentLink = {
      amount: chosenValue,
      cancelUrl: DIRECT_URL,
      returnUrl: DIRECT_URL,
    };
    const res = await dispatch(createPaymentLink(reqBody));
    if (res.payload.data) {
      handleShowPaymentPopup(res.payload.data);
    }else{
      setPopUpLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      {popUpLoading && <LoadingScreen />}
      <div className="w-fit mt-7 mb-[90px] flex flex-col gap-5 rounded-md p-5 max-lg:w-[65%] max-sm:w-[80%] mediumBoxShadow">
        <div className="flex gap-5 max-[450px]:flex-col">
          <img
            className="aspect-square w-[100px] rounded-full object-cover"
            src={userProfile.avatar ? userProfile.avatar : AnonymousAvatar}
            alt=""
          />
          <div>
            <div>
              <b>Username:</b> {userProfile.username}
            </div>
            <div>
              <b>Full name:</b> {userProfile.firstName} {userProfile.lastName}
            </div>
            <div>
              <b>Email:</b> {userProfile.email}
            </div>
            <div>
              <b>Phone:</b> {userProfile.phonenumber}
            </div>
          </div>
        </div>
        <div className="text-[24px]">Balance: {formatMoney(userProfile.balance as number)} VND</div>
        <div className="flex flex-col gap-3 select-none">
          <div>Choose value to deposit into your account:</div>
          <div
            onClick={() => handleChooseValue(5000)}
            className={`w-full border-2 ${
              chosenValue === 5000 ? "border-black" : "border-grayLight2"
            } px-3 py-2 rounded-md cursor-pointer`}
          >
            5,000 ₫
          </div>
          <div
            onClick={() => handleChooseValue(10000)}
            className={`w-full border-2 ${
              chosenValue === 10000 ? "border-black" : "border-grayLight2"
            } px-3 py-2 rounded-md cursor-pointer`}
          >
            10,000 ₫
          </div>
          <div
            onClick={() => handleChooseValue(15000)}
            className={`w-full border-2 ${
              chosenValue === 15000 ? "border-black" : "border-grayLight2"
            } px-3 py-2 rounded-md cursor-pointer`}
          >
            15,000 ₫
          </div>
          <div
            onClick={() => handleChooseValue(20000)}
            className={`w-full border-2 ${
              chosenValue === 20000 ? "border-black" : "border-grayLight2"
            } px-3 py-2 rounded-md cursor-pointer`}
          >
            20,000 ₫
          </div>
          <div
            onClick={() => handleChooseValue(5000000)}
            className={`w-full border-2 ${
              chosenValue === 5000000 ? "border-black" : "border-grayLight2"
            } px-3 py-2 rounded-md cursor-pointer`}
          >
            5,000,000 ₫
          </div>
        </div>
        <div className="w-full flex">
          <div
            onClick={handleDeposit}
            className="select-none w-fit px-3 p-1 bg-green-600 hover:bg-green-800 cursor-pointer rounded-sm text-white"
          >
            Deposit
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositPage;
