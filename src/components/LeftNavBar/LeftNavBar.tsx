import React, { useState } from 'react';
import Logo from "../../assets/images/rentic-logo.png";
import UserAvatar from "../../assets/images/user-avt.png";
import { BackIcon, ItemIcon, SearchIcon } from '../../assets/icon/icon';
import { deleteCookie } from '../../utils/cookies.utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { clearCurrentUserRole, selectIsLogin, setIsLoggedIn } from '../../store/slices/auth.slice';

const LeftNavBar = () => {
    const [isExpand, setIsExpand] = useState(true);
  const dispatch = useDispatch<AppDispatch>()
  const handleLogout = () => {
    deleteCookie("token");
    dispatch(setIsLoggedIn(false));
    dispatch(clearCurrentUserRole());
  }
  
    return (
        <div className={`flex flex-col justify-between relative h-screen bg-[color:var(--left-navbar-bg)] text-[color:var(--gray-light-2)] px-[14px] py-[8px] ${isExpand ? "w-[250px]" : "w-[65px]"}`}>
            {isExpand && <BackIcon className='absolute w-[20px] top-[15px] right-[14px] cursor-pointer' onClick={()=> setIsExpand(!isExpand)} />}
            <div>
                <div className='flex gap-3 items-center border-b border-gray-500 pb-3'>
                    <img className='ml-[5px] aspect-square w-[33px] cursor-pointer' src={Logo} alt="Logo" onClick={()=> setIsExpand(!isExpand)}/>
                    {isExpand && <div className='text-[20px] font-semibold'>Rentic Admin</div>}
                </div>
                <div className='flex gap-3 items-center border-b border-gray-500 py-5'>
                    <img className='ml-[5px] aspect-square rounded-full w-[33px]' src={UserAvatar} alt="Logo" />
                    {isExpand && <div className='default-text font-semibold'>Vu~ Ky` Anh</div>}
                </div>
                { isExpand && <div className='flex mt-5 w-full border-b border-gray-500 pb-5'>
                    <input type="text" placeholder='Search' className='bg-[#3f474e] border border-gray-500 w-[80%] rounded-l-md py-[6px] px-[12px]'/>
                    <SearchIcon className='flex items-center justify-center border border-gray-500 rounded-r-md w-[50px] px-[12px] py-[6px] cursor-pointer'/>
                </div> }
                <div className='flex flex-col gap-4 mt-5'>
                    <div className='item flex items-center gap-3 justify-center'>
                        <div><ItemIcon className='w-[20px] text-white'/></div>
                        {isExpand && <div className='flex-1 font-medium text-[20px]'>Item 1</div> }
                    </div>
                    <div className='item flex items-center gap-3 justify-center'>
                        <div><ItemIcon className='w-[20px] text-white'/></div>
                        {isExpand && <div className='flex-1 font-medium text-[20px]'>Item 1</div> }
                    </div>
                    <div className='item flex items-center gap-3 justify-center'>
                        <div><ItemIcon className='w-[20px] text-white'/></div>
                        {isExpand && <div className='flex-1 font-medium text-[20px]'>Item 1</div> }
                    </div>
                    <div className='item flex items-center gap-3 justify-center'>
                        <div><ItemIcon className='w-[20px] text-white'/></div>
                        {isExpand && <div className='flex-1 font-medium text-[20px]'>Item 1</div> }
                    </div>
                    <div className='item flex items-center gap-3 justify-center'>
                        <div><ItemIcon className='w-[20px] text-white'/></div>
                        {isExpand && <div className='flex-1 font-medium text-[20px]'>Item 1</div> }
                    </div>
                </div>
            </div>
            <div onClick={handleLogout} className='hover:underline cursor-pointer'>
                Logout
            </div>
        </div>
    );
};

export default LeftNavBar;