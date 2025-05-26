import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useUser } from "../../utils/contexts/UserContext";

const statusColors = {
  ACCEPTED: "bg-green-100 text-green-700",
  PENDING: "bg-purple-200 text-purple-800",
  REJECTED: "bg-red-100 text-red-700",
};

const AppliedProjects = () => {
  const { userId } = useUser();
  const [applications, setApplications] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get(`/translator/${userId}/applications`);
        setApplications(response.data?.data);
      } catch (err) {
        toast.error("Something went wrong");
      }
    };

    fetchApplications();
  }, [userId, refreshFlag]);

  const refreshApplications = () => {
    setRefreshFlag((prev) => !prev);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const acceptRequest = async (id) => {
    try {
      const res = await api.put(`/job-request/${id}/request?status=accepted`);
      refreshApplications();
      toast.success("Request accepted");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const rejectRequest = async (id) => {
    try {
      const res = await api.put(`/job-request/${id}/request?status=rejected`);
      refreshApplications();
      toast.success("Request rejected");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <main className="w-full md:w-fit">
        <div className="bg-white md:w-280 min-h-50 md:h-max rounded-lg shadow-xs">
          <div className="overflow-x-auto md:p-20">
            {applications?.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200 text-sm shadow-sm">
                <thead className="text-[#7D7D7D] text-center">
                  <tr>
                    <th className="p-1 md:p-4 font-semibold">Project Name</th>
                    <th className="p-1 md:p-4 font-semibold">Status</th>
                    <th className="p-1 md:p-4 font-semibold">Price</th>
                    <th className="p-1 md:p-4 font-semibold">Offer Sent</th>
                    <th className="p-1 md:p-4 font-semibold">Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs md:text-base">
                  {applications?.map((application, index) => (
                    <tr key={index} className="hover:bg-blue-50 text-center">
                      <td className="p-1 md:p-4 font-medium text-gray-800">
                        {application.job.title}
                      </td>
                      <td className="p-1 md:p-4">
                        <span
                          className={`text-xs py-1 px-1.5 md:py-2 md:px-3 rounded-full ${
                            statusColors[application.status]
                          }`}
                        >
                          {application.status === "PENDING"
                            ? "Pending"
                            : application.status === "ACCEPTED"
                            ? "Accepted"
                            : "Rejected"}
                        </span>
                      </td>
                      <td className="p-1 md:p-4">{application.job.price}</td>
                      <td className="p-1 md:p-4">
                        {formatDate(application.appliedAt)}
                      </td>
                      <td className="text-xs md:text-base w-fit py-1 md:py-4">
                        {application.status === "PENDING" &&
                        application.type === "Request" ? (
                          <div className="grid md:flex gap-2 items-center justify-center">
                            <button
                              onClick={() =>
                                acceptRequest(application.applicationId)
                              }
                              className="text-green-500 border-1 px-1 md:px-3 py-1 rounded-lg"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                rejectRequest(application.applicationId)
                              }
                              className="text-red-500 border-1 px-1 md:px-3 py-1 rounded-lg"
                            >
                              Reject
                            </button>
                          </div>
                        ) : application.status === "ACCEPTED" ? (
                          <button className="bg-indigo-500 text-white border-1 px-2 md:px-14 py-1 rounded-lg">
                            Chat
                          </button>
                        ) : (
                          <p className="text-xl">---</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="min-h-50 flex items-center justify-center mt-5 md:mt-10">
                <p className="text-[#8b8b8b] text-xl md:text-3xl">
                  No applications yet
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default AppliedProjects;
