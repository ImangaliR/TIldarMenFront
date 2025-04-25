import { useEffect, useState } from "react";
import api from "./../../services/api";
import deletesign from "../../assets/delete_sign.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUser } from "../../utils/contexts/UserContext";
import { getProfile } from "../../services/ProfileService/ProfileService";

const SpecializationDropdown = () => {
  const [specialization, setSpecialization] = useState([]);
  const [addSpecialization, setAddSpecialization] = useState("");
  const [loading, setLoading] = useState(true);
  const { handleSubmit } = useForm();
  const { user, userId, setUser } = useUser();

  useEffect(() => {
    api
      .get("/specialization/all")
      .then((res) => {
        setSpecialization(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching Specialization:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const updateSpecialization = async () => {
    try {
      const response = await api.put(
        `translator/${userId}/specialization?specialization=${addSpecialization}`
      );
      const updatedProfile = await getProfile();
      setUser(updatedProfile);
      toast.success("Added the specialization successfully!");
    } catch (err) {
      if (err.response.data.data.includes("Specialization already exists")) {
        toast.error("Specialization already exists");
      } else {
        toast.error("Failed to add specialization.");
      }
    }
  };

  const deleteSpecialization = async (Specialization) => {
    try {
      const response = await api.delete(
        `translator/${userId}/specialization?specialization=${Specialization}`
      );
      const updatedProfile = await getProfile();
      setUser(updatedProfile);
      toast.success("Deleted the specialization successfully!");
    } catch (err) {
      toast.error("Failed to delete specialization.");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(updateSpecialization)} className="w-75">
          <label className="block mb-2 font-semibold text-black">
            Specialization
          </label>
          <div className="relative">
            <select
              className="w-full bg-[#EAF4F4] border-1 border-[#DCDCDC] text-[##8F8F8F] text-sm rounded-md p-3 pr-10"
              defaultValue=""
              onChange={(e) => setAddSpecialization(e.target.value)}
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
          <button
            type="submit"
            className="justify-center items-center gap-2 text-[#38BF4C] border-1 rounded-lg w-25 h-8 mt-6"
          >
            Add
          </button>
        </form>
        <div className="mt-10">
          {user?.data?.specializations?.map((specialization, i) => (
            <p
              className="px-2 py-1 mt-2 bg-[#EAF4F4] rounded-lg relative"
              key={i}
            >
              {specialization.name}
              <button
                key={i}
                className="absolute right-0.5 top-2"
                onClick={() => deleteSpecialization(specialization.name)}
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

export default SpecializationDropdown;
