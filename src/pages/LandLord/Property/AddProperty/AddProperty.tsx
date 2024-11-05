import React, { FormEvent, useState } from "react";
import Counter from "../../../../components/Counter/Counter";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import { SquareCloseIcon } from "../../../../assets/icon/icon";
import UploadFileArea from "../UploadFileArea";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { createPost } from "../../../../store/slices/post.slice";
import MapAutoComplete from "../../../../components/MapAutoComplete/MapAutoComplete";
import { toast } from "react-toastify";

interface IAddPropertyPopUpProps {
  togglePopup: () => void;
}

const AddPropertyPopUp = ({ togglePopup }: IAddPropertyPopUpProps) => {
  const [purpose, setPurpose] = useState("buy");
  const [title, setTitle] = useState("");
  const [priceField, setPriceField] = useState(0);
  const [bedroomNumber, setBedroomNumber] = useState(0);
  const [propertyType, setPropertyType] = useState("");
  const [size, setSize] = useState(0);
  const [allowPet, setAllowPet] = useState(false);
  const [bathroom, setBathroom] = useState(0);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [description, setDescription] = useState("");
  const [district, setDistrict] = useState("");
  const [commune, setCommune] = useState("");
  const [filesForUploading, setFilesForUploading] = useState<File[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const handleAddProperty = async (e: FormEvent) => {
    e.preventDefault();
    if(filesForUploading.length === 0){
      toast.warning("You need to upload at least 1 image");
      return;
    }
    if(priceField === 0){
      toast.warning("You must enter price of property");
      return;
    }
    if(size === 0){
      toast.warning("You must enter size of property");
      return;
    }
    if(bedroomNumber === 0){
      toast.warning("You must enter the number of bed room of property");
      return;
    }
    if(bathroom === 0){
      toast.warning("You must enter the number of bath room of property");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", description);
    formData.append("price", priceField.toString());
    filesForUploading.map((file) => {
      formData.append("images", file);
    });
    formData.append("address", address);
    formData.append("city", city);
    formData.append("pet", allowPet.toString());
    formData.append("size", size.toString());
    formData.append("bedroom", bedroomNumber.toString());
    formData.append("bathroom", bathroom.toString());
    formData.append("latitude", latitude.toString());
    formData.append("longitude", longitude.toString());
    formData.append("type", purpose);
    formData.append("property", propertyType);
    formData.append("district", district);
    formData.append("commune", commune);
    await dispatch(createPost({ formData: formData }));
    togglePopup();
  };

  return (
    <form
      className="fixed inset-0 flex items-center justify-center z-50"
      onSubmit={handleAddProperty}
    >
      <div
        className="fixed inset-0 bg-black opacity-80"
        onClick={togglePopup}
      />
      <div className="relative bg-white z-10 w-[70%] max-md:w-full max-h-[95vh] max-md:max-h-screen overflow-y-scroll p-4 flex flex-col gap-5 rounded-md max-md:rounded-none select-none">
        <div className="flex justify-between">
          <div className="text-[24px] font-semibold text-secondaryYellow">
            Add a new property
          </div>
          <div
            onClick={togglePopup}
            className="w-[35px] cursor-pointer hover:text-secondaryYellow"
          >
            <SquareCloseIcon className="w-full" />
          </div>
        </div>
        <div className="flex justify-center gap-3 items-center">
          <div>Add your property location:</div>
          <MapAutoComplete
            setCity={setCity}
            setCommune={setCommune}
            setDistrict={setDistrict}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
        </div>
        <div className="middle-part flex gap-[2%] max-sm:flex-col max-sm:gap-4">
          <LeftBlock
            priceField={priceField}
            purpose={purpose}
            setPriceField={setPriceField}
            setPurpose={setPurpose}
            title={title}
            setTitle={setTitle}
            district={district}
          />
          <MiddleBlock
            city={city}
            setPropertyType={setPropertyType}
            setSize={setSize}
            commune={commune}
            propertyType={propertyType}
            size={size}
          />
          <RightBlock
            address={address}
            setAddress={setAddress}
            setAllowPet={setAllowPet}
            setBathroom={setBathroom}
            allowPet={allowPet}
            setBedroomNumber={setBedroomNumber}
            latitude={latitude}
            longitude={longitude}
            bathroom={bathroom}
            bedroomNumber={bedroomNumber}
          />
        </div>
        <div>
          <div>Description</div>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-black rounded-md p-2 w-full max-h-[200px] min-h-[80px]"
            required
          ></textarea>
        </div>
        <div>
          <UploadFileArea filesForUploading={filesForUploading} setFilesForUploading={setFilesForUploading} />
        </div>
        <div className="flex justify-between">
          <div
            onClick={togglePopup}
            className="hover:underline cursor-pointer w-fit"
          >
            Cancel
          </div>
          <button
            type="submit"
            className="px-3 py-1 bg-primaryYellow hover:bg-lightYellow select-none cursor-pointer rounded-lg font-semibold"
          >
            Add new Property
          </button>
        </div>
      </div>
    </form>
  );
};

interface ILeftBlockProps {
  setPriceField: (value: number) => void;
  setPurpose: (value: string) => void;
  purpose: string;
  title: string;
  district: string;
  setTitle: (value: string) => void;
  priceField: number;
}

const LeftBlock = ({
  setPriceField,
  setPurpose,
  purpose,
  title,
  setTitle,
  district,
  priceField
}: ILeftBlockProps) => {
  return (
    <div className="block1 flex-1 flex flex-col gap-4">
      <div className="h-[100px] max-sm:h-fit flex flex-col gap-1">
        <div>Do you want it to be rented or purchased?</div>
        <div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="transactionType"
              value="rent"
              checked={purpose === "rent"}
              onChange={(e) => setPurpose(e.target.value)}
            />
            <div>Rent</div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="transactionType"
              value="buy"
              checked={purpose === "buy"}
              onChange={(e) => setPurpose(e.target.value)}
            />
            <div>Buy</div>
          </div>
        </div>
      </div>
      <div>
        <div>Property name:</div>
        <input
          value={title}
          className="border-2 border-black rounded-md w-full p-2"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-4 max-sm:flex-row">
        <div className="flex-1">
          <div>District:</div>
          <div className="border-2 border-black rounded-md w-full p-2 bg-grayLight2 min-h-[43px] cursor-not-allowed">
            {district}
          </div>
        </div>
        <div className="flex-1">
          <div>Price (in VND):</div>
          <Counter defaultValue={priceField} setValue={setPriceField} noNeedBtn={true} />
        </div>
      </div>
    </div>
  );
};

interface IMiddleBlockProps {
  setPropertyType: (value: string) => void;
  setSize: (value: number) => void;
  city: string;
  commune: string;
  propertyType: string;
  size: number;
}

const MiddleBlock = ({
  setPropertyType,
  setSize,
  city,
  commune,
  propertyType,
  size
}: IMiddleBlockProps) => {
  const dropdownValues = ["apartment", "house", "condo", "land"];
  return (
    <div className="block1 flex-1 flex flex-col gap-4">
      <div className="h-[100px] max-sm:h-fit flex flex-col gap-1">
        <div>
          <div>Property Type</div>
          <Dropdown
            chooseValue={setPropertyType}
            dropdownValues={dropdownValues}
          />
        </div>
        {!propertyType && (
          <div className="text-[13px] font-semibold text-red-600">
            *You have to choose property type
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 max-sm:flex-row">
        <div className="flex-1">
          <div>City:</div>
          <div className="border-2 border-black rounded-md w-full p-2 bg-grayLight2 min-h-[43px] cursor-not-allowed">
            {city}
          </div>
        </div>
        <div className="flex-1">
          <div>Commune:</div>
          <div className="border-2 border-black rounded-md w-full p-2 bg-grayLight2 min-h-[43px] cursor-not-allowed">
            {commune}
          </div>
        </div>
      </div>
      <div>
        <div>Acreage (in m²):</div>
        <Counter defaultValue={size} setValue={setSize} noNeedBtn={true} />
      </div>
    </div>
  );
};

interface IRightBlockProps {
  setAllowPet: (value: boolean) => void;
  setBathroom: (value: number) => void;
  allowPet: boolean;
  address: string;
  setAddress: (value: string) => void;
  setBedroomNumber: (value: number) => void;
  longitude: number;
  latitude: number;
  bedroomNumber: number;
  bathroom: number;
}

const RightBlock = ({
  setAllowPet,
  setBathroom,
  allowPet,
  address,
  setAddress,
  setBedroomNumber,
  longitude,
  latitude,
  bedroomNumber,
  bathroom
}: IRightBlockProps) => {
  return (
    <div className="block1 flex-1 flex flex-col gap-4">
      <div className="flex flex-col gap-4 max-sm:flex-row">
        <div className="h-[100px] max-sm:h-fit flex flex-col gap-1 flex-1">
          <div>Do you allow renter to have pets in the property?</div>
          <div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="petAllowed"
                className="text-secondaryYellow"
                checked={allowPet}
                onChange={() => setAllowPet(true)}
              />
              <div>Yes</div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="petAllowed"
                checked={!allowPet}
                onChange={() => setAllowPet(false)}
              />
              <div>No</div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div>Address:</div>
          <input
            className="border-2 border-black rounded-md w-full p-2"
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div>
          <div>Bathroom:</div>
          <div className="w-[130px]">
            <Counter defaultValue={bathroom} setValue={setBathroom} />
          </div>
        </div>
        <div className="flex-1">
          <div>Longitude:</div>
          <div className="border-2 border-black rounded-md p-2 cursor-not-allowed bg-grayLight2">
            {longitude}
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <div>
          <div>Bedroom:</div>
          <div className="w-[130px]">
            <Counter defaultValue={bedroomNumber} setValue={setBedroomNumber} />
          </div>
        </div>
        <div className="flex-1">
          <div>Latitude:</div>
          <div className="border-2 border-black rounded-md p-2 cursor-not-allowed bg-grayLight2">
            {latitude}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyPopUp;
