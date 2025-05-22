import React from "react";

const AvaibilityDropdown = ({ value, onChange }) => {
  return (
    <>
      <div className="w-full md:w-fit">
        <select
          value={value || ""}
          onChange={onChange}
          className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-full md:w-55 lg:w-60 xl:w-80 h-7 rounded-sm text-sm"
        >
          <option disabled value="">
            -- Select --
          </option>
          <option value="BUSY">Busy</option>
          <option value="AVAILABLE">Available</option>
        </select>
      </div>
    </>
  );
};

export default AvaibilityDropdown;
