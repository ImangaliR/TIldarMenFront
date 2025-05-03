import { useEffect, useState } from "react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { useUser } from "../../utils/contexts/UserContext";
import api from "../../services/api";
import pen from "../../assets/pen.png";

const PostProjects = () => {
  const navigate = useNavigate();
  const isCreatePage = useMatch("/employer/post-projects/create-project");
  const isApplicantsPage = useMatch(
    "/employer/post-projects/project-applicants/:id"
  );
  const isEditPage = useMatch("/employer/post-projects/edit-project/:id");
  const [projects, setProjects] = useState([]);
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

  useEffect(() => {}, [projects]);

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
      {isCreatePage || isApplicantsPage || isEditPage ? (
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
            {projects?.length !== 0 ? (
              <div className="overflow-x-auto shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="text-[#7D7D7D]">
                    <tr>
                      <th className="px-4 py-4 text-center font-semibold">
                        Project Title
                      </th>
                      <th className="px-4 py-4 text-center font-semibold">
                        Start Date
                      </th>
                      <th className="px-4 py-4 text-center font-semibold">
                        End Date
                      </th>
                      <th className="px-4 py-4 text-center font-semibold">
                        Published Date
                      </th>
                      <th className="px-4 py-4 text-center font-semibold">
                        Price
                      </th>
                      <th className="px-4 py-4 text-center font-semibold">
                        Number of Applicants
                      </th>
                      <th className="px-4 py-4 text-center font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {projects?.map((proj, idx) => (
                      <tr
                        key={idx}
                        className={`hover:bg-blue-50 cursor-pointer text-[#7D7D7D]`}
                      >
                        <td
                          onClick={() =>
                            navigate(`project-applicants/${proj.id}`)
                          }
                          className="px-4 py-3 text-center text-black"
                        >
                          {proj.title}
                        </td>
                        <td
                          onClick={() =>
                            navigate(`project-applicants/${proj.id}`)
                          }
                          className="px-4 py-3 text-center"
                        >
                          {formatDate(proj.startDate)}
                        </td>
                        <td
                          onClick={() =>
                            navigate(`project-applicants/${proj.id}`)
                          }
                          className="px-4 py-3 text-center"
                        >
                          {formatDate(proj.endDate)}
                        </td>
                        <td
                          onClick={() =>
                            navigate(`project-applicants/${proj.id}`)
                          }
                          className="px-4 py-3 text-center text-blue-600"
                        >
                          {formatDateRange(proj.publicationDate)}
                        </td>
                        <td
                          onClick={() =>
                            navigate(`project-applicants/${proj.id}`)
                          }
                          className="px-4 py-3 text-center"
                        >
                          {proj.price}₸
                        </td>
                        <td
                          onClick={() =>
                            navigate(`project-applicants/${proj.id}`)
                          }
                          className="px-4 py-3 text-center text-blue-600"
                        >
                          {proj.applicantsCount}
                        </td>
                        <td
                          onClick={() => navigate(`edit-project/${proj.id}`)}
                          className="px-4 py-3 text-gray-400 text-center cursor-pointer hover:brightness-120"
                        >
                          <button className="flex items-center gap-1 text-[#38BF4C] w-full">
                            Edit
                            <img
                              src={pen}
                              alt="pen image"
                              className="w-3 h-3"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex items-center justify-center mt-50">
                <p className="text-[#8b8b8b] text-3xl">No projects yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostProjects;
