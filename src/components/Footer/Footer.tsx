import React from 'react';
import { FacebookIcon, LinkedInIcon, PhoneIcon } from '../../assets/icon/icon';
import Logo from "../../assets/images/rentic-logo.png";
import { useNavigate } from 'react-router';

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center bg-black text-white">
            <div className="w-[85%] py-10 flex flex-col gap-5">
                <div className='w-fit flex gap-2'>
                    <div className='bg-white p-2 rounded-full'><FacebookIcon className='w-5 text-black'/></div>
                    <div className='bg-white p-2 rounded-full'><LinkedInIcon className='w-5 text-black'/></div>
                </div>
                <div className='flex items-center max-sm:items-start gap-5 max-lg:flex-col'>
                    <div className='flex gap-5 flex-1 max-xl:justify-center max-sm:flex-col'>
                        <div  onClick={()=>navigate("/")} className='flex items-center gap-3 font-semibold text-[25px] cursor-pointer'>
                            <div className='bg-white w-fit p-4 rounded-3xl'>
                                <img src={Logo} alt="" className='size-[50px]' />
                            </div>
                            <div>Rentic</div>
                        </div>
                        <div>
                            <div className='flex text-[25px] gap-2 font-semibold'><PhoneIcon className='w-6' /><div>Hotline</div></div>
                            <div>+84 85 8601 303</div>
                        </div>
                        
                    </div>
                    <div className='flex gap-5 flex-1 max-xl:justify-center max-sm:flex-col'>
                        <div>
                            <div className='text-[25px] font-semibold'>Contributor</div>
                            <div className='max-sm:text-[15px]'>
                                <div>Nguyen Quy Son Tung</div>
                                <div>Contact: thanhlamtainguyen@gmail.com</div>
                            </div>
                        </div>
                        <div>
                            <div className='text-[25px] font-semibold'>Contributor</div>
                            <div className='max-sm:text-[15px]'>
                                <div>Vu Ky Anh</div>
                                <div>Contact: prodkydz@gmail.com</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;