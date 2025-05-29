import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import api from "../../services/api";
import SimpleLoader from "../../components/Loader/SimpleLoader";
import { Outlet, useMatch, useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isDetailPage = useMatch("/notifications/notification-details/:id");

  useEffect(() => {
    api
      .get("/notification/getAll")
      .then((res) => {
        setNotifications(res.data.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [notifications]);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const datePart = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const timePart = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${datePart} - ${timePart}`;
  }

  return (
    <>
      <Navbar />
      {isDetailPage ? (
        <Outlet />
      ) : (
        <main className="flex gap-4 md:px-60 pt-5 pb-1">
          <div className="px-2 py-5 md:px-20 md:py-10 bg-white md:rounded-lg h-screen w-full shadow-md">
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <SimpleLoader className="h-6 md:h-7" />
              </div>
            ) : (
              <div>
                {notifications.length > 0 ? (
                  notifications?.map((notification, i) => (
                    <div key={i}>
                      <div
                        onClick={() =>
                          navigate(`notification-details/${notification.id}`)
                        }
                        className={`shadow-sm md:shadow-none hover:shadow-md flex items-center justify-between rounded-lg px-2 md:px-5 py-3 mb-4 cursor-pointer border-1 border-[#dcdcdc] ${
                          notification.read ? "bg-[#f4f4f4]" : "bg-white"
                        }`}
                      >
                        {notification.profileImageUrl && (
                          <img
                            src={notification.profileImageUrl}
                            alt="profile image"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <div className="ml-2 md:ml-5 flex items-center w-full justify-between">
                          <p className="font-semibold md:text-lg">
                            {notification.title}
                          </p>
                          <p className="md:text-lg">
                            {formatDate(notification.sendAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center md:mt-80">
                    <p className="text-xl md:text-3xl">No notifications yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default Notifications;
