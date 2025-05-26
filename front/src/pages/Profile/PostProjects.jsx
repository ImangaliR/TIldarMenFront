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
      .catch((err) => {});
  }, [projects]);

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
        <div className="w-full md:w-fit">
          <h1 className="text-2xl md:text-3xl ml-2 md:ml-0 font-bold">
            Posting Projects
          </h1>
          <div className="bg-white px-2 py-4 md:w-280 md:min-h-170 md:px-15 md:py-10 rounded-md shadow-md mt-2">
            <div className="flex items-center justify-end w-full h-10 mb-3 md:mb-10">
              <button
                onClick={() => navigate("create-project")}
                className="py-1.5 px-5 bg-[#38BF4C] text-white text-sm md:text-base rounded-xl"
              >
                New Project
              </button>
            </div>
            {projects?.length !== 0 ? (
              <div className="overflow-x-auto shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="text-[#7D7D7D]">
                    <tr>
                      <th className="p-1 md:p-4 text-center font-semibold">
                        Project Title
                      </th>
                      <th className="p-1 md:p-4 text-center font-semibold">
                        Start Date
                      </th>
                      <th className="p-1 md:p-4 text-center font-semibold">
                        End Date
                      </th>
                      <th className="p-1 md:p-4 text-center font-semibold">
                        Published Date
                      </th>
                      <th className="p-1 md:p-4 text-center font-semibold">
                        Price
                      </th>
                      <th className="p-1 md:p-4 text-center font-semibold">
                        Number of Applicants
                      </th>
                      <th className="p-1 md:p-4 text-center font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs md:text-base">
                    {projects?.map((proj, idx) => (
                      <tr
                        key={idx}
                        className={`hover:bg-blue-50 cursor-pointer text-[#7D7D7D]`}
                      >
                        <td
                          onClick={() =>
                            navigate(`project-applicants/${proj.id}`)
                          }
                          className="p-1 md:px-4 md:py-3 text-center text-black"
                        >
                          {proj.title}
                        </td>
                        <td
                          onClick={() =>
                            navigate(`project-applicants/${proj.id}`)
                          }
                          className="p-1 md:px-4 md:py-3 text-center"
                        >
                          {formatDate(proj.startDate)}
                        </td>
                        <td
                          onClick={() =>
                            navigate(`project-applicants/${proj.id}`)
                          }
                          className="p-1 md:px-4 md:py-3 text-center"
                        >
                          {formatDate(proj.endDate)}
                        </td>
                        <td
                          onClick={() =>
                            navigate(`project-applicants/${proj.id}`)
                          }
                          className="p-1 md:px-4 md:py-3 text-center text-blue-600"
                        >
                          {formatDateRange(proj.publicationDate)}
                        </td>
                        <td
                          onClick={() =>
                            navigate(`project-applicants/${proj.id}`)
                          }
                          className="p-1 md:px-4 md:py-3 text-center"
                        >
                          {proj.price}₸
                        </td>
                        <td
                          onClick={() =>
                            navigate(`project-applicants/${proj.id}`)
                          }
                          className="p-1 md:px-4 md:py-3 text-center text-blue-600"
                        >
                          {proj.applicantsCount}
                        </td>
                        <td
                          onClick={() => navigate(`edit-project/${proj.id}`)}
                          className="p-1 md:px-4 md:py-3 text-gray-400 text-center cursor-pointer hover:brightness-120"
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
              <div className="min-h-50 flex items-center justify-center mt-10 md:mt-50">
                <p className="text-[#8b8b8b] text-xl md:text-3xl">
                  No projects yet
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostProjects;
