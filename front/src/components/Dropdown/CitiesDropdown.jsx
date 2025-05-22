import React, { useEffect, useState } from "react";
import api from "../../services/api";

const CitiesDropdown = ({ value, onChange }) => {
  const [kazakhstanCities, setKazakhstanCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await api.get("/location/all");
        const cityList = response.data?.data;
        setKazakhstanCities(cityList);
      } catch (err) {}
    };

    fetchCities();
  }, []);

  return (
    <>
      <div>
        <select
          value={value || ""}
          onChange={onChange}
          className="bg-[#EAF4F4] border border-gray-300 w-full md:w-72 lg:w-90 xl:w-114 h-9 mt-1 mb-5 pl-2 rounded-sm"
        >
          <option disabled value="">
            -- Select a city --
          </option>
          {kazakhstanCities.map((item, index) => (
            <option key={index} value={item.city}>
              {item.city}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default CitiesDropdown;
