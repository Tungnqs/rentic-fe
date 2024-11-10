import React, { FormEvent, useEffect, useMemo, useState } from "react";
import {
  GoogleIcon,
  HidePasswordIcon,
  ShowPasswordIcon,
} from "../../assets/icon/icon";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { registerAccount, selectIsLogin } from "../../store/slices/auth.slice";
import Dropdown from "../../components/Dropdown/Dropdown";
import Navbar from "../../components/Navbar/Navbar";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [firstNameField, setFirstNameField] = useState("");
  const [lastNameField, setLastNameField] = useState("");
  const [usernameField, setUsernameField] = useState("");
  const [pswField, setPswField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [phoneField, setPhoneField] = useState("");
  const [roleField, setRoleField] = useState("");
  const roleDropDownValues = ["Renter", "Landlord"];

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
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
      registerAccount({
        firstName: firstNameField,
        lastName: lastNameField,
        email: emailField,
        password: pswField,
        phonenumber: submitPhoneData,
        username: usernameField,
        role: roleField,
      })
    );
    const isRegistered = registerAccount.fulfilled.match(registerResult);
    if (isRegistered) {
      navigate("/login");
    }
  };

  const isLoggedIn = useSelector(selectIsLogin);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <>
      <Navbar />
      <div className="layout flex justify-center py-7">
        <div className="w-[26%] max-lg:w-[50%] max-md:w-[70%] max-sm:w-[85%]">
          <div className="top-block">
            <div className="flex flex-col gap-3">
              <div className="text-[32px] font-bold text-center">
                Sign up to Rentic
              </div>
              <div>
                <b className="font-medium">Already have an account?</b>{" "}
                <Link
                  to={"/login"}
                  className="text-secondaryYellow hover:text-yellow-500 underline"
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="cursor-pointer btn-group flex items-center w-full justify-center mt-[16px] border-solid border rounded-lg gap-[5px] px-[24px] py-[9px] LightGrayBackGround">
              <GoogleIcon className="w-[30px]" />
              <div className="text-[18px] font-medium">Sign with google</div>
            </div>
          </div>
          <div className="mid-block flex items-center gap-2 my-4">
            <div className="border-b border-2 border-[#dcdce5] flex-1"></div>
            <div className="font-medium">or</div>
            <div className="border-b border-2 border-[#dcdce5] flex-1"></div>
          </div>
          <form
            className="bottom-block flex flex-col gap-[10px]"
            onSubmit={handleRegister}
          >
            <div className="flex gap-2">
              <div className="account field flex-1">
                <div className="text-lightGray">First Name</div>
                <input
                  required
                  type="text"
                  className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md focus:border-secondaryYellow"
                  placeholder="First name"
                  onChange={(e) => setFirstNameField(e.target.value)}
                />
              </div>
              <div className="account field flex-1">
                <div className="text-lightGray">Last Name</div>
                <input
                  required
                  type="text"
                  className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md focus:border-secondaryYellow"
                  placeholder="Last name"
                  onChange={(e) => setLastNameField(e.target.value)}
                />
              </div>
            </div>
            <div className="account field">
              <div className="text-lightGray">Username</div>
              <input
                required
                type="text"
                className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md focus:border-secondaryYellow"
                placeholder="Enter your username"
                onChange={(e) => setUsernameField(e.target.value)}
              />
            </div>
            <div className="account field">
              <div className="text-lightGray">Email</div>
              <input
                required
                type="text"
                className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md focus:border-secondaryYellow"
                placeholder="Enter email"
                onChange={(e) => setEmailField(e.target.value)}
              />
            </div>
            <div className="account field">
              <div className="text-lightGray">Phone number</div>
              <PhoneNumberField phoneField={phoneField} setPhoneField={setPhoneField} />
              <div></div>
            </div>
            <div className="psw field">
              <div>Password</div>
              <div className="relative">
                <input
                  required
                  className="w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md focus:border-secondaryYellow flex gap-2"
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Enter password"
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
            <div>
              <div>Choose Account Role:</div>
              <div className="w-1/3">
                <Dropdown
                  dropdownValues={roleDropDownValues}
                  chooseValue={(value) =>
                    setRoleField(value.toLocaleUpperCase())
                  }
                />
              </div>
            </div>
            <button
              type="submit"
              className="my-4 login-btn hover:bg-yellow-500 bg-primaryYellow text-center w-full rounded-md font-medium py-[9px]"
            >
              Sign up
            </button>
          </form>
          <div className="text-center text-[14px]">
            By clicking Sign up or Continue with, you agree to Rentic
          </div>
          <div className="text-center text-[14px]">
            <b>Term of Use</b> and <b>Privacy Policy</b>
          </div>
        </div>
      </div>
    </>
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
      className={`w-full py-[10px] px-[14px] border-2 border-[#dcdce5] rounded-md focus:border-secondaryYellow`}
      placeholder="Enter phone number"
      required
    />
  );
};

export default Register;
