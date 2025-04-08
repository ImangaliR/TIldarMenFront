import { useState } from "react";
import filtericon from "../../assets/filter.png";

const Search = () => {
  const [filterOn, setFilterOn] = useState(false);

  return (
    <>
      <div className="search flex items-center justify-center mt-12">
        <input
          type="text"
          placeholder="Please enter a language or specialization..."
          className="min-w-100 lg:min-w-200 xl:min-w-260 bg-white pt-3 pb-3 pl-10 rounded-lg"
        />
        <button className="lg:w-48 h-12 pl-5 pr-5 text-lg bg-[#38BF4C] text-white ml-2 rounded-lg">
          Search
        </button>
        <div className="relative">
          <button
            className="ml-4 w-12 h-12"
            onClick={() => setFilterOn(!filterOn)}
          >
            <img src={filtericon} alt="filter icon" className="rounded-sm" />
          </button>
          {filterOn ? (
            <section className="absolute w-55 right-1 top-25">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl font-bold">Filters</h1>
                <p className="text-sm text-[#192DF7] cursor-pointer">reset</p>
              </div>
              <div className="text-lg font-medium">
                <h1 className="mb-12">Language Filters</h1>
                <h1 className="mb-12">Specialization Filters</h1>
                <h1 className="mb-12">Experience & Credentials</h1>
                <h1 className="mb-12">Availability & Work Type</h1>
                <h1 className="mb-12">Location Filters</h1>
                <h1 className="mb-12">Services</h1>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Search;
