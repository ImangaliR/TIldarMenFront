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

  function formatDate(dateString) {
    const options = {
      timeZone: "Asia/Almaty",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options).replace(",", " -");
  }

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
            {applicants?.length !== 0 ? (
              <table className="min-w-full divide-y divide-gray-200 text-sm shadow-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 text-center font-semibold text-gray-600">
                      Profile Image
                    </th>
                    <th className="py-2 text-center font-semibold text-gray-600">
                      Full Name
                    </th>
                    <th className="py-2 text-center font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="py-2 text-center font-semibold text-gray-600">
                      Send at
                    </th>
                    <th className="py-2 text-center font-semibold text-gray-600">
                      Price
                    </th>
                    <th className="py-2 text-center font-semibold text-gray-600">
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
                      <td className="flex justify-center px-4 py-2">
                        <img
                          src={applicant?.profileImageUrl || profileicon}
                          alt="profile image"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </td>

                      <td className="px-4 py-2 text-center">
                        {applicant.firstName} {applicant.lastName}
                      </td>

                      <td className="px-4 py-2 text-center">
                        {applicant.status}
                      </td>

                      <td className="px-4 py-2 text-center text-blue-600">
                        {formatDate(applicant.sendAt)}
                      </td>

                      <td className="px-4 py-2 text-center">
                        {applicant.price}
                      </td>

                      <td className="px-4 py-2 text-center">
                        {applicant.rating}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center mt-50">
                <p className="text-[#8b8b8b] text-3xl">No projects yet</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ProjectApplicants;
