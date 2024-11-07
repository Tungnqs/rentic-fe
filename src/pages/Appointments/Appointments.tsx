import React, { useEffect } from "react";
import { BackIcon, MessageIcon } from "../../assets/icon/icon";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  deleteAppointmentById,
  getAllAppointmentOfLandlord,
  getAllAppointmentOfRenter,
  modifyAppointment,
  selectAllAppointments,
  selectAppointmentLoading,
} from "../../store/slices/appointment.slice";
import Loader from "../../components/Loader/Loader";
import { createConversation } from "../../store/slices/chat.slice";
import { formatMoney } from "../../store/slices/app.slice";
import { formatDate } from "../Moderator/Report/ReportList";
import { BreakPoint } from "../../interfaces";

interface IAppointmentsProps {
  isLandLord: boolean;
}

const Appointments = ({ isLandLord }: IAppointmentsProps) => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (isLandLord) {
      dispatch(getAllAppointmentOfLandlord());
    } else {
      dispatch(getAllAppointmentOfRenter());
    }
  }, [isLandLord]);

  const allMyAppointments = useSelector(selectAllAppointments);
  const loadingStatus = useSelector(selectAppointmentLoading);

  const handleAppointmentStatus = (id: string, isApprove: boolean) => {
    dispatch(modifyAppointment({ id: id, isApprove: isApprove }));
  };

  const handleDeleteAppointment = (id: string) => {
    dispatch(deleteAppointmentById(id));
  };

  const handleGoToChat = async(userId: string)=>{
    await dispatch(createConversation(userId));
    navigate("/conversations");
  }

  return (
    <div className="flex justify-center py-10">
      <div className={`w-[90%] flex flex-col gap-5 max-w-[${BreakPoint.xl}]`}>
        <div
          onClick={() => navigate("/")}
          className="flex gap-2 items-center cursor-pointer group"
        >
          <div className="w-[24px] text-secondaryYellow">
            <BackIcon className="w-full" />
          </div>
          <div className="group-hover:underline">Go back</div>
        </div>
        <div className="text-red-600 font-semibold hidden max-[550px]:block">
          *Recommend to use application in landscape view
        </div>
        <div>
          <div className="thinBoxShadow rounded-md p-7">
            {loadingStatus === "loading" ? (
              <Loader />
            ) : (
              <div
                style={{ transform: "rotateX(180deg)" }}
                className="relative overflow-x-auto sm:rounded-lg"
              >
                <table
                  style={{ transform: "rotateX(180deg)" }}
                  className="w-full text-sm text-left rtl:text-right text-gray-500 "
                >
                  <thead className="text-xs text-gray-700 uppercase bg-grayLight2 ">
                    <tr>
                      <th scope="col" className="px-2 py-3">
                        Post name
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Property type
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Purpose
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Partner
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Date and Time
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-2 py-3 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allMyAppointments.map((appointment, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-white " : "bg-grayLight1 "
                        } border-b `}
                      >
                        <th
                          scope="row"
                          className="px-2 py-4 font-medium max-w-[150px] overflow-hidden truncate text-gray-900 whitespace-nowrap "
                        >
                          {appointment.post.title}
                        </th>
                        <td className="px-2 py-4">
                          {appointment.post.property}
                        </td>
                        <td className="px-2 py-4 uppercase text-black font-semibold">{appointment.post.type}</td>
                        <td className="px-2 py-4 text-green-600 font-bold">{formatMoney(appointment.post.price)}₫</td>
                        <td className="px-2 py-4">
                          {appointment.user?.firstName}{" "}
                          {appointment.user?.lastName}
                        </td>
                        <td className="px-2 py-4">
                          {formatDate(appointment.dateTime)}
                        </td>
                        <td className="px-2 py-4 font-semibold">
                          {appointment.approved ? (
                            <span className="text-green-600">Approved</span>
                          ) : (
                            <span className="text-darkGray">Not Approved</span>
                          )}
                        </td>

                        <td className="px-2 py-4 flex flex-col gap-2 items-center">
                          {isLandLord &&
                            (!appointment.approved ? (
                              <div
                                onClick={() =>
                                  handleAppointmentStatus(appointment.id, true)
                                }
                                className="w-fit font-medium text-blue-600 cursor-pointer hover:underline"
                              >
                                Accept
                              </div>
                            ) : (
                              <div
                                onClick={() =>
                                  handleAppointmentStatus(appointment.id, false)
                                }
                                className="w-fit font-medium text-secondaryYellow cursor-pointer hover:underline"
                              >
                                Reject
                              </div>
                            ))}
                          {!isLandLord && (
                            <div
                              onClick={() =>
                                handleDeleteAppointment(appointment.id)
                              }
                              className="w-fit font-medium text-red-600 cursor-pointer hover:underline"
                            >
                              Delete
                            </div>
                          )}
                          <div
                              onClick={()=>handleGoToChat(appointment?.user?.id as string)}
                              className="border-2 p-1 rounded-lg border-gray-500 hover:border-black text-gray-500 hover:text-black w-fit cursor-pointer"
                            >
                              <MessageIcon className="w-6" />
                            </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
