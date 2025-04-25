import { useEffect, useState } from "react";
import api from "./../../services/api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUser } from "../../utils/contexts/UserContext";
import deletesign from "../../assets/delete_sign.png";
import { getProfile } from "../../services/ProfileService/ProfileService";

const TranslationServicesDropdown = () => {
  const [translationServices, setTranslationServices] = useState([]);
  const [tranlatorService, setTranslatorService] = useState("");
  const [loading, setLoading] = useState(true);
  const { handleSubmit } = useForm();
  const { user, userId, setUser } = useUser();

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

  if (tranlatorService.includes("&")) {
    setTranslatorService(tranlatorService.replace(/&/g, "%26"));
  }
  const updateTranslationServices = async () => {
    try {
      const response = await api.put(
        `translator/${userId}/service?service=${tranlatorService}`
      );

      const updatedProfile = await getProfile();
      setUser(updatedProfile);
      toast.success("Added the service successfully!");
    } catch (err) {
      if (err.response.data.data.includes("Service already exists")) {
        toast.error("Service already exists");
      } else {
        toast.error("Failed to add service.");
      }
    }
  };

  const deleteService = async (Service) => {
    if (Service.includes("&")) {
      Service = Service.replace(/&/g, "%26");
    }
    try {
      const response = await api.delete(
        `translator/${userId}/service?service=${Service}`
      );
      const updatedProfile = await getProfile();
      setUser(updatedProfile);
      toast.success("Deleted the service successfully!");
    } catch (err) {
      toast.error("Failed to delete service.");
    }
  };

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit(updateTranslationServices)}
          className="w-75"
        >
          <label className="block mb-2 font-semibold text-black">
            Type of Translation Services
          </label>
          <div className="relative">
            <select
              className="w-full bg-[#EAF4F4] border-1 border-[#DCDCDC] text-[##8F8F8F] text-sm rounded-md p-3 pr-10"
              defaultValue=""
              onChange={(e) => setTranslatorService(e.target.value)}
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
            className="justify-center items-center gap-2 text-[#38BF4C] border-1 rounded-lg w-25 h-8 mt-6"
          >
            Add
          </button>
        </form>
        <div className="mt-10">
          {user?.data?.serviceTypes?.map((service, i) => (
            <p
              className="px-2 py-1 mt-2 bg-[#EAF4F4] rounded-lg relative"
              key={i}
            >
              {service.name}
              <button
                key={i}
                className="absolute right-0.5 top-2"
                onClick={() => deleteService(service.name)}
              >
                <img src={deletesign} alt="delete sign" className="w-5 h-5" />
              </button>
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default TranslationServicesDropdown;
