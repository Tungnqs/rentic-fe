import React, { useState } from 'react';
import Logo from "../../assets/images/rentic-logo.png";
import { BackIcon, ProfileIcon, SearchIcon } from '../../assets/icon/icon';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { authLogout, selectUserProfile } from '../../store/slices/auth.slice';
import anonymousAvatar from "../../assets/images/anonymous-avatar.png"
import { useNavigate } from 'react-router';
import { INavbarItems } from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

interface ILeftNavBarProps{
    navbarItems?: INavbarItems[];
}

const LeftNavBar = ({navbarItems} : ILeftNavBarProps) => {
    const [isExpand, setIsExpand] = useState(false);
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const handleLogout = async() => {
    await dispatch(authLogout());
    navigate("/login")
  }
  const userProfile = useSelector(selectUserProfile);
  
    return (
        <div className={`z-50 fixed flex flex-col justify-between min-h-screen bg-bgLeftNavbar text-[color:var(--gray-light-2)] px-[14px] py-[8px] ease-in-out duration-200 ${isExpand ? "w-[280px]" : "w-[80px]"}`}>
            <div>
                <div className={`flex  items-center border-b border-gray-500 pb-3 ${!isExpand ? "justify-center" : "justify-between"}`}>
                    <div className='flex gap-3 items-center'>
                        <div className='p-3 box-border bg-grayLight1 rounded-full cursor-pointer' onClick={()=> setIsExpand(!isExpand)}>
                            <img className='aspect-square w-[33px] ' src={Logo} alt="Logo"/>
                        </div>
                        {isExpand && <div className='text-[20px] font-semibold'>{userProfile.roles[0]}</div>}
                    </div>
                    {isExpand &&<BackIcon className=' w-[20px] cursor-pointer' onClick={()=> setIsExpand(!isExpand)} />}
                </div>
                <div className={` flex gap-3 items-center border-b border-gray-500 py-5 ${!isExpand ? "justify-center" : "pl-[5px]"}`}>
                    <img className='aspect-square rounded-full w-[60px] object-cover' src={userProfile.avatar ? userProfile.avatar : anonymousAvatar} alt="Logo" />
                    {isExpand && <div className='default-text font-semibold'>{userProfile.username}</div>}
                </div>
                <div className='flex mt-5 w-full border-b border-gray-500 pb-5 justify-center'>
                    <Link to={'/profile'} className='w-full flex items-center gap-2 justify-center'>
                        <ProfileIcon className='w-[30px] text-white' />{ isExpand && <div onClick={()=> setIsExpand(!isExpand)} className='font-medium text-[20px] flex-1'>Your profile</div>}
                    </Link>
                </div> 
                <div className='flex flex-col gap-4 mt-5'>
                    {navbarItems && navbarItems.map((item, index)=>(
                        <Link to={item.path as string} key={index} className='item flex items-center gap-3 justify-center'>
                            <div className='w-5'>{item.icon}</div>
                            {isExpand && <div className='flex-1 font-medium text-[20px]' onClick={()=> setIsExpand(!isExpand)}>{item.title}</div> }
                        </Link>
                    ))}
                </div>
            </div>
            <div className='flex flex-col gap-3 items-center'>
                {!isExpand &&<BackIcon className='w-[20px] cursor-pointer -rotate-180' onClick={()=> setIsExpand(!isExpand)} />}
                <div onClick={handleLogout} className='hover:underline cursor-pointer'>
                    Logout
                </div>
            </div>
        </div>
    );
};

export default LeftNavBar;