import React, { FormEvent, useEffect, useState } from "react";
import Counter from "../../../../components/Counter/Counter";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import { SquareCloseIcon } from "../../../../assets/icon/icon";
import UploadFileArea from "../UploadFileArea";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import MapAutoComplete from "../../../../components/MapAutoComplete/MapAutoComplete";
import { IPost } from "../../../../interfaces/post.interface";
import { editPost } from "../../../../store/slices/post.slice";

interface IEditPropertyProps {
  togglePopup: () => void;
  currentPostData: IPost;
}

const EditProperty = ({ togglePopup, currentPostData }: IEditPropertyProps) => {
  const [purpose, setPurpose] = useState(currentPostData.type);
  const [title, setTitle] = useState(currentPostData.title);
  const [priceField, setPriceField] = useState(currentPostData.price);
  const [bedroomNumber, setBedroomNumber] = useState(
    currentPostData.bedroom as number
  );
  const [propertyType, setPropertyType] = useState(currentPostData.property);
  const [size, setSize] = useState(currentPostData.size as number);
  const [allowPet, setAllowPet] = useState(currentPostData.pet as boolean);
  const [bathroom, setBathroom] = useState(currentPostData.bathroom as number);
  const [city, setCity] = useState(currentPostData.city);
  const [address, setAddress] = useState(currentPostData.address);
  const [longitude, setLongitude] = useState(currentPostData.longitude);
  const [latitude, setLatitude] = useState(currentPostData.latitude);
  const [description, setDescription] = useState(currentPostData.desc);
  const [district, setDistrict] = useState(currentPostData.district);
  const [commune, setCommune] = useState(currentPostData.commune);
  const [filesForUploading, setFilesForUploading] = useState<File[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const convertToBlob = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  };

  const createFileObject = async (url: string, filename: string) => {
    const blob = await convertToBlob(url);

    // Derive the file type from the file extension
    const fileExtension = filename.split(".").pop()?.toLowerCase();
    let fileType = "";

    switch (fileExtension) {
      case "jpg":
      case "jpeg":
        fileType = "image/jpeg";
        break;
      case "png":
        fileType = "image/png";
        break;
      case "webp":
        fileType = "image/webp";
        break;
      default:
        fileType = "application/octet-stream";
    }

    return new File([blob], filename, { type: fileType });
  };

  useEffect(() => {
    const fetchFiles = async () => {
      const existedFiles: File[] = [];
      for (const image of currentPostData.images) {
        if (!image.path.toLowerCase().endsWith(".gif")) {
          const imageFile = await createFileObject(image.path, image.name);
          existedFiles.push(imageFile);
        }
      }
      setFilesForUploading([...existedFiles]);
    };

    fetchFiles();
  }, [currentPostData]);

  const handleEditProperty = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", description);
    formData.append("price", priceField.toString());
    console.log("filesForUploading on submit: ", filesForUploading);
    filesForUploading.forEach((item) => {
      formData.append("images", item);
    });
    console.log(formData.get("images"));
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
    await dispatch(
      editPost({ formData: formData, postId: currentPostData.id })
    );
    togglePopup();
  };

  return (
    <form
      className="fixed inset-0 flex items-center justify-center z-20"
      onSubmit={handleEditProperty}
    >
      <div
        className="fixed inset-0 bg-black opacity-80"
        onClick={togglePopup}
      />
      <div className="relative bg-white z-10 w-[70%] max-md:w-full max-h-[95vh] max-md:max-h-screen overflow-y-scroll p-4 flex flex-col gap-5 rounded-md max-md:rounded-none select-none">
        <div className="flex justify-between">
          <div className="text-[24px] font-semibold text-secondaryYellow">
            Editing {currentPostData.title}
          </div>
          <div
            onClick={togglePopup}
            className="w-[35px] cursor-pointer hover:text-secondaryYellow"
          >
            <SquareCloseIcon className="w-full" />
          </div>
        </div>
        <div className="flex justify-center gap-3 items-center">
          <div>Insert new property-location:</div>
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
            size={size as number}
            city={city}
            setPropertyType={setPropertyType}
            setSize={setSize}
            commune={commune}
            propertyType={propertyType}
          />
          <RightBlock
            address={address}
            setAddress={setAddress}
            setAllowPet={setAllowPet}
            bathroom={bathroom as number}
            setBathroom={setBathroom}
            allowPet={allowPet}
            bedroomNumber={bedroomNumber as number}
            setBedroomNumber={setBedroomNumber}
            latitude={latitude}
            longitude={longitude}
          />
        </div>
        <div>
          <div>Description</div>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-black rounded-md p-2 w-full max-h-[200px] min-h-[80px]"
          ></textarea>
        </div>
        <div>
          <UploadFileArea
            filesForUploading={filesForUploading}
            setFilesForUploading={setFilesForUploading}
          />
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
            Update this property
          </button>
        </div>
      </div>
    </form>
  );
};

interface ILeftBlockProps {
  priceField: number;
  setPriceField: (value: number) => void;
  setPurpose: (value: string) => void;
  purpose: string;
  title: string;
  district: string;
  setTitle: (value: string) => void;
}

const LeftBlock = ({
  setPriceField,
  setPurpose,
  purpose,
  title,
  setTitle,
  district,
  priceField,
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
          <Counter
            defaultValue={priceField}
            setValue={setPriceField}
            noNeedBtn={true}
          />
        </div>
      </div>
    </div>
  );
};

interface IMiddleBlockProps {
  setPropertyType: (value: string) => void;
  size: number;
  setSize: (value: number) => void;
  city: string;
  commune: string;
  propertyType: string;
}

const MiddleBlock = ({
  setPropertyType,
  size,
  setSize,
  city,
  commune,
  propertyType,
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
  bathroom,
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

export default EditProperty;
