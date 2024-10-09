import React from 'react';
import { LocationIcon } from '../../assets/icon/icon';

interface ISearchBarProps{
    searchingKeyword: string,
    setSearchingKeyword: (value: string) => void,
    searchPlaceholder: string;
    icon: React.JSX.Element;
}

const SearchBar = ({searchingKeyword, setSearchingKeyword, searchPlaceholder, icon} : ISearchBarProps) => {
    return (
        <div className="flex items-center gap-4 border rounded-3xl py-2 px-4 h-[60px] w-[50%] max-md:min-w-[250px] justify-between">
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