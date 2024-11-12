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

  const validatePropertyForm = (
    propertyType: string,
    title: string,
    priceField: number,
    size: number,
    bedroomNumber: number,
    bathroom: number,
    description: string,
    address: string,
    city: string,
    district: string,
    commune: string,
    filesForUploading: File[]
  ) => {
    if (!propertyType) {
      toast.error("Please select a property type");
      return false;
    }

    if (!title.trim()) {
      toast.error("Property name is required");
      return false;
    }

    if (priceField <= 0) {
      toast.error("Price must be greater than 0");
      return false;
    }

    if (size <= 0) {
      toast.error("Acreage must be greater than 0");
      return false;
    }

    if (bedroomNumber < 0) {
      toast.error("Number of bedrooms cannot be negative");
      return false;
    }

    if (bathroom < 0) {
      toast.error("Number of bathrooms cannot be negative");
      return false;
    }

    if (!description.trim()) {
      toast.error("Property description is required");
      return false;
    }

    if (!address.trim()) {
      toast.error("Property address is required");
      return false;
    }

    if (!city || !district || !commune) {
      toast.error("Please select a complete location (City, District, and Commune)");
      return false;
    }

    if (filesForUploading.length === 0) {
      toast.error("Please upload at least one image");
      return false;
    }

    const invalidImages = filesForUploading.some(file => !file.type.includes("image"));
    if (invalidImages) {
      toast.error("Only image files are allowed");
      return false;
    }

    return true;
  };

  const handleAddProperty = async (e: FormEvent) => {
    e.preventDefault();

    const isValid = validatePropertyForm(
      propertyType,
      title,
      priceField,
      size,
      bedroomNumber,
      bathroom,
      description,
      address,
      city,
      district,
      commune,
      filesForUploading
    );

    if (!isValid) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", description);
    formData.append("price", priceField.toString());
    filesForUploading.forEach((file) => {
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

    try {
      const createPostResult = await dispatch(createPost({ formData: formData }));
      const isCreatePostSuccessful = createPost.fulfilled.match(createPostResult);
      if (isCreatePostSuccessful) {
        toast.success("Property added successfully");
        togglePopup();
      }
    } catch (error) {
      toast.error("Failed to add property. Please try again.");
    }
  };

  return (
    <form
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm"
      onSubmit={handleAddProperty}
    >
      <div
        className="absolute inset-0"
        onClick={togglePopup}
      />
      <div className="relative bg-white z-10 w-[80%] max-lg:w-[95%] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white px-8 py-6 border-b flex justify-between items-center z-20">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Add New Property
          </h2>
          <button
            type="button"
            onClick={togglePopup}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
          >
            <SquareCloseIcon className="w-6 h-6 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        <div className="px-8 py-6 space-y-8">
          {/* Location Section */}
          <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-800">Location Details</h3>
                <p className="text-sm text-gray-500">Select the property location on the map</p>
              </div>
              <MapAutoComplete
                setCity={setCity}
                setCommune={setCommune}
                setDistrict={setDistrict}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
              />
            </div>
          </div>

          {/* Main Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <LeftBlock
                priceField={priceField}
                purpose={purpose}
                setPriceField={setPriceField}
                setPurpose={setPurpose}
                title={title}
                setTitle={setTitle}
                district={district}
              />
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <MiddleBlock
                city={city}
                setPropertyType={setPropertyType}
                setSize={setSize}
                commune={commune}
                propertyType={propertyType}
                size={size}
              />
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm">
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
          </div>

          {/* Description Section */}
          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-3">
            <label className="block">
              <span className="text-lg font-semibold text-gray-800">Property Description</span>
              <p className="text-sm text-gray-500 mt-1">Provide a detailed description of your property</p>
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Describe your property..."
              required
            />
          </div>

          {/* Upload Section */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="space-y-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Property Images</h3>
              <p className="text-sm text-gray-500">Upload high-quality images of your property</p>
            </div>
            <UploadFileArea
              filesForUploading={filesForUploading}
              setFilesForUploading={setFilesForUploading}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white px-8 py-6 border-t flex justify-between items-center gap-4">
          <button
            type="button"
            onClick={togglePopup}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 font-medium shadow-sm"
          >
            Add Property
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
  priceField,
}: ILeftBlockProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property name</label>
            <input
              value={title}
              className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
              type="text"
              placeholder="Enter property name"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
              <div className="flex items-center border border-gray-200 rounded-lg p-3 bg-gray-50">
                <span className="text-gray-500">{district || 'Not selected'}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
                <span className="text-gray-400 text-xs ml-1">(VND)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={priceField}
                  onChange={(e) => setPriceField(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter price"
                  min="0"
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  VND
                </div>
              </div>
            </div>
          </div>
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
  size,
}: IMiddleBlockProps) => {
  const dropdownValues = ["apartment", "house", "condo", "land"];
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Property Details</h3>
      
      {/* Property Type section */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Property Type
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {dropdownValues.map((value) => (
            <label 
              key={value} 
              className={`flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded-md transition-colors
                ${propertyType === value ? 'bg-blue-50 border border-blue-200' : ''}
              `}
            >
              <input
                type="radio"
                name="propertyType"
                value={value}
                checked={propertyType === value}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                required
              />
              <span className="text-gray-600 capitalize">{value}</span>
            </label>
          ))}
        </div>
        {!propertyType && (
          <p className="text-sm text-red-500 mt-1">
            Please select a property type
          </p>
        )}
      </div>

      {/* Location Details */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <div className="flex items-center border border-gray-200 rounded-lg p-3 bg-gray-50">
              <span className="text-gray-500">{city || 'Not selected'}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Commune</label>
            <div className="flex items-center border border-gray-200 rounded-lg p-3 bg-gray-50">
              <span className="text-gray-500">{commune || 'Not selected'}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Acreage
            <span className="text-gray-400 text-xs ml-1">(m²)</span>
          </label>
          <div className="relative">
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter size"
              min="0"
              required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              m²
            </div>
          </div>
        </div>
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
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <label className="text-gray-700 font-medium">Pet Policy</label>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="petAllowed"
              checked={allowPet}
              onChange={() => setAllowPet(true)}
              className="w-4 h-4 text-primaryYellow focus:ring-primaryYellow"
            />
            <span className="text-gray-600">Pets Allowed</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="petAllowed"
              checked={!allowPet}
              onChange={() => setAllowPet(false)}
              className="w-4 h-4 text-primaryYellow focus:ring-primaryYellow"
            />
            <span className="text-gray-600">No Pets</span>
          </label>
        </div>
      </div>

      <div>
        <label className="text-gray-700 font-medium">Address</label>
        <input
          className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primaryYellow focus:border-transparent transition-all"
          type="text"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bathroom</label>
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => bathroom > 0 && setBathroom(bathroom - 1)}
              className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-l-lg transition-colors"
            >
              -
            </button>
            <input
              type="number"
              value={bathroom}
              onChange={(e) => setBathroom(Number(e.target.value))}
              className="w-full text-center border-x border-gray-200 py-2 focus:outline-none"
              min="0"
            />
            <button
              type="button"
              onClick={() => setBathroom(bathroom + 1)}
              className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-r-lg transition-colors"
            >
              +
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
          <div className="flex items-center border border-gray-200 rounded-lg p-3 bg-gray-50">
            <span className="text-gray-500">{longitude}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bedroom</label>
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => bedroomNumber > 0 && setBedroomNumber(bedroomNumber - 1)}
              className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-l-lg transition-colors"
            >
              -
            </button>
            <input
              type="number"
              value={bedroomNumber}
              onChange={(e) => setBedroomNumber(Number(e.target.value))}
              className="w-full text-center border-x border-gray-200 py-2 focus:outline-none"
              min="0"
            />
            <button
              type="button"
              onClick={() => setBedroomNumber(bedroomNumber + 1)}
              className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-r-lg transition-colors"
            >
              +
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
          <div className="flex items-center border border-gray-200 rounded-lg p-3 bg-gray-50">
            <span className="text-gray-500">{latitude}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyPopUp;
