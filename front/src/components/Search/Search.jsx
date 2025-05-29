import { useState } from "react";
import filter from "../../assets/filter.png";
import JobMobileFilter from "../Filter/JobMobileFilter";

const Search = ({
  setUserSearch,
  handleSearch,
  placeholder,
  value,
  setSelectedServices,
  setSelectedLocations,
  setSelectedSpecializations,
  setSelectedLanguages,
  selectedServices,
  selectedLocations,
  selectedSpecializations,
  selectedLanguages,
  filterUsed,
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [mobileFilterOn, setMobileFilterOn] = useState(false);

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
      <div>
        <div className="search flex items-center justify-center px-2 mt-12">
          <input
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full md:min-w-280 bg-white py-2 pl-5 md:py-3 md:pl-10 rounded-lg border-1"
          />
          <button
            onClick={onSearchClick}
            className="lg:w-48 h-10.5 md:h-12 px-3 md:px-5 md:text-lg bg-[#38BF4C] text-white ml-2 rounded-lg"
          >
            Search
          </button>
          <button
            onClick={() => setMobileFilterOn(!mobileFilterOn)}
            className="flex md:hidden ml-2"
          >
            <div className="relative">
              <img src={filter} alt="filter icon" className="w-16 rounded-md" />
              {filterUsed && (
                <span className="bg-red-500 w-2 h-2 absolute top-0.5 right-0.5 rounded-full "></span>
              )}
            </div>
          </button>
        </div>
        {mobileFilterOn && (
          <JobMobileFilter
            setMobileFilterOn={setMobileFilterOn}
            setSelectedLanguages={setSelectedLanguages}
            selectedLanguages={selectedLanguages}
            setSelectedSpecializations={setSelectedSpecializations}
            selectedSpecializations={selectedSpecializations}
            setSelectedLocations={setSelectedLocations}
            selectedLocations={selectedLocations}
            setSelectedServices={setSelectedServices}
            selectedServices={selectedServices}
          />
        )}
      </div>
    </>
  );
};

export default Search;
