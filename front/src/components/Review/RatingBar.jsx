import React from "react";
import fullstar from "../../assets/full_star.png";

const RatingBar = ({ star, percent, count }) => {
  return (
    <div className="flex items-center justify-evenly text-sm text-gray-600 mb-3">
      <div className="flex items-center border-1 border-[#bdbdbd] rounded-full w-6 justify-center font-medium text-black">
        {star}
      </div>
      <img src={fullstar} alt="full star icon" className="w-4 h-4" />
      <div className="relative w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-purple-500"
          style={{ width: percent }}
        ></div>
      </div>
      <div className="w-3 text-right text-sm">{count}</div>
    </div>
  );
};

export default RatingBar;
