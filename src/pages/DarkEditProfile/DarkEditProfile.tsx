import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import AnonymousAvatar from "../../assets/images/anonymous-avatar.png";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserProfile,
  IEditProfileReq,
  selectUserProfile,
} from "../../store/slices/auth.slice";
import SaveCancelPopup from "../../components/SaveCancelPopup/SaveCancelPopup";
import { AppDispatch } from "../../store";
import { handleUploadFile } from "../../store/slices/app.slice";
import { IUploadedImage } from "../../interfaces/uploadedImage.interface";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";

const DarkEditProfile = () => {
  const userProfile = useSelector(selectUserProfile);
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();

  const [avatarField, setAvatarField] = useState(userProfile.avatar);
  const [usernameField, setUsernameField] = useState(userProfile.username);
  const [firstNameField, setFirstNameField] = useState(userProfile.firstName);
  const [lastNameField, setLastNameField] = useState(userProfile.lastName);

  const [hasChanges, setHasChanges] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSelectFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      try {
        const resultAction = await dispatch(
          handleUploadFile({ formData: formData })
        );
        const image: IUploadedImage = unwrapResult(resultAction);
        setAvatarField(image.url);
        e.target.value = "";
      } catch (err) {
        console.error("Failed to upload the file: ", err);
      }
    }
  };

  useEffect(() => {
    const computeHasChanges =
      usernameField !== userProfile.username ||
      firstNameField !== userProfile.firstName ||
      lastNameField !== userProfile.lastName ||
      avatarField !== userProfile.avatar;
    if (computeHasChanges) {
      setHasChanges(true);
    }
  }, [
    avatarField,
    firstNameField,
    lastNameField,
    userProfile.avatar,
    userProfile.firstName,
    userProfile.lastName,
    userProfile.username,
    usernameField,
  ]);

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

  return (
    <div className="flex justify-center bg-bgDarkPrimary min-h-screen">
      <div className="text-grayLight2 w-[35%] mt-7 mb-[90px] h-fit flex flex-col gap-5 rounded-md p-5 max-lg:w-[65%] max-sm:w-[80%] bg-bgLeftNavbar">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-[24px] text-secondaryYellow">
            My profile
          </div>
          <div
            onClick={() => navigate("changePassword")}
            className="font-semibold px-3 py-2 bg-primaryYellow hover:bg-secondaryYellow cursor-pointer select-none text-black rounded-sm"
          >
            Change password
          </div>
        </div>
        <div className="border-y-2 py-2 border-gray-500">
          <div className="flex items-center gap-5">
            <input
              onChange={handleSelectFile}
              type="file"
              ref={inputFileRef}
              hidden
            />
            <img
              src={avatarField ? avatarField : AnonymousAvatar}
              className="aspect-square w-[100px] rounded-full object-cover border-2 border-gray-400"
              alt=""
            />
            <div>
              <div
                onClick={() => inputFileRef.current?.click()}
                className="text-primaryYellow hover:text-secondaryYellow hover:underline font-semibold cursor-pointer"
              >
                Upload new avatar
              </div>
              <div className="text-gray1 text-[12px]">Click here to upload your new avatar</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-[48%]">
            <div>First name</div>
            <input
              onChange={(e) => setFirstNameField(e.target.value)}
              type="text"
              className="w-full py-[10px] px-[14px] rounded-md bg-bgDarkPrimary"
              placeholder="Enter your first name"
              value={firstNameField}
            />
          </div>
          <div className="w-[48%]">
            <div>Last name</div>
            <input
              onChange={(e) => setLastNameField(e.target.value)}
              type="text"
              className="w-full py-[10px] px-[14px] rounded-md bg-bgDarkPrimary"
              placeholder="Enter your last name"
              value={lastNameField}
            />
          </div>
        </div>
        <div className="">
          <div>Username</div>
          <input
            onChange={(e) => setUsernameField(e.target.value)}
            type="text"
            className="w-full py-[10px] px-[14px] rounded-md bg-bgDarkPrimary"
            placeholder="Enter your username"
            value={usernameField}
          />
        </div>
        <div className="">
          <div>Email</div>
          <div className="select-none w-full py-[10px] px-[14px] rounded-md cursor-not-allowed bg-bgDarkSecondary">
            {userProfile.email}
          </div>
        </div>
        <div className="">
          <div>Phone number</div>
          <div className="select-none w-full py-[10px] px-[14px] rounded-md cursor-not-allowed bg-bgDarkSecondary">
            {userProfile.phonenumber}
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

export default DarkEditProfile;
