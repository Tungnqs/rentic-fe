import React from "react";
import { useSelector } from "react-redux";
import { selectLatestPosts } from "../../store/slices/post.slice";
import { formatMoney } from "../../store/slices/app.slice";
import DemoProperty from "../../assets/images/demo-property.jpg";
import { BreakPoint } from "../../interfaces";
import { BathIcon, BedIcon, HeartFillIcon, ResizeIcon } from "../../assets/icon/icon";
import { useNavigate } from "react-router";

const LatestPostsBlock = () => {
  const latestPosts = useSelector(selectLatestPosts);
  const navigate = useNavigate();

  return (
    <div className="block2 max-md:px-6 flex justify-center">
      <div className={`w-[85%] max-md:w-full flex flex-col gap-5 max-w-[${BreakPoint.xl}]`}>
        <div className="text-[24px] font-bold">Latest Properties</div>
        <div className="p-3">
          <div className="flex w-full gap-[1%] xl:flex-wrap xl:gap-y-3 max-w-full max-xl:overflow-x-scroll">
            {latestPosts.map((item) => (
              <div onClick={()=>navigate(`/post-detail/${item.id}`)} key={item.id} className="cursor-pointer max-xl:w-[280px] w-[24.2%] relative border-2 rounded-2xl hover:-translate-y-1 hover:shadow-xl hover:bg-gray-50 duration-100">
                <div className={`absolute top-4 right-4 ${item.type === "buy" ? "bg-primaryYellow" : "bg-green-500 text-white" }  text-[14px] font-medium rounded-2xl px-2 py-[2px]`}>{item.type === "buy" ? "For Sale" : "For Rent"}</div>
                <img src={item.images.length > 0 ? item.images[0].path : DemoProperty} className="xl:h-48 object-cover rounded-t-2xl max-xl:max-w-none w-full max-xl:w-[280px] aspectPostImg" alt="" />
                <div className="p-4 flex flex-col gap-3 w-full">
                  <div className="text-[20px] font-bold">{item.title}</div>
                  <div className="text-darkGray truncate">{item.commune}, {item.district}, {item.city}</div>
                  <div className="flex gap-3 flex-wrap">
                    <div className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded">
                      <BedIcon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">{item.bedroom}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded">
                      <BathIcon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">{item.bathroom}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded">
                      <ResizeIcon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">{item.size}m²</span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <HeartFillIcon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">{item.savedPosts?.length}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2 truncate">
                    <div className="text-secondaryYellow text-[24px] font-bold">{formatMoney(item.price)}₫</div>
                    <div className="max-xl:hidden">View Details →</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestPostsBlock;
