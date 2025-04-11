import profileicon from "../../assets/profileicon.png";
import React from "react";

const TranslatorCards = ({ name, surname, email, phoneNumber }) => {
  return (
    <>
      <div className="grid max-w-85 rounded-2xl bg-white border-3 border-[#8F8F8F]">
        <div className="flex items-center w-full mt-4 ml-7">
          <img src={profileicon} alt={`${profileicon}`} className="w-25 h-25" />
          <div className="w-50 h-30 ml-5 pt-5 text-[#8F8F8F]">
            <p className="text-lg truncate block w-full pr-5">Name: {name}</p>
            <p className="text-lg truncate block w-full pr-5">
              Surname: {surname}
            </p>
          </div>
        </div>
        <div className="mt-3 ml-7">
          <div className="">
            <h1 className="text-[#8F8F8F] text-lg w-30">Email:</h1>
            <p className="text-sm ml-5 mb-2 truncate block w-full pr-5">
              {email}
            </p>
          </div>
          <div className="">
            <h1 className="text-[#8F8F8F] text-lg w-30">Phone Number:</h1>
            <p className="text-sm ml-5 mb-2">{phoneNumber}</p>
          </div>
        </div>
        <div className="flex justify-center w-full my-4">
          <button className="w-40 h-10 bg-[#38BF4C] text-white text-lg rounded-lg">
            More Details
          </button>
        </div>
      </div>
    </>
  );
};

export default TranslatorCards;
