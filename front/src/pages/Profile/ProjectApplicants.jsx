import { useEffect, useState } from "react";
import { useUser } from "../../utils/contexts/UserContext";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import profileicon from "../../assets/profileicon.png";

const ProjectApplicants = () => {
  const { id } = useParams();
  const { userId } = useUser();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    api
      .get(`/employer/job/${id}/applicants`)
      .then((res) => {
        setApplicants(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching locations:", err);
      });
  }, []);

  return (
    <>
      <main className="w-full">
        <button
          onClick={() => navigate("/employer/post-projects")}
          className="text-[#317BFF] my-2"
        >
          back
        </button>
        <div className="bg-white w-280 h-200 rounded-lg shadow-xs">
          <div className="overflow-x-auto p-20">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-center font-semibold text-gray-600">
                    Profile Image
                  </th>
                  <th className="px-4 py-2 text-center font-semibold text-gray-600">
                    Full Name
                  </th>
                  <th className="px-4 py-2 text-center font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-2 text-center font-semibold text-gray-600">
                    Send at
                  </th>
                  <th className="px-4 py-2 text-center font-semibold text-gray-600">
                    Price
                  </th>
                  <th className="px-4 py-2 text-center font-semibold text-gray-600">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applicants?.map((applicant, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-blue-50 ${
                      idx === 4 ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="px-4 py-2 text-center">
                      <img
                        src={applicant?.profileImageUrl || profileicon}
                        alt="profile image"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    </td>

                    <td className="px-4 py-2 text-center">
                      {applicant.firstName} {applicant.lastName}
                    </td>

                    <td className="px-4 py-2 text-center">
                      {applicant.status}
                    </td>

                    <td className="px-4 py-2 text-center text-blue-600">
                      {applicant.sendAt}
                    </td>

                    <td className="px-4 py-2 text-center">{applicant.price}</td>

                    <td className="px-4 py-2 text-center">
                      {applicant.rating}
                    </td>

                    <td className="px-4 py-2 text-gray-400 text-center cursor-pointer">
                      <button className="flex items-center gap-1 text-[#38BF4C]">
                        Edit
                        <img src={pen} alt="pen image" className="w-3 h-3" />
                      </button>
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

export default ProjectApplicants;
