import { useEffect, useState } from "react";
import api from "./../../services/api";

const SpecializationDropdown = () => {
  const [specialization, setSpecialization] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/specialization/all")
      .then((res) => {
        setSpecialization(res.data.data); // Adjust this depending on your API's response structure
      })
      .catch((err) => {
        console.error("Error fetching Specialization:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="w-72">
        <label className="block mb-2 font-semibold text-black">
          Specialization
        </label>
        <div className="relative">
          <select
            className="w-full bg-[#EAF4F4] border-1 border-[#DCDCDC] text-[##8F8F8F] text-sm rounded-md p-3 pr-10"
            defaultValue=""
            disabled={loading}
          >
            <option value="" disabled hidden>
              {loading ? "Loading..." : "Type..."}
            </option>
            {specialization.map((specialty, i) => (
              <option key={i} value={specialty.name}>
                {specialty.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default SpecializationDropdown;
