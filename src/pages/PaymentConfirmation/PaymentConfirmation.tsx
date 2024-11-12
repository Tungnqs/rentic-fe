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
  const currentPayment = useSelector(selectCurrentTransaction);
  const isLoading = useSelector(selectPaymentLoading);

  useEffect(() => {
    if (paymentId) {
      dispatch(getPaymentById(paymentId));
    }
  }, [paymentId]);

  const paymentStatus = useMemo(() => {
    const styles: { [key: string]: string } = {
      CANCELLED: "bg-gray-50 text-gray-600 ring-gray-500/20",
      PAID: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    };
    
    const status = currentPayment.data?.status;
    if (!status) return null;

    return (
      <span className={`${styles[status] || ''} inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset`}>
        {status}
      </span>
    );
  }, [currentPayment]);

  useEffect(() => {
    const status = currentPayment.data?.status;
    if (status === "CANCELLED") {
      toast.warning("Your transaction has been cancelled!");
    } else if (status === "PAID") {
      toast.success("Your transaction is successful!");
    }
  }, [currentPayment]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-2xl font-semibold leading-6 text-gray-900">
              Payment Summary
            </h3>
          </div>
          
          {isLoading === "loading" ? (
            <div className="p-8 flex justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <div className="px-4 py-3 sm:px-6 bg-gray-50 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-medium text-amber-600">
                    Order: #{currentPayment.data?.orderCode}
                  </div>
                  <div className="flex items-center gap-2">
                    Status: {paymentStatus}
                  </div>
                </div>
              </div>

              <div className="px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Username</dt>
                    <dd className="mt-1 text-sm text-gray-900">{currentPayment.userData?.username}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">First Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{currentPayment.userData?.firstName}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{currentPayment.userData?.lastName}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{currentPayment.userData?.email}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900">{currentPayment.userData?.phonenumber}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                    <dd className="mt-1 text-sm text-gray-900 uppercase">{currentPayment.userData?.roles[0]}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Amount</dt>
                    <dd className="mt-1 text-sm font-medium text-emerald-600">
                      {currentPayment.data?.amount}₫
                    </dd>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Transaction Description</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {currentPayment.existingTransaction?.description}
                    </dd>
                  </div>
                </dl>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
