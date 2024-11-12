import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import AnonymousAvatar from "../../assets/images/anonymous-avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile, IEditProfileReq, selectUserProfile } from "../../store/slices/auth.slice";
import SaveCancelPopup from "../../components/SaveCancelPopup/SaveCancelPopup";
import { AppDispatch } from "../../store";
import { handleUploadFile } from "../../store/slices/app.slice";
import { IUploadedImage } from "../../interfaces/uploadedImage.interface";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";

const EditProfile = () => {
  const userProfile = useSelector(selectUserProfile);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [avatarField, setAvatarField] = useState(userProfile.avatar);
  const [usernameField, setUsernameField] = useState(userProfile.username);
  const [firstNameField, setFirstNameField] = useState(userProfile.firstName);
  const [lastNameField, setLastNameField] = useState(userProfile.lastName);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSelectFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      try {
        const resultAction = await dispatch(handleUploadFile({ formData }));
        const image: IUploadedImage = unwrapResult(resultAction);
        setAvatarField(image.url);
        e.target.value = "";
      } catch (err) {
        console.error("Failed to upload the file: ", err);
      }
    }
  };

  useEffect(() => {
    const hasChanges = 
      usernameField !== userProfile.username ||
      firstNameField !== userProfile.firstName ||
      lastNameField !== userProfile.lastName ||
      avatarField !== userProfile.avatar;
    setHasChanges(hasChanges);
  }, [avatarField, firstNameField, lastNameField, usernameField, userProfile]);

  const handleCancelChanges = () => {
    setUsernameField(userProfile.username);
    setFirstNameField(userProfile.firstName);
    setLastNameField(userProfile.lastName);
    setAvatarField(userProfile.avatar);
    setHasChanges(false);
  };

  const handleEditUserProfile = async () => {
    const dataForUpdate: IEditProfileReq = {
      avatar: avatarField as string,
      firstName: firstNameField,
      lastName: lastNameField,
      username: usernameField,
    };
    await dispatch(editUserProfile(dataForUpdate));
    setHasChanges(false);
  };

  const InputField = ({ label, value, onChange, placeholder, disabled = false }: any) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`
          block w-full rounded-md border-0 py-1.5 px-3
          ${disabled 
            ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
            : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-600'
          }
          placeholder:text-gray-400
          sm:text-sm sm:leading-6
        `}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
            <h3 className="text-2xl font-semibold leading-6 text-gray-900">
              Profile Settings
            </h3>
            <button
              onClick={() => navigate("changePassword")}
              className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Change Password
            </button>
          </div>

          <div className="px-4 py-5 sm:p-6 space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
              <input
                onChange={handleSelectFile}
                type="file"
                ref={inputFileRef}
                hidden
                accept="image/*"
              />
              <img
                src={avatarField || AnonymousAvatar}
                className="h-20 w-20 rounded-full object-cover ring-2 ring-amber-600"
                alt="Profile"
              />
              <div>
                <button
                  onClick={() => inputFileRef.current?.click()}
                  className="text-sm font-medium text-amber-600 hover:text-amber-700"
                >
                  Change avatar
                </button>
                <p className="mt-1 text-xs text-gray-500">
                  JPG, PNG or GIF. Maximum size of 2MB.
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <InputField
                label="First Name"
                value={firstNameField}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstNameField(e.target.value)}
                placeholder="Enter first name"
              />
              
              <InputField
                label="Last Name"
                value={lastNameField}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastNameField(e.target.value)}
                placeholder="Enter last name"
              />
              
              <InputField
                label="Username"
                value={usernameField}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsernameField(e.target.value)}
                placeholder="Enter username"
              />
              
              <InputField
                label="Email"
                value={userProfile.email}
                disabled={true}
              />
              
              <InputField
                label="Phone Number"
                value={userProfile.phonenumber || "Not provided"}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>

      {hasChanges && (
        <SaveCancelPopup
          handleCancel={handleCancelChanges}
          handleSave={handleEditUserProfile}
        />
      )}
    </div>
  );
};

export default EditProfile;
