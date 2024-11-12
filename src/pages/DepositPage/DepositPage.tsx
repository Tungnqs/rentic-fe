import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile } from "../../store/slices/auth.slice";
import AnonymousAvatar from "../../assets/images/anonymous-avatar.png";
import { AppDispatch } from "../../store";
import { createPaymentLink, IDataForCreatePaymentLink } from "../../store/slices/payment.slice";
import { useNavigate } from "react-router";
import { usePayOS } from "payos-checkout";
import useScript from "react-script-hook/lib/use-script";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { formatMoney } from "../../store/slices/app.slice";

const DEPOSIT_OPTIONS = [
  { value: 5000, label: "5,000₫" },
  { value: 10000, label: "10,000₫" },
  { value: 15000, label: "15,000₫" },
  { value: 20000, label: "20,000₫" },
  { value: 5000000, label: "5,000,000₫" },
];

const DepositPage = () => {
  const userProfile = useSelector(selectUserProfile);
  const [chosenValue, setChosenValue] = useState(5000);
  const [popUpLoading, setPopUpLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const DIRECT_URL = `${window.location.origin}/payment/`;

  const [loading] = useScript({
    src: process.env.REACT_APP_PAYOS_SCRIPT as string,
    checkForExisting: true,
  });

  const handleShowPaymentPopup = async (response: any) => {
    if (response) {
      let url = response.checkoutUrl;
      if (url.startsWith("https://dev.pay.payos.vn")) {
        url = url.replace("https://dev.pay.payos.vn", "https://next.dev.pay.payos.vn");
      }
      let { open } = window.PayOSCheckout.usePayOS({
        RETURN_URL: DIRECT_URL,
        ELEMENT_ID: "config_root",
        CHECKOUT_URL: url,
        onExit: (eventData: any) => {
          console.log("eventData.orderCode", eventData.orderCode);
        },
        onSuccess: (eventData: any) => {
          window.location.href = `${DIRECT_URL}${eventData.orderCode}`;
        },
        onCancel: (eventData: any) => {
          window.location.href = `${DIRECT_URL}${eventData.orderCode}`;
        },
      });
      open();
      setPopUpLoading(false);
    } else {
      setPopUpLoading(false);
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
    } else {
      setPopUpLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {popUpLoading && <LoadingScreen />}
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6 space-y-6">
            {/* User Info Section */}
            <div className="flex items-start gap-6 pb-6 border-b border-gray-200">
              <img
                src={userProfile.avatar || AnonymousAvatar}
                alt="Profile"
                className="h-16 w-16 rounded-full object-cover ring-2 ring-amber-600"
              />
              <div className="flex-1 space-y-1">
                <div className="text-sm">
                  <span className="font-medium text-gray-500">Username:</span>
                  <span className="ml-2 text-gray-900">{userProfile.username}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-500">Full name:</span>
                  <span className="ml-2 text-gray-900">{userProfile.firstName} {userProfile.lastName}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-500">Email:</span>
                  <span className="ml-2 text-gray-900">{userProfile.email}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-500">Phone:</span>
                  <span className="ml-2 text-gray-900">{userProfile.phonenumber}</span>
                </div>
              </div>
            </div>

            {/* Balance Section */}
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <span className="text-lg font-medium text-gray-900">Current Balance</span>
              <span className="text-2xl font-semibold text-amber-600">
                {formatMoney(userProfile.balance as number)}₫
              </span>
            </div>

            {/* Deposit Options */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">
                Select amount to deposit:
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {DEPOSIT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setChosenValue(option.value)}
                    className={`
                      px-4 py-3 rounded-md text-sm font-medium
                      ${chosenValue === option.value
                        ? 'ring-2 ring-amber-600 border-transparent text-amber-700 bg-amber-50'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }
                      transition-all duration-150 ease-in-out
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6">
              <button
                onClick={handleDeposit}
                className="w-full sm:w-auto px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-150"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositPage;
