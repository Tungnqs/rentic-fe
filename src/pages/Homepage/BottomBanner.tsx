import React from 'react';
import LeaderImg from "../../assets/images/homepage1.png"
import LocalInfo from "../../assets/images/homepage2.png"
import { ResponsiveBreakPoint } from '../../interfaces';
const BottomBanner = () => {
    return (
        <div className={`block4 max-md:hidden max-w-[${ResponsiveBreakPoint.xl}]`}>
          <div className="flex h-[500px]">
            <img src={LeaderImg} alt="" className="w-1/2 h-full object-cover" />
            <div className="w-1/2 flex items-center bg-grayLight2">
                <div className="px-[50px]">
                  <div className="text-[32px] font-bold">Need a home loan? Get pre-approved</div>
                  <div>Find a lender who can offer competitive mortgage rates and help you with pre-approval.</div>
                </div>
            </div>
          </div>
          <div className="flex h-[500px]">
            <div className="w-1/2 flex items-center bg-grayLight2">
                <div className="px-[50px]">
                  <div className="text-[32px] font-bold">Get Local Info</div>
                  <div>Does it have pet-friendly rentals? How are the schools? Get important local information on the area you're most interested in.</div>
                </div>
            </div>
            <img src={LocalInfo} alt="" className="w-1/2 h-full object-cover" />
          </div>
        </div>
    );
};

export default BottomBanner;