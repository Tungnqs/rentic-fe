import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { createAppointment, ICreateAppointment } from '../../../store/slices/appointment.slice';

interface ICreateAppointmentPopupProps{
    togglePopup: ()=>void;
    postId: string;
}

const CreateAppointmentPopup = ({togglePopup, postId}:ICreateAppointmentPopupProps) => {
    const [dateTime, setDateTime] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const isInThePast = useMemo(() => {
      const dateNow = new Date();
      if (!dateTime) return false; 
      const selectedDateTime = new Date(dateTime);
      return selectedDateTime < dateNow;
    }, [dateTime]);
    
    const handleCreateAppointment = async() =>{
      if(isInThePast){
        return;
      }
      const data: ICreateAppointment = {
        dateTime: dateTime,
        postId: postId,
      }
      await dispatch(createAppointment(data));
      togglePopup();
    }

    return (
        <div
      className="fixed inset-0 flex items-center justify-center z-50 rounded-md"
    >
      <div
        className="fixed inset-0 bg-black opacity-80"
        onClick={togglePopup}
      />
      <div className="relative z-10 w-[500px] max-md:w-[400px] max-md:mb-12 max-h-[95vh] flex flex-col select-none">
        <div className="flex flex-col gap-4 bg-white pb-4 rounded-t-md">
          <div className="font-semibold text-[24px] px-4 pt-4">
            Create Appointment
          </div>
          <div className="px-4 flex flex-col gap-4">
            <div className="text-[18px]">Choose a date that you want to have an appointment of property visiting. Wait for the owner to accept this request!</div>
            <input onChange={(e)=>setDateTime(e.target.value)} type="datetime-local" className='py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md hover:border-black' />
            {isInThePast && (<div className='text-red-600 text-[14px] font-semibold'>*Appointment date must be in the future</div>)}
          </div>
          
        </div>
        <div className="flex justify-between bg-gray1 p-4 items-center rounded-b-md">
          <div
            onClick={togglePopup}
            className="hover:underline cursor-pointer w-fit"
          >
            Cancel
          </div>
          <div
            onClick={handleCreateAppointment}
            className={`px-4 border-2 border-black py-2 bg-primaryYellow hover:bg-lightYellow select-none cursor-pointer rounded-md font-semibold`}
          >
            Create 
          </div>
        </div>
      </div>
    </div>
    );
};

export default CreateAppointmentPopup;