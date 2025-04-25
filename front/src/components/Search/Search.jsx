import { useState } from "react";

const Search = ({ setUserSearch, handleSearch, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const onSearchClick = () => {
    setUserSearch?.(inputValue);
    handleSearch?.(inputValue); // trigger search
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearchClick();
    }
  };

  return (
    <>
      <div className="search flex items-center justify-center mt-12">
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-w-280 w-full bg-white pt-3 pb-3 pl-10 rounded-lg border-1"
        />
        <button
          onClick={onSearchClick}
          className="lg:w-48 h-12 pl-5 pr-5 text-lg bg-[#38BF4C] text-white ml-2 rounded-lg"
        >
          Search
        </button>
      </div>
    </>
  );
};

export default Search;
