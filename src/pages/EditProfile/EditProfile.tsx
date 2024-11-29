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
import { toast } from "react-toastify";

const EditProfile = () => {
  const userProfile = useSelector(selectUserProfile);
  const navigate = useNavigate();
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
    if(!firstNameField || !lastNameField || !usernameField){
      toast.warning("You must enter all required fields")
      return;
    }
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
    <div className="flex justify-center bg-grayLight1 min-h-screen">
      <div
        className="w-[35%] mt-7 mb-[90px] flex flex-col gap-5 rounded-md p-5 max-lg:w-[65%] max-sm:w-[80%] bg-white max-h-fit"
        style={{
          boxShadow:
            "rgba(125, 125, 125, 0.25) 0px 14px 28px, rgba(125, 125, 125, 0.25) 0px 10px 10px",
        }}
      >
        <div className="flex justify-between items-center">
          <div className="font-semibold text-[24px] text-secondaryYellow">
            My profile
          </div>
          <div
            onClick={() => navigate("changePassword")}
            className="font-semibold px-3 py-2 bg-primaryYellow hover:bg-yellow-500 cursor-pointer select-none rounded-sm"
          >
            Change password
          </div>
        </div>
        <div className="border-y-2 py-2">
          <div className="flex items-center gap-5">
            <input
              onChange={handleSelectFile}
              type="file"
              ref={inputFileRef}
              hidden
            />
            <img
              src={avatarField ? avatarField : AnonymousAvatar}
              className="aspect-square w-[100px] rounded-full object-cover border-2"
              alt=""
            />
            <div>
              <div
                onClick={() => inputFileRef.current?.click()}
                className="text-primaryYellow hover:text-secondaryYellow hover:underline font-semibold cursor-pointer"
              >
                Upload new avatar
              </div>
              <div className="text-darkGray text-[12px]">Click here to upload your new avatar</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-[48%]">
            <div>First name</div>
            <input
              onChange={(e) => setFirstNameField(e.target.value)}
              type="text"
              className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md focus:border-secondaryYellow"
              placeholder="First name"
              value={firstNameField}
            />
          </div>
          <div className="w-[48%]">
            <div>Last name</div>
            <input
              onChange={(e) => setLastNameField(e.target.value)}
              type="text"
              className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md focus:border-secondaryYellow"
              placeholder="Last name"
              value={lastNameField}
            />
          </div>
        </div>
        <div className="">
          <div>Username</div>
          <input
            onChange={(e) => setUsernameField(e.target.value)}
            type="text"
            className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md focus:border-secondaryYellow"
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
            {userProfile.phonenumber ? userProfile.phonenumber : <span className="text-gray-400 font-semibold">Not included</span>}
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
