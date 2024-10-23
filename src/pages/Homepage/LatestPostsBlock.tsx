import React from "react";
import { useSelector } from "react-redux";
import { selectLatestPosts } from "../../store/slices/post.slice";
import { formatMoney } from "../../store/slices/app.slice";
import DemoProperty from "../../assets/images/demo-property.jpg";

const LatestPostsBlock = () => {
  const latestPosts = useSelector(selectLatestPosts);
  return (
    <div className="block2 max-md:px-6 flex justify-center">
      <div className="w-[85%] max-md:w-full flex flex-col gap-5">
        <div className="text-[24px] font-bold">Latest Properties</div>
        <div>
          <div className="flex w-full gap-[1%] xl:flex-wrap xl:gap-y-4 max-w-full overflow-x-scroll">
            {latestPosts.map((item) => (
              <div key={item.id} className="w-[248px] p-4 bg-grayLight1 flex flex-col gap-[10px] hover:bg-grayLight2 rounded-xl hover:-translate-y-1 hover:shadow-xl duration-100 border">
                <img
                  style={{ aspectRatio: "3/2", maxWidth:"none" }}
                  className="xl:w-full object-cover rounded-md"
                  src={
                    item.images.length > 0 ? item.images[0].path : DemoProperty
                  }
                  alt=""
                />
                <div className="text-[19px]">
                  {formatMoney(item.price)}
                  <span className="text-green-700 font-semibold"> ₫</span>
                </div>
                <div className="text-secondaryYellow text-[24px] font-bold truncate">
                  {item.title}
                </div>
                <div className="flex justify-between items-center flex-wrap font-semibold">
                  <div className="text-[11px]">{item.commune}, {item.district}, {item.city}</div>
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
