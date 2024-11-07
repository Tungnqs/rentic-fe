import React from 'react';
import { LocationIcon } from '../../assets/icon/icon';

interface ISearchBarProps{
    searchingKeyword: string,
    setSearchingKeyword: (value: string) => void,
    searchPlaceholder: string;
    icon: React.JSX.Element;
    customWidth?: string;
}

const SearchBar = ({searchingKeyword, setSearchingKeyword, searchPlaceholder, icon, customWidth} : ISearchBarProps) => {
    return (
        <div className={`flex items-center gap-4 border rounded-3xl py-2 px-4 h-[60px] max-md:min-w-[250px] justify-between ${customWidth ? `${customWidth}` : "w-[50%]"}`}>
        <div className="w-fit">
          {icon}
        </div>
        <input
          className="flex-1 bg-transparent"
          value={searchingKeyword}
          onChange={(e) => setSearchingKeyword(e.target.value)}
          type="text"
          placeholder={searchPlaceholder}
        />
      </div>
    );
};

export default SearchBar;