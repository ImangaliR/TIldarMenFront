import { useEffect, useState } from "react";
import api from "./../../services/api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUser } from "../../utils/contexts/UserContext";

const TranslationServicesDropdown = () => {
  const [translationServices, setTranslationServices] = useState([]);
  const [tranlatorServices, setTranslatorServices] = useState("");
  const [loading, setLoading] = useState(true);
  const { handleSubmit } = useForm();
  const { userId } = useUser();

  useEffect(() => {
    api
      .get("/service-types/all")
      .then((res) => {
        setTranslationServices(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching Translation Services:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const updateTranslationServices = async () => {
    try {
      const response = await api.put(
        `translator/${userId}/service?service=${tranlatorServices}`
      );
      toast.success("Added the service successfully!");
    } catch (err) {
      toast.error("Failed to add service.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(updateTranslationServices)} className="w-72">
        <label className="block mb-2 font-semibold text-black">
          Type of Translation Services
        </label>
        <div className="relative">
          <select
            className="w-full bg-[#EAF4F4] border-1 border-[#DCDCDC] text-[##8F8F8F] text-sm rounded-md p-3 pr-10"
            defaultValue=""
            onChange={(e) => setTranslatorServices(e.target.value)}
            disabled={loading}
          >
            <option value="" disabled hidden>
              {loading ? "Loading..." : "Type..."}
            </option>
            {translationServices.map((service, i) => (
              <option key={i} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="justify-center items-center gap-2 text-[#38BF4C] border-1 rounded-lg w-25 h-8 mt-10"
        >
          Update
        </button>
      </form>
    </>
  );
};

export default TranslationServicesDropdown;
