import { useEffect, useState } from "react";
import api from "./../../services/api";
import { useForm } from "react-hook-form";
import { useUser } from "../../utils/contexts/UserContext";
import { toast } from "react-toastify";
import { getProfile } from "../../services/ProfileService/ProfileService";

const LanguageDropdown = () => {
  const [languages, setLanguages] = useState([]);
  const [Language, setLanguage] = useState("");
  const [loading, setLoading] = useState(true);
  const { handleSubmit } = useForm();
  const { userId, setUser } = useUser();

  useEffect(() => {
    api
      .get("/language/all")
      .then((res) => {
        setLanguages(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching languages:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addLanguage = async () => {
    try {
      const response = await api.put(
        `translator/${userId}/language?language=${Language}`
      );
      const updatedProfile = await getProfile();
      setUser(updatedProfile);
      toast.success("Added the language successfully!");
    } catch (err) {
      toast.error("Failed to add languages.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(addLanguage)} className="w-75">
        <label className="block mb-2 font-semibold text-black">Languages</label>
        <div className="relative">
          <select
            className="w-full bg-[#EAF4F4] border-1 border-[#DCDCDC] text-[##8F8F8F] text-sm rounded-md p-3 pr-10"
            defaultValue=""
            onChange={(e) => setLanguage(e.target.value)}
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
        <button
          type="submit"
          className="justify-center items-center gap-2 text-[#38BF4C] border-1 rounded-lg w-25 h-8 mt-6"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default LanguageDropdown;
