import warn from "../../assets/warn.png";
import chatgreen from "../../assets/chatgreen.png";
import { useUser } from "../../utils/contexts/UserContext";
import { toast } from "react-toastify";
import api from "./../../services/api";

const languageColors = {
  0: "#FFF27F",
  1: "#DE9DFC",
  2: "#A0E7E5",
  3: "#FFC75F",
  4: "#F9A1BC",
  5: "#55EAD7",
  6: "#55AAFF",
  7: "#FDCBFA",
  8: "#9EE493",
  9: "#AECBFE",
};

const JobCards = ({ job }) => {
  const { userRole, userId } = useUser();
  function formatDate(dateString) {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour12: true,
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options).replace(",", " -");
  }

  const enrollProject = async (id) => {
    if (!userId) {
      toast.error("Please log in to apply for a job");
      return;
    }

    if (userRole !== "TRANSLATOR") {
      toast.error("Only translators can apply for jobs");
      return;
    }

    try {
      const res = await api.post(`/job-application/${userId}/send/${id}`);
      toast.success("Application sent");
    } catch (err) {
      if (err.response?.data?.data?.includes("already")) {
        toast.error("You have already applied for this job");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const reportJob = async (id) => {
    if (!userId) {
      toast.error("Please log in to apply for a job");
      return;
    }

    try {
      const res = await api.post(`/job-application/${userId}/send/${id}`);
      toast.success("Application sent");
    } catch (err) {
      if (err.response?.data?.data?.includes("already")) {
        toast.error("You have already applied for this job");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <div className="bg-white shadow-sm rounded-lg px-10 py-6">
        <h1 className="text-lg font-bold">{job?.title}</h1>
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center text-[#949494] gap-2 font-semibold ml-3">
            <p>{formatDate(job?.startDate)}, </p>
            <p>{formatDate(job?.endDate)}</p>
          </h2>
          <p className="bg-[#05E400] text-white px-6 py-1 text-center rounded-sm">
            New
          </p>
        </div>
        <div className="w-full mb-6">
          <div className="flex items-baseline justify-between gap-8">
            <div className="flex items-baseline gap-4">
              <h1 className="text-lg font-bold">Language</h1>
              <div className="grid grid-cols-5 gap-2">
                {job?.languages?.map((language, i) => (
                  <p
                    key={i}
                    className={`text-[#585858] px-3 py-0.5 rounded-md text-center`}
                    style={{ backgroundColor: languageColors[i % 10] }}
                  >
                    {language?.name}
                  </p>
                ))}
              </div>
            </div>
            <h1 className="top-0 text-lg font-bold">Price: {job?.price}₸</h1>
          </div>
        </div>
        <div className="flex items-baseline mb-6">
          <h1 className="text-lg font-bold mr-2">Location: </h1>
          <p> {job?.location}</p>
        </div>
        <div className="mb-6">
          <h1 className="text-lg font-bold mb-1">Description</h1>
          <p
            className={`ml-3  px-4 py-3 ${
              job?.description ? "bg-[#EAEAEA]" : ""
            }`}
          >
            {job?.description}
          </p>
        </div>
        <div className="flex items-baseline mb-6">
          <h1 className="text-lg font-bold">Specialization: </h1>
          <div className="ml-2 grid grid-cols-3 gap-2">
            {job?.specializations?.map((specialization, i) => (
              <p key={i} className="text-[#196FD3]">
                #{specialization?.name}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-baseline mb-6">
          <h1 className="text-lg font-bold">Service Types: </h1>
          <div className="ml-2 grid grid-cols-2 gap-2">
            {job?.serviceTypes?.map((serviceType, i) => (
              <p key={i} className="text-[#196FD3]">
                #{serviceType?.name}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button className="text-[#D8000D] border-3 rounded-sm font-semibold flex items-center justify-center gap-2 w-30 h-9">
            Report
            <img src={warn} alt="warn icon" className="w-4 h-4 mt-1" />
          </button>
          <button
            onClick={() => enrollProject(job?.id)}
            className="bg-[#2A9E97] text-white rounded-sm font-semibold flex items-center justify-center gap-2 w-30 h-9"
          >
            Apply
            {/* <img src={chatgreen} alt="chat icon" className="w-4 h-4 mt-1" /> */}
          </button>
        </div>
      </div>
    </>
  );
};

export default JobCards;
