import React, { useEffect, useState } from "react";
import api from "../../services/api";
import TokenService from "../../services/token.service";

const projectData = [
  {
    name: "Project1",
    status: "In Negotiation",
    price: 30000,
    deadline: "DD/MM/YYYY",
    activity: "Chat",
  },
  {
    name: "Project Title",
    status: "Selected",
    price: 40000,
    deadline: "DD/MM/YYYY",
    activity: "Report",
  },
  {
    name: "Project Title2",
    status: "Pending",
    price: 10000,
    deadline: "DD/MM/YYYY",
    activity: "Chat",
  },
  {
    name: "Project Title 3",
    status: "Rejected",
    price: 10000,
    deadline: "DD/MM/YYYY",
    activity: "",
    selected: true,
  },
  {
    name: "Project Title 4",
    status: "No Status",
    price: 20000,
    deadline: "DD/MM/YYYY",
    activity: "",
  },
];

const statusColors = {
  "In Negotiation": "bg-yellow-100 text-yellow-700",
  Selected: "bg-green-100 text-green-700",
  Pending: "bg-purple-100 text-purple-700",
  Rejected: "bg-red-100 text-red-700",
  "No Status": "bg-gray-200 text-gray-600",
};

const AppliedProjects = () => {
  const userID = TokenService.getUserId();
  const [applications, setApplications] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get(`/translator/${userID}/applications`);
        setApplications(response.data?.data);
      } catch (err) {
        console.error("Axios Error:", err);
        console.log(err.response?.data || "Failed to fetch cities.");
      }
    };

    fetchApplications();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get(`/translator/${userID}/requests`);
        setRequests(response.data?.data);
      } catch (err) {
        console.error("Axios Error:", err);
        console.log(err.response?.data || "Failed to fetch cities.");
      }
    };

    fetchRequests();
  }, []);

  return (
    <>
      <main className="w-full">
        <div className="bg-white w-280 h-200 rounded-lg shadow-xs">
          <div className="overflow-x-auto p-20">
            <table className="min-w-full bg-white shadow-sm rounded-lg">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500 border-b">
                  <th className="py-3 px-4">Project Name</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4">Activity</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {projectData.map((project, index) => (
                  <tr
                    key={index}
                    className={`border-b hover:bg-gray-50 ${
                      project.selected ? "bg-gray-100" : ""
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {project.name}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          statusColors[project.status]
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{project.price}</td>
                    <td className="py-3 px-4">{project.deadline}</td>
                    <td className="py-3 px-4">
                      {project.activity === "Chat" && (
                        <button className="bg-indigo-600 text-white text-xs px-4 py-1 rounded-full">
                          Chat
                        </button>
                      )}
                      {project.activity === "Report" && (
                        <button className="text-red-500 border border-red-400 text-xs px-4 py-1 rounded-full">
                          Report
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default AppliedProjects;
