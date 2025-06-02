import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";
import SimpleLoader from "../../components/Loader/SimpleLoader";
import { useUser } from "../../utils/contexts/UserContext";
import rightarrow from "../../assets/rightarrow.png";
import employericon from "../../assets/employericon.png";
import profileicon from "../../assets/profileicon.png";

const NotificationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId } = useUser();
  const [notification, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get(`notification/${userId}/get/${id}`)
      .then((res) => {
        setNotification(res.data.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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

  return (
    <>
      <div
        onClick={() => navigate("/notifications")}
        className="flex items-center gap-1 md:px-60 cursor-pointer w-fit mt-5 ml-4"
      >
        <img
          src={rightarrow}
          alt="arrow"
          className="rotate-180 w-3 h-3 mt-1 md:mt-0"
        />
        <p>Back to notifications</p>
      </div>
      <main className="flex gap-4 px-1 md:px-60 pt-2 pb-1">
        <div className="bg-white rounded-lg py-10 w-full shadow-md">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <SimpleLoader className="h-6 md:h-7" />
            </div>
          ) : (
            <div className="rounded-lg px-4 py-1 md:px-8 md:py-4">
              <div className="flex gap-5">
                {notification.type === "WELCOME" ||
                notification.type === "JOB_POSTED" ||
                notification.type === "PAYMENT_SENT" ? (
                  []
                ) : (
                  <img
                    src={
                      notification.profileImageUrl
                        ? notification.profileImageUrl
                        : notification.type === "APPLICATION_SEND"
                        ? profileicon
                        : notification.type === "REQUEST_RESPONDED"
                        ? profileicon
                        : notification.type === "APPLICATION_RESPONDED"
                        ? employericon
                        : notification.type === "REQUEST_SEND"
                        ? employericon
                        : notification.type === "PAYMENT_RECEIVED" &&
                          employericon
                    }
                    alt="profile image"
                    className="w-15 h-15 rounded-full object-cover"
                  />
                )}
                <div className="grid items-center">
                  <p className="md:text-xl font-semibold">
                    {notification.title}
                  </p>
                  <p className="md:text-lg">
                    {formatDate(notification.sendAt)}
                  </p>
                </div>
              </div>
              <p className="text-gray-500 mt-4 md:text-lg">
                {notification.message}
              </p>
              <div className="flex justify-center mt-5 md:mt-10">
                {notification.type === "JOB_POSTED" ? (
                  <button
                    onClick={() => navigate("/project-catalog")}
                    className="text-[#71C39C] px-5 py-2 border-1 rounded-lg"
                  >
                    Go to projects catalog
                  </button>
                ) : notification.type === "APPLICATION_SEND" ? (
                  <button
                    onClick={() => navigate("/employer/post-projects")}
                    className="text-[#71C39C] px-5 py-2 border-1 rounded-lg"
                  >
                    Go to profile
                  </button>
                ) : notification.type === "REQUEST_RESPONDED" ? (
                  <button
                    onClick={() => navigate("/employer/post-projects")}
                    className="text-[#71C39C] px-5 py-2 border-1 rounded-lg"
                  >
                    Go to profile
                  </button>
                ) : notification.type === "APPLICATION_RESPONDED" ? (
                  <button
                    onClick={() => navigate("/translator/applied-projects")}
                    className="text-[#71C39C] px-5 py-2 border-1 rounded-lg"
                  >
                    Go to profile
                  </button>
                ) : notification.type === "REQUEST_SEND" ? (
                  <button
                    onClick={() => navigate("/translator/applied-projects")}
                    className="text-[#71C39C] px-5 py-2 border-1 rounded-lg"
                  >
                    Go to profile
                  </button>
                ) : notification.type === "PAYMENT_SENT" ? (
                  <button
                    onClick={() => navigate("/employer/payment")}
                    className="text-[#71C39C] px-5 py-2 border-1 rounded-lg"
                  >
                    Go to transactions
                  </button>
                ) : (
                  notification.type === "PAYMENT_RECEIVED" && (
                    <button
                      onClick={() => navigate("/translator/wallet")}
                      className="text-[#71C39C] px-5 py-2 border-1 rounded-lg"
                    >
                      Go to Wallet
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default NotificationDetails;
