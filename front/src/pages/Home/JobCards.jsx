import warn from "../../assets/warn.png";
import chatgreen from "../../assets/chatgreen.png";
import { useUser } from "../../utils/contexts/UserContext";
import { toast } from "react-toastify";
import api from "./../../services/api";
import { useState } from "react";
import ReportJob from "../../components/Report/ReportJob";

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
  const [isOpenReport, setIsOpenReport] = useState(false);

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

  const handleLeaveReport = () => {
    setIsOpenReport(!isOpenReport);
  };

  function isUrgent(startDate) {
    const now = new Date();
    const start = new Date(startDate);
    const diffInMs = start - now;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays <= 3;
  }

  return (
    <>
      <div className="bg-white shadow-sm rounded-lg p-5 md:px-10 md:py-6">
        <div className="flex items-center justify-between gap-5">
          <h1 className="md:text-lg font-semibold md:font-bold">
            {job?.title}
          </h1>
          <p
            className={`md:hidden text-white px-3 py-0.5 md:px-6 md:py-1 text-sm rounded-sm
              ${isUrgent(job?.startDate) ? "bg-red-700" : "bg-[#05E400]"}
            `}
          >
            {isUrgent(job?.startDate) ? "Urgent" : "New"}
          </p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center text-[#949494] gap-2 font-semibold ml-3">
            <p>{formatDate(job?.startDate)}, </p>
            <p>{formatDate(job?.endDate)}</p>
          </h2>
          <p
            className={`hidden md:block text-white px-4 md:px-6 py-1 text-center rounded-sm
              ${isUrgent(job?.startDate) ? "bg-red-700" : "bg-[#05E400]"}
            `}
          >
            {isUrgent(job?.startDate) ? "Urgent" : "New"}
          </p>
        </div>
        <div className="md:hidden w-full mb-6">
          <div className="md:flex items-baseline gap-1 md:gap-4">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="md:text-lg font-semibold md:font-bold">
                Language:
              </h1>
              <h1 className="top-0 md:text-lg font-semibold md:font-bold">
                Price: {job?.price}₸
              </h1>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {job?.languages?.map((language, i) => (
                <p
                  key={i}
                  className={`text-[#585858] px-2 md:px-3 py-0.5 rounded-md text-center`}
                  style={{ backgroundColor: languageColors[i % 10] }}
                >
                  {language?.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden md:block w-full mb-6">
          <div className="flex items-baseline justify-between gap-8">
            <div className="flex items-baseline gap-4">
              <h1 className="md:text-lg font-semibold md:font-bold">
                Language
              </h1>
              <div className="grid md:grid-cols-5 gap-2">
                {job?.languages?.map((language, i) => (
                  <p
                    key={i}
                    className={`text-[#585858] px-2 md:px-3 py-0.5 rounded-md text-center`}
                    style={{ backgroundColor: languageColors[i % 10] }}
                  >
                    {language?.name}
                  </p>
                ))}
              </div>
            </div>
            <h1 className="top-0 md:text-lg font-semibold md:font-bold">
              Price: {job?.price}₸
            </h1>
          </div>
        </div>
        <div className="flex items-baseline gap-2 mb-6">
          <h1 className="md:text-lg font-semibold md:font-boldmr-2">
            Location:
          </h1>
          <p>{job?.location}</p>
        </div>
        <div className="mb-6">
          <h1 className="md:text-lg font-semibold  md:font-boldmb-1">
            Description
          </h1>
          <p
            className={`ml-3  px-4 py-3 ${
              job?.description ? "bg-[#EAEAEA]" : ""
            }`}
          >
            {job?.description}
          </p>
        </div>
        <div className="flex items-baseline mb-6">
          <h1 className="md:text-lg font-semibold md:font-bold">
            Specialization:
          </h1>
          <div className="ml-2 grid md:grid-cols-3 gap-2">
            {job?.specializations?.map((specialization, i) => (
              <p key={i} className="text-[#196FD3]">
                #{specialization?.name}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-baseline mb-6">
          <h1 className="md:text-lg font-semibold md:font-bold">
            Service Types:
          </h1>
          <div className="ml-2 grid md:grid-cols-2 gap-2">
            {job?.serviceTypes?.map((serviceType, i) => (
              <p key={i} className="text-[#196FD3]">
                #{serviceType?.name}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => setIsOpenReport(!isOpenReport)}
            className="text-[#D8000D] border-3 rounded-sm font-semibold flex items-center justify-center gap-1 md:gap-2 w-20 md:w-30 h-9"
          >
            Report
            <img
              src={warn}
              alt="warn icon"
              className="hidden md:block w-4 h-4 mt-0.5 md:mt-1"
            />
          </button>
          {isOpenReport && (
            <ReportJob handleLeaveReport={handleLeaveReport} id={job?.id} />
          )}
          <button
            onClick={() => enrollProject(job?.id)}
            className="bg-[#2A9E97] text-white rounded-sm font-semibold flex items-center justify-center gap-2 w-20 md:w-30 h-9"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default JobCards;
