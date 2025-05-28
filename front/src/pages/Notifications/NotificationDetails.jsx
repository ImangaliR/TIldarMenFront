import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";
import SimpleLoader from "../../components/Loader/SimpleLoader";
import { useUser } from "../../utils/contexts/UserContext";
import rightarrow from "../../assets/rightarrow.png";

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

  console.log(notification);

  return (
    <>
      <div
        onClick={() => navigate("/notifications")}
        className="flex items-center gap-2 md:px-60 cursor-pointer w-fit mt-5"
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
                <img
                  src={notification.profileImageUrl}
                  alt="profile image"
                  className="w-15 h-15 rounded-full object-cover"
                />
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
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default NotificationDetails;
