import { NavLink, useMatch } from "react-router-dom";
import profileicon from "../../assets/profileicon.png";
import employericon from "../../assets/employericon.png";
import { useWebSocket } from "../../utils/contexts/WebSocketContext";

const ChatSidebar = ({ chats }) => {
  const isDetailPage = useMatch("/chat/chat-details/:id");
  const { selectedUserId, unreadMessages, subscribeToUser } = useWebSocket();

  return (
    <>
      <div
        className={`bg-white md:rounded-lg h-140 md:h-170 w-full md:w-fit md:min-w-75 lg:min-w-95 shadow-md ${
          isDetailPage ? "hidden md:block" : ""
        }`}
      >
        <div className="flex items-center justify-center gap-3 p-5 md:p-8">
          <h1 className="font-bold text-xl">Messages</h1>
        </div>
        <hr className="text-[#F3F3F3]" />
        <div className="grid gap-2 py-4 px-5 max-h-135  overflow-y-auto">
          {chats?.map((item) => (
            <NavLink
              key={item?.id}
              onClick={() => subscribeToUser(item.id)}
              to={`/chat/chat-details/${item?.id}`}
              className={({ isActive }) =>
                `h-fit w-full flex gap-4 items-center hover:bg-gray-100 p-2 rounded-xl ${
                  isActive ? "bg-gray-100" : ""
                }`
              }
            >
              {item?.profileImageUrl ? (
                <img
                  src={item?.profileImageUrl}
                  alt="profile image"
                  className="min-w-10 max-w-10 h-10 object-cover rounded-full"
                />
              ) : (
                <img
                  src={item?.role === "EMPLOYER" ? employericon : profileicon}
                  alt="profile image"
                  className="min-w-10 max-w-10 h-10 object-cover rounded-full"
                />
              )}
              <div className="flex items-center justify-between w-full">
                <h1 className="font-semibold text-lg">
                  {item.firstName} {item.lastName}
                </h1>
                {item?.id !== selectedUserId &&
                  unreadMessages[item?.id] > 0 && (
                    <span className="rounded-full bg-[#71C39C] py-1 px-2 text-white text-xs shadow-sm">
                      {unreadMessages[item?.id]}
                    </span>
                  )}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
