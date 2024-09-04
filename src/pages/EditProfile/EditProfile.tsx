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

const EditProfile = () => {
  const userProfile = useSelector(selectUserProfile).user;

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
    <div className="flex justify-center">
      <div
        className="w-[35%] mt-7 mb-[90px] flex flex-col gap-5 rounded-md p-5"
        style={{
          boxShadow:
            "rgba(125, 125, 125, 0.25) 0px 14px 28px, rgba(125, 125, 125, 0.25) 0px 10px 10px",
        }}
      >
        <div className="font-semibold text-[24px] text-secondaryYellow">
          My profile
        </div>
        <div>
          <div>Your avatar:</div>
          <div className="flex items-center gap-5">
            <input
              onChange={handleSelectFile}
              type="file"
              ref={inputFileRef}
              hidden
            />
            <img
              src={avatarField ? avatarField : AnonymousAvatar}
              className="aspect-square w-[100px] rounded-full object-cover"
              alt=""
            />
            <div
              onClick={() => inputFileRef.current?.click()}
              className="text-primaryYellow hover:text-secondaryYellow hover:underline font-semibold cursor-pointer"
            >
              Upload new avatar
            </div>
          </div>
        </div>
        <div className="">
          <div>Username</div>
          <input
            onChange={(e) => setUsernameField(e.target.value)}
            type="text"
            className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md hover:border-black"
            placeholder="Enter your username"
            value={usernameField}
          />
        </div>
        <div className="">
          <div>Email</div>
          <div className="select-none w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md cursor-not-allowed bg-gray-200">
            {userProfile.email}
          </div>
        </div>
        <div className="">
          <div>Phone number</div>
          <div className="select-none w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md cursor-not-allowed bg-gray-200">
            {userProfile.phonenumber}
          </div>
        </div>
        <div className="">
          <div>First name</div>
          <input
            onChange={(e) => setFirstNameField(e.target.value)}
            type="text"
            className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md hover:border-black"
            placeholder="Enter your first name"
            value={firstNameField}
          />
        </div>
        <div className="">
          <div>Last name</div>
          <input
            onChange={(e) => setLastNameField(e.target.value)}
            type="text"
            className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md hover:border-black"
            placeholder="Enter your last name"
            value={lastNameField}
          />
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
