import { icon } from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import mapMaker from "../../../assets/images/house-pin.png";
import { IPost } from "../../../interfaces/post.interface";
import demoProperty from "../../../assets/images/demo-property.jpg";
import { useNavigate } from "react-router";
import { formatMoney } from "../../../store/slices/app.slice";

interface IMapBlockProps {
  allPublishPosts: IPost[];
}

const MapBlock = ({ allPublishPosts }: IMapBlockProps) => {
  const position: [number, number] = [16.702463, 105.739324];
  return (
    <div className="lg:flex-1 z-10  h-[calc(100vh-116px)] min-h-[500px] max-lg:h-[300px] lg:sticky lg:top-[90px]">
      <div className="w-full h-full p-3 bg-white rounded-md">
        <MapContainer
          center={position}
          zoom={5}
          scrollWheelZoom={true}
          className="w-full h-full "
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {allPublishPosts.map((post) => (
            <div key={post.id}>
              <Pin post={post} />
            </div>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

interface IPinProps {
  post: IPost;
}

const Pin = ({ post }: IPinProps) => {
  const navigate = useNavigate();
  const postPosition: [number, number] = [post.latitude, post.longitude];
  const ICON = icon({
    iconUrl: mapMaker,
    iconSize: [40, 40],
  });
  return (
    <Marker position={postPosition} icon={ICON}>
      <Popup>
        <div
          onClick={() => navigate(post.id)}
          className="w-fit flex flex-col gap-2 cursor-pointer"
        >
          <img
            src={post.images.length > 0 ? post.images[0].path : demoProperty}
            alt=""
          />
          <div className="text-[12px] text-center">
            <div className="font-semibold text-[14px]">{post.title}</div>
            <div>{post.bathroom} bathrooms</div>
            <div>{post.bedroom} bedrooms</div>
            <div className="font-semibold text-[14px] text-green-600">
              {formatMoney(post.price)}₫
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default MapBlock;
