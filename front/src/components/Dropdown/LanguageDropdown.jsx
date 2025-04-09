import { useEffect, useState } from "react";
import api from "./../../services/api";

const LanguageDropdown = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/language/all")
      .then((res) => {
        setLanguages(res.data.data); // Adjust this depending on your API's response structure
      })
      .catch((err) => {
        console.error("Error fetching languages:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="w-72">
        <label className="block mb-2 font-semibold text-black">Languages</label>
        <div className="relative">
          <select
            className="w-full bg-[#EAF4F4] border-1 border-[#DCDCDC] text-[##8F8F8F] text-sm rounded-md p-3 pr-10"
            defaultValue=""
            disabled={loading}
          >
            <option value="" disabled hidden>
              {loading ? "Loading..." : "Type..."}
            </option>
            {languages.map((lang, i) => (
              <option key={i} value={lang.name}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default LanguageDropdown;
