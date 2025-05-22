import { toast } from "react-toastify";
import api from "../../services/api";
import { useUser } from "../../utils/contexts/UserContext";
import { useEffect, useState } from "react";
import { getProfile } from "../../services/ProfileService/ProfileService";
import { useForm } from "react-hook-form";

const WorkExperience = ({ works }) => {
  const { userId, setUser } = useUser();
  const { handleSubmit } = useForm();
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");

  const convertToISOString = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) return "";

    // Keep full ISO string, but manually append microseconds if needed
    const iso = date.toISOString(); // e.g. "2025-12-25T00:00:00.000Z"
    return iso.replace("Z", "") + "000"; // now: "2025-12-25T00:00:00.000000"
  };
  const toInputDate = (dateStr) => {
    if (!dateStr) return "";
    return dateStr.split("T")[0];
  };

  const deleteWork = async (id) => {
    try {
      const res = await api.delete(`/translator/${userId}/work/${id}/delete`);
      const updatedProfile = await getProfile();
      setUser(updatedProfile);
      toast.success("Deleted work successfully!");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleAddWork = async () => {
    let data = {
      position: role,
      companyName: company,
      startDate: convertToISOString(startDate),
      endDate: convertToISOString(endDate),
      description: description,
    };

    try {
      const res = await api.post(`/translator/${userId}/work`, data);
      const updatedProfile = await getProfile();
      setUser(updatedProfile);
      toast.success("Added work successfully!");
      setRole("");
      setCompany("");
      setStartDate("");
      setEndDate("");
      setDescription("");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-40 gap-y-10 md:items-baseline">
        <form onSubmit={handleSubmit(handleAddWork)}>
          <div className="grid justify-center bg-[#EAF4F4] outline-1 outline-[#dcdcdc] rounded-sm py-5 px-3">
            <div className="flex gap-1 md:gap-3">
              <p className="min-w-20">Role*</p>
              <input
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                type="text"
                className="px-3 bg-[#EAF4F4] border-1 border-[#DCDCDC] rounded-sm w-full md:w-70 h-8"
              />
            </div>
            <div className="flex gap-1 md:gap-3 mt-2">
              <p className="min-w-20">Company</p>
              <input
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                type="text"
                className="px-3 bg-[#EAF4F4] border-1 border-[#DCDCDC] rounded-sm w-full md:w-70 h-8"
              />
            </div>
            <div className="flex gap-1 md:gap-3 mt-2">
              <p className="min-w-20">Duration*</p>
              <div className="grid w-full md:w-fit md:flex gap-2">
                <input
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  type="date"
                  placeholder="Start Date"
                  className="bg-[#EAF4F4] border-1 border-[#DCDCDC] rounded-sm w-full md:w-34 h-8 pl-3 text-sm"
                />
                <input
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                  placeholder="End Date"
                  className="bg-[#EAF4F4] border-1 border-[#DCDCDC] rounded-sm w-full md:w-34 h-8 pl-3 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-1 md:gap-3 mt-2">
              <p className="min-w-20">Description</p>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="bg-[#EAF4F4] border-1 border-[#DCDCDC] p-3 w-full md:w-70 h-30 rounded-sm text-sm resize-none"
              />
            </div>
          </div>
          <div className="flex justify-end mt-5 md:mt-10">
            <button
              type="submit"
              className="w-25 h-8 text-[#38BF4C] border-1 rounded-lg"
            >
              Add
            </button>
          </div>
        </form>
        {works &&
          works?.map((work, i) => (
            <div key={i}>
              <div className="grid md:justify-center bg-[#EAF4F4] outline-1 outline-[#dcdcdc] rounded-sm py-5 px-3">
                <div className="flex gap-1 md:gap-3">
                  <p className="min-w-20">Role*</p>
                  <input
                    type="text"
                    defaultValue={work?.position}
                    className="px-3 bg-[#EAF4F4] border-1 border-[#DCDCDC] rounded-sm w-full md:w-70 h-8"
                  />
                </div>
                <div className="flex gap-1 md:gap-3 mt-2">
                  <p className="min-w-20">Company</p>
                  <input
                    type="text"
                    defaultValue={work?.companyName}
                    className="px-3 bg-[#EAF4F4] border-1 border-[#DCDCDC] rounded-sm w-full md:w-70 h-8"
                  />
                </div>
                <div className="flex gap-1 md:gap-3 mt-2">
                  <p className="min-w-20">Duration*</p>
                  <div className="grid w-full md:w-fit md:flex gap-2">
                    <input
                      type="date"
                      defaultValue={toInputDate(work?.startDate)}
                      placeholder="Start Date"
                      className="px-3 bg-[#EAF4F4] border-1 border-[#DCDCDC] rounded-sm w-full md:w-34 h-8 pl-3 text-sm"
                    />
                    <input
                      type="date"
                      defaultValue={toInputDate(work?.endDate)}
                      placeholder="End Date"
                      className="px-3 bg-[#EAF4F4] border-1 border-[#DCDCDC] rounded-sm w-full md:w-34 h-8 pl-3 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-1 md:gap-3 mt-2">
                  <p className="min-w-20">Description</p>
                  <textarea
                    type="text"
                    defaultValue={work?.description}
                    className="px-3 bg-[#EAF4F4] border-1 border-[#DCDCDC] p-3 w-full md:w-70 h-30 rounded-sm text-sm resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-5 md:mt-10">
                <button
                  onClick={() => deleteWork(work?.id)}
                  className="w-25 h-8 text-[#FF0000] border-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default WorkExperience;
