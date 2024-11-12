import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { HidePasswordIcon, ShowPasswordIcon } from "../../assets/icon/icon";
import { authLogout, changeMyPassword, IChangeMyPasswordReq } from "../../store/slices/auth.slice";
import { useNavigate } from "react-router";

interface IChangePasswordProps {
  isManager?: boolean;
}

const ChangePassword = ({ isManager }: IChangePasswordProps) => {
  const [currentPasswordField, setCurrentPasswordField] = useState("");
  const [newPasswordField, setNewPasswordField] = useState("");
  const [newPasswordConfirmField, setNewPasswordConfirmField] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isShowCurrentPsw, setIsShowCurrentPsw] = useState(false);
  const [isShowNewPsw, setIsShowNewPsw] = useState(false);
  const [isShowConfirmPsw, setIsShowConfirmPsw] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    setError(null);

    if (!currentPasswordField || !newPasswordField || !newPasswordConfirmField) {
      setError("Please fill in all required fields");
      return;
    }

    if (newPasswordField === currentPasswordField) {
      setError("New password must be different from current password");
      return;
    }

    if (newPasswordConfirmField !== newPasswordField) {
      setError("Passwords do not match");
      return;
    }

    const changePswRequest: IChangeMyPasswordReq = {
      currentPassword: currentPasswordField,
      newPassword: newPasswordConfirmField,
    };

    const changePswResult = await dispatch(changeMyPassword(changePswRequest));
    if (changeMyPassword.fulfilled.match(changePswResult)) {
      dispatch(authLogout({ isChangePsw: true }));
      navigate("/login");
    }
  };

  const InputField = ({ 
    label, 
    value, 
    onChange, 
    showPassword, 
    togglePassword, 
    placeholder 
  }: any) => (
    <div className="space-y-1">
      <label className={`block text-sm font-medium ${isManager ? 'text-gray-200' : 'text-gray-700'}`}>
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            block w-full rounded-md 
            ${isManager 
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
            }
            border px-4 py-2.5 
            focus:ring-2 focus:ring-inset
            ${isManager ? 'focus:ring-amber-500' : 'focus:ring-amber-500'}
            focus:border-transparent
            transition duration-150 ease-in-out
            sm:text-sm
          `}
        />
        <button
          type="button"
          onClick={togglePassword}
          className={`absolute inset-y-0 right-0 flex items-center pr-3 
            ${isManager ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-500'}`}
        >
          {showPassword ? (
            <ShowPasswordIcon className="h-5 w-5" />
          ) : (
            <HidePasswordIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isManager ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`
            ${isManager ? 'bg-gray-800' : 'bg-white'} 
            rounded-lg shadow-lg overflow-hidden
          `}
        >
          <div className="px-6 py-8">
            <div className="text-center">
              <h2 className={`text-2xl font-bold ${isManager ? 'text-white' : 'text-gray-900'}`}>
                Change Password
              </h2>
              <p className={`mt-2 text-sm ${isManager ? 'text-gray-400' : 'text-gray-600'}`}>
                Please enter your current password and choose a new one
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <InputField
                label="Current Password"
                value={currentPasswordField}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPasswordField(e.target.value)}
                showPassword={isShowCurrentPsw}
                togglePassword={() => setIsShowCurrentPsw(!isShowCurrentPsw)}
                placeholder="Enter current password"
              />

              <InputField
                label="New Password"
                value={newPasswordField}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPasswordField(e.target.value)}
                showPassword={isShowNewPsw}
                togglePassword={() => setIsShowNewPsw(!isShowNewPsw)}
                placeholder="Enter new password"
              />

              <InputField
                label="Confirm New Password"
                value={newPasswordConfirmField}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPasswordConfirmField(e.target.value)}
                showPassword={isShowConfirmPsw}
                togglePassword={() => setIsShowConfirmPsw(!isShowConfirmPsw)}
                placeholder="Confirm new password"
              />

              {error && (
                <div className={`rounded-md p-4 ${isManager ? 'bg-red-900/50' : 'bg-red-50'}`}>
                  <div className="flex">
                    <div className={`text-sm ${isManager ? 'text-red-200' : 'text-red-700'}`}>
                      {error}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-4 pt-4">
                <button
                  onClick={() => navigate(-1)}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-md
                    ${isManager 
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }
                    transition-colors duration-150 ease-in-out
                  `}
                >
                  Cancel
                </button>
                <button
                  onClick={handleChangePassword}
                  className={`
                    px-4 py-2 text-sm font-medium text-white rounded-md
                    ${isManager 
                      ? 'bg-amber-600 hover:bg-amber-700' 
                      : 'bg-amber-600 hover:bg-amber-700'
                    }
                    transition-all duration-150 ease-in-out
                    transform hover:scale-[1.02]
                  `}
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
