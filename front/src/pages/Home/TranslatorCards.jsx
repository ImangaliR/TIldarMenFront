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
      <div className="relative h-120 rounded-2xl bg-white border-1">
        <div className="h-fit flex items-center mt-3 mx-5">
          <img
            src={profileImageUrl || profileicon}
            alt="profile icon"
            className="w-25 h-25 rounded-full object-cover"
          />
          <div className="w-40 h-30 ml-5 pt-5 text-[#8F8F8F]">
            <p className="truncate block">
              Name: <label className="text-black">{name}</label>
            </p>
            <p className="truncate block">
              Surname: <label className="text-black">{surname}</label>
            </p>
            <p className="truncate block">
              Location: <label className="text-black">{location?.city}</label>
            </p>
          </div>
        </div>
        <div className="h-65 grid justify-between mt-3 mx-5">
          <div className="my-1 w-full">
            <h1 className="text-[#8F8F8F] w-30">Languages:</h1>
            <div className="max-h-14 w-full overflow-y-auto overflow-x-hidden">
              {languages?.map((language, i) => (
                <p key={i} className="ml-5 mb-2 pr-22">
                  {language.name}
                </p>
              ))}
            </div>
          </div>
          <div className="my-1 w-full">
            <h1 className="text-[#8F8F8F] w-30">Services:</h1>
            <div className="max-h-14 w-full overflow-y-auto overflow-x-hidden">
              {serviceTypes?.map((service, i) => (
                <p key={i} className="ml-5 mb-2 pr-22">
                  {service.name}
                </p>
              ))}
            </div>
          </div>
          <div className="my-1 w-full">
            <h1 className="text-[#8F8F8F] w-30">Specialization:</h1>
            <div className="max-h-14 w-full overflow-y-auto overflow-x-hidden">
              {specializations?.map((specialization, i) => (
                <p key={i} className="ml-5 mb-2 pr-22">
                  {specialization.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full flex justify-center h-fit my-4">
          <button
            onClick={() => navigate(`translator-details/${id}`)}
            className="px-5 py-2 bg-[#38BF4C] text-white rounded-lg"
          >
            More Details
          </button>
        </div>
      </div>
    </>
  );
};

export default TranslatorCards;
