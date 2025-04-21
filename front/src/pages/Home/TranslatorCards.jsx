import { useNavigate } from "react-router-dom";
import profileicon from "../../assets/profileicon.png";
import React from "react";

const TranslatorCards = ({
  id,
  profileImageUrl,
  name,
  surname,
  location,
  languages,
  serviceTypes,
  specializations,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid rounded-2xl bg-white border-3 border-[#8F8F8F]">
        <div className="flex items-center w-full mt-4 ml-7">
          <img
            src={profileImageUrl || profileicon}
            alt="profile icon"
            className="w-25 h-25 rounded-full object-cover"
          />
          <div className="w-50 h-30 ml-5 pt-5 text-[#8F8F8F]">
            <p className="text-lg truncate block w-full pr-5">
              Name: <label className="text-black">{name}</label>
            </p>
            <p className="text-lg truncate block w-full pr-5">
              Surname: <label className="text-black">{surname}</label>
            </p>
            <p className="text-lg truncate block w-full pr-5">
              Location: <label className="text-black">{location?.city}</label>
            </p>
          </div>
        </div>
        <div className="grid justify-between mt-3 ml-7">
          <div>
            <h1 className="text-[#8F8F8F] text-lg w-30">Languages:</h1>
            {languages?.map((language, i) => (
              <p key={i} className="ml-5 mb-2 truncate block w-full pr-5">
                {language.name}
              </p>
            ))}
          </div>
          <div>
            <h1 className="text-[#8F8F8F] text-lg w-30">Services:</h1>
            {serviceTypes?.map((service, i) => (
              <p key={i} className="ml-5 mb-2">
                {service.name}
              </p>
            ))}
          </div>
          <div>
            <h1 className="text-[#8F8F8F] text-lg w-30">Specialization:</h1>
            {specializations?.map((specialization, i) => (
              <p key={i} className="ml-5 mb-2">
                {specialization.name}
              </p>
            ))}
          </div>
        </div>
        <div className="flex justify-center w-full my-4">
          <button
            onClick={() => navigate(`/translator-details:${id}`)}
            className="w-40 h-10 bg-[#38BF4C] text-white text-lg rounded-lg"
          >
            More Details
          </button>
        </div>
      </div>
    </>
  );
};

export default TranslatorCards;
