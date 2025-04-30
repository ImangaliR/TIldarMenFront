import { useEffect, useState } from "react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { useUser } from "../../utils/contexts/UserContext";
import api from "../../services/api";

const PostProjects = () => {
  const navigate = useNavigate();
  const isCreatePage = useMatch("/employer/post-projects/create-project");
  const [projects, setProjects] = useState();
  const { userId } = useUser();

  useEffect(() => {
    api
      .get(`/employer/${userId}/jobs`)
      .then((res) => {
        setProjects(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching locations:", err);
      });
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB"); // outputs "13/04/2025"
  };

  function formatDateRange(dateString) {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options).replace(",", " -");
  }

  return (
    <>
      {isCreatePage ? (
        <Outlet />
      ) : (
        <div>
          <h1 className="text-3xl font-bold">Posting Projects</h1>
          <div className="bg-white w-280 min-h-170 px-15 py-10 rounded-md shadow-md mt-2">
            <div className="flex items-center justify-end w-full h-10 mb-15">
              <button
                onClick={() => navigate("create-project")}
                className="py-1.5 px-5 bg-[#38BF4C] text-white rounded-xl"
              >
                New Project
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-center font-semibold text-gray-600">
                      Project Title
                    </th>
                    <th className="px-4 py-2 text-center font-semibold text-gray-600">
                      Start Date
                    </th>
                    <th className="px-4 py-2 text-center font-semibold text-gray-600">
                      End Date
                    </th>
                    <th className="px-4 py-2 text-center font-semibold text-gray-600">
                      Published Date
                    </th>
                    <th className="px-4 py-2 text-center font-semibold text-gray-600">
                      Price
                    </th>
                    <th className="px-4 py-2 text-center font-semibold text-gray-600">
                      Number of Applicants
                    </th>
                    <th className="px-4 py-2 text-center font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {projects?.map((proj, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-blue-50 ${
                        idx === 4 ? "bg-blue-50" : ""
                      }`}
                    >
                      <td className="px-4 py-2 text-center">{proj.title}</td>

                      <td className="px-4 py-2 text-center">
                        {formatDate(proj.startDate)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {formatDate(proj.endDate)}
                      </td>
                      <td className="px-4 py-2 text-center text-blue-600">
                        {formatDateRange(proj.publicationDate)}
                      </td>
                      <td className="px-4 py-2 text-center">{proj.price}</td>
                      <td className="px-4 py-2 text-center">
                        {proj.applicantsCount}
                      </td>
                      <td className="px-4 py-2 text-gray-400 text-center cursor-pointer">
                        ⋮
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostProjects;
