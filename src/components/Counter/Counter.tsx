import React, { useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "../../assets/icon/icon";

interface ICounterProps {
  setValue: (value: number) => void;
  noNeedBtn?: boolean;
}

const Counter = ({ setValue, noNeedBtn }: ICounterProps) => {
  const [quantity, setQuantity] = useState<number>(0);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = value === "" ? 0 : Number(value);
    if (!isNaN(numberValue)) {
      setQuantity(numberValue);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    setValue(quantity);
  }, [quantity, setValue]);

  return (
    <div className="relative flex items-center w-full">
      {!noNeedBtn && (
        <div
          onClick={decrement}
          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none flex items-center"
        >
          <MinusIcon />
        </div>
      )}
      <input
        type="text"
        value={quantity}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-describedby="helper-text-explanation"
        className={`border h-11 text-gray-900 text-sm block w-full p-2.5 ${noNeedBtn ? "rounded-md border-2 border-black" : "border-x-0 text-center bg-gray-100 border-gray-300"}`}
        placeholder="999"
        required
        readOnly={!noNeedBtn}
      />
      {!noNeedBtn && (
        <div
          onClick={increment}
          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none flex items-center"
        >
          <PlusIcon />
        </div>
      )}
    </div>
  );
};

export default Counter;
