import React, { useState } from "react";
import { ArrowDownIcon } from "../../assets/icon/icon";

interface IDropdownProps {
  dropdownTitle: string;
  dropdownValues: string[];
  chooseValue: (value: string) => void;
}

const Dropdown = ({
  dropdownTitle,
  dropdownValues,
  chooseValue,
}: IDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(dropdownTitle);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChooseOption = (option: string) => {
    setIsOpen(!isOpen);
    setTitle(option);
    chooseValue(option);
  };

  return (
    <div className="relative inline-block w-fit min-w-[130px]">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="w-full text-black bg-gray-300 hover:bg-[#afafaf] border-2 border-black font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center min-w-[130px] gap-3 justify-between"
        type="button"
      >
        {title}
        <ArrowDownIcon />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="dropdown"
          className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-full"
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownDefaultButton"
          >
            {dropdownValues.map((value, index) => (
              <li onClick={() => handleChooseOption(value)} key={index}>
                <div className="block px-4 py-2 hover:bg-gray-100">
                  {value}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
