import React, { useEffect, useState } from "react";
import { ArrowDownIcon } from "../../assets/icon/icon";

export interface IDropdownWithItems{
    title?: string;
    id?: string;
    value?: string
}

interface IDropdownWithIdProps {
  dropdownValues: IDropdownWithItems[];
  chooseValue: (item: IDropdownWithItems) => void;
}

const DropdownWithId = ({
  dropdownValues,
  chooseValue,
}: IDropdownWithIdProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(dropdownValues[0].title);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChooseOption = (option: IDropdownWithItems) => {
    setIsOpen(!isOpen);
    setTitle(option.title);
    chooseValue(option);
  };

  useEffect(()=>{
    chooseValue(dropdownValues[0]);
  }, [])

  return (
    <div className="relative inline-block w-full min-w-[130px]">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="w-full text-black bg-white hover:bg-gray-300 border-2 border-black font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center min-w-[130px] gap-3 justify-between truncate"
        type="button"
      >
        {title}
        <ArrowDownIcon />
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-full border border-[#c4c4c4]"
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownDefaultButton"
          >
            {dropdownValues.map((value, index) => (
              <li onClick={() => handleChooseOption(value)} key={index}>
                <div className="block px-4 py-2 hover:bg-gray-100 select-none cursor-pointer">
                  {value.title}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownWithId;
