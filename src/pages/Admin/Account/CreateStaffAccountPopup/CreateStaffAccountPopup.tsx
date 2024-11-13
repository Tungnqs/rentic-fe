import React, { FormEvent, useState } from "react";
import {
  HidePasswordIcon,
  ShowPasswordIcon,
} from "../../../../assets/icon/icon";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { createStaffAccount } from "../../../../store/slices/admin.slice";

interface ICreateStaffAccountPopupProps {
  togglePopup: () => void;
}

const CreateStaffAccountPopup = ({
  togglePopup,
}: ICreateStaffAccountPopupProps) => {
    const dispatch = useDispatch<AppDispatch>();
  const roleDropDownValues = ["Moderator", "Admin"];
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [firstNameField, setFirstNameField] = useState("");
  const [lastNameField, setLastNameField] = useState("");
  const [usernameField, setUsernameField] = useState("");
  const [pswField, setPswField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [phoneField, setPhoneField] = useState("");
  const [roleField, setRoleField] = useState("");

  const handleCreateAccount = async (e: FormEvent) => {
    e.preventDefault();

    if(phoneField.length !== 10){
      toast.warning("Phone number must be 10 character!")
      return
    };
    if(!phoneField.startsWith("0")){
      toast.warning("Phone number must start with 0 (Vietnam phone number)")
      return;
    }

    const submitPhoneData = phoneField.replace(/^0/, "+84");

    const registerResult = await dispatch(
        createStaffAccount({
        firstName: firstNameField,
        lastName: lastNameField,
        email: emailField,
        password: pswField,
        phonenumber: submitPhoneData,
        username: usernameField,
        role: roleField,
      })
    );
    const isRegistered = createStaffAccount.fulfilled.match(registerResult);
    if (isRegistered) {
        togglePopup();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 rounded-md text-grayLight2 text-sm">
      <div
        className="fixed inset-0 bg-black opacity-80"
        onClick={togglePopup}
      />
      <form onSubmit={handleCreateAccount} className="relative z-10 w-[400px] max-h-[95vh] flex flex-col select-none">
        <div className="flex flex-col gap-4 bg-bgDarkPopupBody pb-4 rounded-t-md">
          <div className="font-semibold text-[24px] px-4 pt-4">
            Create Staff Account
          </div>
          <div className="px-4 flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div>Username</div>
              <input
                type="text"
                className="rounded-md bg-darkInput w-full py-[10px] px-[14px]"
                required
                value={usernameField}
                onChange={(e) => setUsernameField(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div>Email</div>
              <input
                type="email"
                className="rounded-md bg-darkInput w-full py-[10px] px-[14px]"
                required
                value={emailField}
                onChange={(e) => setEmailField(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div>Phone</div>
              <PhoneNumberField phoneField={phoneField} setPhoneField={setPhoneField}/>
            </div>
            <div className="flex gap-2 justify-between">
              <div className="flex flex-col gap-1">
                <div>First name</div>
                <input
                  type="text"
                  className="rounded-md bg-darkInput w-full py-[10px] px-[14px]"
                  required
                  value={firstNameField}
                  onChange={(e) => setFirstNameField(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div>Last name</div>
                <input
                  type="text"
                  name=""
                  className="rounded-md bg-darkInput w-full py-[10px] px-[14px]"
                  required
                  value={lastNameField}
                  onChange={(e) => setLastNameField(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div>Password</div>
              <div className="relative">
                <input
                  type={isShowPassword ? "text" : "password"}
                  className="rounded-md bg-darkInput w-full py-[10px] px-[14px]"
                  required
                  value={pswField}
                  onChange={(e) => setPswField(e.target.value)}
                />
                <div
                  className="absolute cursor-pointer right-[10px] top-[11.6px]"
                  onClick={() => {
                    setIsShowPassword(!isShowPassword);
                  }}
                >
                  {isShowPassword ? (
                    <ShowPasswordIcon className="w-[24px]" />
                  ) : (
                    <HidePasswordIcon className="w-[24px]" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div>Choose Account Role:</div>
              <div className="w-1/2">
                <Dropdown
                  dropdownValues={roleDropDownValues}
                  chooseValue={(value) =>
                    setRoleField(value.toLocaleUpperCase())
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between bg-bgDarkPopupFooter p-4 items-center rounded-b-md">
          <div
            onClick={togglePopup}
            className="hover:underline cursor-pointer w-fit"
          >
            Cancel
          </div>
          <button
          type="submit"
            className={`px-4 py-2 bg-primaryYellow hover:bg-lightYellow select-none cursor-pointer rounded-sm font-semibold`}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

interface IPhoneNumberFieldProps {
    phoneField: string;
    setPhoneField: (value: string) => void;
  }

const PhoneNumberField = ({
    phoneField,
    setPhoneField,
  }: IPhoneNumberFieldProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.length >10) {
        return;
      }
      if (/^\d*$/.test(value) || value === "") {
        setPhoneField(value);
      }
    };
  
    return (
      <input
        type="text"
        value={phoneField}
        onChange={handleChange}
        aria-describedby="helper-text-explanation"
        className={`rounded-md bg-darkInput w-full py-[10px] px-[14px]`}
        required
      />
    );
  };

export default CreateStaffAccountPopup;
