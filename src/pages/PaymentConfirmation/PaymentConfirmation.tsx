import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AppDispatch } from "../../store";
import {
  getPaymentById,
  selectCurrentTransaction,
  selectPaymentLoading,
} from "../../store/slices/payment.slice";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import { getUserProfile } from "../../store/slices/auth.slice";

const PaymentConfirmation = () => {
  const paymentId = useParams().id;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (paymentId) {
      dispatch(getPaymentById(paymentId));
    }
  }, [paymentId]);

  const currentPayment = useSelector(selectCurrentTransaction);
  const isLoading = useSelector(selectPaymentLoading);

  const paymentStatus = useMemo(() => {
    if (currentPayment.data.status === "CANCELLED") {
      return <span className="text-[#777777] font-bold">CANCELLED</span>;
    } else {
      return <span className="text-green-600 font-bold">PAID</span>;
    }
  }, [currentPayment]);

  useEffect(() => {
    if (currentPayment.data.status === "CANCELLED") {
      toast.warning("Your transaction has been cancelled !");
    } else if (currentPayment.data.status === "PAID") {
      toast.success("Your transaction is successful !");
    }
    dispatch(getUserProfile());
  }, [currentPayment]);

  return (
    <div className="flex justify-center">
      <div className="w-[40%] max-lg:w-[65%] max-sm:w-[80%] flex flex-col gap-3 pt-7">
        <div className="text-[30px] font-medium text-center">
          Payment Summary
        </div>
        {isLoading === "loading" ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-3">
            <div className="text-[25px] font-medium flex justify-between">
              <div className="text-secondaryYellow drop-shadow-md">
                Order: #{currentPayment.data.orderCode}
              </div>
              <div className="drop-shadow-md">Status: {paymentStatus}</div>
            </div>
            <div className="mb-[90px] flex flex-col gap-5 rounded-md p-5 smallBoxShadow">
              <table className="border-collapse text-center border text-[20px]">
                <tbody>
                  <tr>
                    <td className="border-2 border-secondaryYellow w-1/2 p-3 font-semibold rounded-tl-lg">
                      Username
                    </td>
                    <td className="border-2 border-secondaryYellow w-1/2 p-3">
                      {currentPayment.userData.username}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-secondaryYellow p-3 font-semibold">
                      First Name
                    </td>
                    <td className="border-2 border-secondaryYellow p-3">
                      {currentPayment.userData.firstName}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-secondaryYellow p-3 font-semibold">
                      Last Name
                    </td>
                    <td className="border-2 border-secondaryYellow p-3">
                      {currentPayment.userData.lastName}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-secondaryYellow p-3 font-semibold">
                      Email
                    </td>
                    <td className="border-2 border-secondaryYellow p-3">
                      {currentPayment.userData.email}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-secondaryYellow p-3 font-semibold">
                      Phone
                    </td>
                    <td className="border-2 border-secondaryYellow p-3">
                      {currentPayment.userData.phonenumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-secondaryYellow p-3 font-semibold">
                      Role
                    </td>
                    <td className="border-2 border-secondaryYellow p-3">
                      {currentPayment.userData.roles[0]}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-secondaryYellow p-3 font-semibold">
                      Amount
                    </td>
                    <td className="border-2 border-secondaryYellow p-3">
                      {currentPayment.data.amount}{" "}
                      <b className="text-green-600">₫</b>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-secondaryYellow p-3 font-semibold">
                      Transaction Description
                    </td>
                    <td className="border-2 border-secondaryYellow p-3">
                      {currentPayment.existingTransaction.description}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmation;
