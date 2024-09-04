import React, { FormEvent, useState } from "react";
import Counter from "../../../../components/Counter/Counter";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import { SquareCloseIcon } from "../../../../assets/icon/icon";
import UploadFileArea from "../UploadFileArea";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { createPost } from "../../../../store/slices/post.slice";

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
      className="fixed inset-0 flex items-center justify-center z-10"
      onSubmit={handleAddProperty}
    >
      <div
        className="fixed inset-0 bg-black opacity-80"
        onClick={togglePopup}
      />
      <div className="relative bg-white z-10 w-[70%] max-h-[95vh] overflow-y-scroll p-4 flex flex-col gap-5 rounded-md select-none">
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
        <div className="middle-part flex gap-[2%]">
          <LeftBlock
            purpose={purpose}
            setPriceField={setPriceField}
            setPurpose={setPurpose}
            title={title}
            setTitle={setTitle}
            setDistrict={setDistrict}
            district={district}
          />
          <MiddleBlock
            city={city}
            setCity={setCity}
            setPropertyType={setPropertyType}
            setSize={setSize}
            setCommune={setCommune}
            commune={commune}
          />
          <RightBlock
            address={address}
            setAddress={setAddress}
            setAllowPet={setAllowPet}
            setBathroom={setBathroom}
            allowPet={allowPet}
            setBedroomNumber={setBedroomNumber}
          />
        </div>
        <div className="flex gap-3">
          <div>
            <div>Longitude:</div>
            <input
              value={longitude}
              className="border-2 border-black rounded-md p-2"
              type="number"
              onChange={(e) => setLongitude(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <div>Latitude:</div>
            <input
              value={latitude}
              className="border-2 border-black rounded-md p-2"
              type="number"
              onChange={(e) => setLatitude(Number(e.target.value))}
              required
            />
          </div>
        </div>
        <div>
          <div>Description</div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-black rounded-md p-2 w-full max-h-[80px] min-h-[80px]"
          ></textarea>
        </div>
        <div>
          <UploadFileArea setFilesForUploading={setFilesForUploading} />
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
  setDistrict: (value: string) => void;
}

const LeftBlock = ({
  setPriceField,
  setPurpose,
  purpose,
  title,
  setTitle,
  setDistrict,
  district
}: ILeftBlockProps) => {
  return (
    <div className="block1 flex-1 flex flex-col gap-4">
      <div className="h-[100px] flex flex-col gap-1">
        <div>Do you want it to be rented or sold?</div>
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
            <div>Sell</div>
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
      <div>
        <div>District:</div>
        <input
          value={district}
          className="border-2 border-black rounded-md w-full p-2"
          type="text"
          onChange={(e) => setDistrict(e.target.value)}
          required
        />
      </div>
      <div>
        <div>Price (in VND):</div>
        <Counter setValue={setPriceField} noNeedBtn={true} />
      </div>
    </div>
  );
};

interface IMiddleBlockProps {
  setPropertyType: (value: string) => void;
  setSize: (value: number) => void;
  city: string;
  commune: string;
  setCity: (value: string) => void;
  setCommune: (value: string) => void;
}

const MiddleBlock = ({
  setPropertyType,
  setSize,
  city,
  setCity,
  setCommune,
  commune
}: IMiddleBlockProps) => {
  const dropdownValues = ["apartment", "house", "condo", "land"];
  return (
    <div className="block1 flex-1 flex flex-col gap-4">
      <div className="h-[100px]">
        <div>Property Type</div>
        <Dropdown
          chooseValue={setPropertyType}
          dropdownTitle="Choose property type"
          dropdownValues={dropdownValues}
        />
      </div>
      <div>
        <div>City:</div>
        <input
          className="border-2 border-black rounded-md w-full p-2"
          type="text"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <div>Commune:</div>
        <input
          className="border-2 border-black rounded-md w-full p-2"
          type="text"
          required
          value={commune}
          onChange={(e) => setCommune(e.target.value)}
        />
      </div>
      <div>
        <div>Size (in m²):</div>
        <Counter setValue={setSize} noNeedBtn={true} />
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
}

const RightBlock = ({
  setAllowPet,
  setBathroom,
  allowPet,
  address,
  setAddress,
  setBedroomNumber
}: IRightBlockProps) => {
  return (
    <div className="block1 flex-1 flex flex-col gap-4">
      <div className="h-[100px] flex flex-col gap-1">
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
      <div>
        <div>Address:</div>
        <input
          className="border-2 border-black rounded-md w-full p-2"
          type="text"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <div>Bathroom:</div>
        <div className="w-[130px]">
          <Counter setValue={setBathroom} />
        </div>
      </div>
      <div>
        <div>Bedroom:</div>
        <div className="w-[130px]">
          <Counter setValue={setBedroomNumber} />
        </div>
      </div>
    </div>
  );
};

export default AddPropertyPopUp;
