import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import profileicon from "../../assets/profileicon.png";

const statusColors = {
  REJECTED: "#FDD3D0",
  PENDING: "#CFBDFE ",
  ACCEPTED: "#AFF4C6",
};

const ProjectApplicants = () => {
  const { id } = useParams();
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
  const formatStatus = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

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
              <table className="min-w-full divide-y divide-gray-200 text-sm shadow-sm">
                <thead className="text-[#7D7D7D]">
                  <tr>
                    <th className="py-4 px-4 text-center font-semibold">
                      Profile Image
                    </th>
                    <th className="py-4 px-4 text-center font-semibold">
                      Full Name
                    </th>
                    <th className="py-4 px-4 text-center font-semibold">
                      Status
                    </th>
                    <th className="py-4 px-4 text-center font-semibold">
                      Send at
                    </th>
                    <th className="py-4 px-4 text-center font-semibold">
                      Price
                    </th>
                    <th className="py-4 px-4 text-center font-semibold">
                      Rating
                    </th>
                    <th className="py-4 px-4 text-center font-semibold">
                      Activity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {applicants?.map((applicant, idx) => (
                    <tr key={idx} className={`hover:bg-blue-50`}>
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
                        <p
                          className="rounded-lg py-1"
                          style={{
                            backgroundColor: statusColors[applicant.status],
                          }}
                        >
                          {formatStatus(applicant.status)}
                        </p>
                      </td>

                      <td className="px-4 py-2 text-center text-blue-600">
                        {formatDate(applicant.sendAt)}
                      </td>

                      <td className="px-4 py-2 text-center">
                        {applicant.price}
                      </td>

                      <td className="px-4 py-2 text-center">
                        {applicant.rating.toFixed(2)}
                      </td>

                      <td className="px-4 py-2 text-center">Approve</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center mt-50">
                <p className="text-[#8b8b8b] text-3xl">No applicants yet</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ProjectApplicants;
