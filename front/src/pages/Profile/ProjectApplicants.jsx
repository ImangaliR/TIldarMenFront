import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import profileicon from "../../assets/profileicon.png";
import vector from "../../assets/vector.png";
import paymentcard from "../../assets/paymentcard.png";
import { toast } from "react-toastify";

const statusColors = {
  REJECTED: "#FDD3D0",
  PENDING: "#CFBDFE ",
  ACCEPTED: "#AFF4C6",
};

const ProjectApplicants = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [makePayment, setMakePayment] = useState(false);

  useEffect(() => {
    api
      .get(`/employer/job/${id}/applicants`)
      .then((res) => {
        setApplicants(res.data.data);
      })
      .catch((err) => {});
  }, [id, refreshFlag]);

  const refreshApplicants = () => {
    setRefreshFlag((prev) => !prev);
  };

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

  const acceptRequest = async (id) => {
    try {
      const res = await api.put(
        `/job-application/${id}/application?status=accepted`
      );
      refreshApplicants();
      toast.success("Request accepted");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const rejectRequest = async (id) => {
    try {
      const res = await api.put(
        `/job-application/${id}/application?status=rejected`
      );
      refreshApplicants();
      toast.success("Request rejected");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const makePaymentHandler = async (applicationId) => {
    try {
      const res = await api.post(`/stripe/payment/${applicationId}/job/${id}`);
      toast.success("Payment successful");
      setMakePayment(false);
      refreshApplicants();
    } catch (err) {
      if (
        err?.response?.data?.data?.includes(
          "This translator does not have a stripe account"
        )
      ) {
        toast.error("This user does not have a Stripe account");
      } else {
        toast.error("Payment failed");
      }
    }
  };

  return (
    <>
      <main className="w-full md:w-fit">
        <div className="flex items-center md:text-lg gap-3 ml-2 md:ml-5">
          <button
            onClick={() => navigate("/employer/post-projects")}
            className="my-2"
          >
            Post projects
          </button>
          <img src={vector} alt="vector icon" className="w-1.5 md:w-2" />
          <h1 className="text-[#317BFF]">Project applicants</h1>
        </div>
        <div className="bg-white md:w-280 md:h-200 rounded-lg shadow-xs">
          <div className="overflow-x-auto md:p-20">
            {applicants?.length !== 0 ? (
              <table className="min-w-full divide-y divide-gray-200 text-sm shadow-sm">
                <thead className="text-[#7D7D7D]">
                  <tr>
                    <th className="p-1.5 md:p-4 text-center font-semibold">
                      Profile Image
                    </th>
                    <th className="p-1.5 md:p-4 text-center font-semibold">
                      Full Name
                    </th>
                    <th className="p-1.5 md:p-4 text-center font-semibold">
                      Status
                    </th>
                    <th className="p-3 md:p-4 text-center font-semibold">
                      Send at
                    </th>
                    <th className="p-1.5 md:p-4 text-center font-semibold">
                      Price
                    </th>
                    <th className="p-1.5 md:p-4 text-center font-semibold">
                      Rating
                    </th>
                    <th className="p-1.5 md:p-4 text-center font-semibold">
                      Activity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs md:text-base">
                  {applicants?.map((applicant, idx) => (
                    <tr key={idx} className={`hover:bg-blue-50`}>
                      <td className="flex justify-center items-center p-1.5 md:px-4 md:py-2">
                        <img
                          src={applicant?.profileImageUrl || profileicon}
                          alt="profile image"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </td>

                      <td className="p-1.5 md:px-4 md:py-2 text-center">
                        {applicant.firstName} {applicant.lastName}
                      </td>

                      <td className="p-1.5 md:px-4 md:py-2 text-center">
                        <p
                          className="rounded-lg text-xs md:text-base py-1 md:p-1"
                          style={{
                            backgroundColor: statusColors[applicant.status],
                          }}
                        >
                          {formatStatus(applicant.status)}
                        </p>
                      </td>

                      <td className="p-1.5 md:px-4 md:py-2 text-center text-blue-600">
                        {formatDate(applicant.sendAt)}
                      </td>

                      <td className="p-1.5 md:px-4 md:py-2 text-center">
                        {applicant.price}₸
                      </td>

                      <td className="p-1.5 md:px-4 md:py-2 text-center">
                        {applicant.rating.toFixed(2)}
                      </td>

                      <td className="p-1.5 md:px-4 md:py-2 text-center">
                        {applicant.status === "PENDING" &&
                        applicant.type === "Application" ? (
                          <div className="grid md:flex gap-2 items-center justify-center">
                            <button
                              onClick={() =>
                                acceptRequest(applicant.applicationId)
                              }
                              className="text-green-500 border-1 px-1 md:px-3 py-1 rounded-lg"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                rejectRequest(applicant.applicationId)
                              }
                              className="text-red-500 border-1 px-1 md:px-3 py-1 rounded-lg"
                            >
                              Reject
                            </button>
                          </div>
                        ) : applicant.status === "ACCEPTED" ? (
                          <div className="flex items-center gap-2">
                            <button className="bg-[#575982] text-white border-1 px-2 md:px-10 py-1 rounded-lg">
                              Chat
                            </button>
                            <button onClick={() => setMakePayment(true)}>
                              <img
                                src={paymentcard}
                                alt=""
                                className="w-11 h-11"
                              />
                            </button>
                            {makePayment && (
                              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                                <div className="bg-white py-8 md:py-10 px-4 md:px-5 rounded-lg shadow-lg">
                                  <h2 className="text-lg md:text-xl mb-4">
                                    Make Payment
                                  </h2>
                                  <p className="text-sm md:text-base mb-4">
                                    Please proceed with the payment for{" "}
                                    {applicant.firstName} {applicant.lastName}.
                                  </p>
                                  <div className="flex items-center justify-center gap-2">
                                    <button
                                      onClick={() =>
                                        makePaymentHandler(
                                          applicant.applicationId
                                        )
                                      }
                                      className="bg-[#575982] text-white w-full py-1 md:py-2 rounded-lg"
                                    >
                                      Proceed
                                    </button>
                                    <button
                                      onClick={() => setMakePayment(false)}
                                      className="text-red-500 border-1 w-full py-1 md:py-2 rounded-lg"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-xl">...</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="min-h-50 flex items-center justify-center md:mt-35">
                <p className="text-[#8b8b8b] text-xl md:text-3xl">
                  No applicants yet
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ProjectApplicants;
