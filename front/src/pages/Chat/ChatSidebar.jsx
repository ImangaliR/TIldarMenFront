import { NavLink, useMatch } from "react-router-dom";
import profileicon from "../../assets/profileicon.png";
import employericon from "../../assets/employericon.png";

const ChatSidebar = ({ chats }) => {
  const isDetailPage = useMatch("/chat/chat-details/:id");

  return (
    <>
      <div
        className={`bg-white md:rounded-lg h-170 w-full md:w-fit md:min-w-75 lg:min-w-95 shadow-md ${
          isDetailPage ? "hidden md:block" : ""
        }`}
      >
        <div className="flex items-center justify-center gap-3 p-5 md:p-8">
          <h1 className="font-bold text-xl">Messages</h1>
        </div>
        <hr className="text-[#F3F3F3]" />
        <div className="grid gap-2 py-4 px-5 max-h-135  overflow-y-auto">
          {chats?.map((item, i) => (
            <NavLink
              key={i}
              to={`/chat/chat-details/${item?.id}`}
              className={({ isActive }) =>
                `h-fit flex gap-4 items-center hover:bg-gray-100 p-2 rounded-xl ${
                  isActive ? "bg-gray-100" : ""
                }`
              }
            >
              {item?.profileImageUrl ? (
                <img
                  src={item?.profileImageUrl}
                  alt="profile image"
                  className="w-10 h-10 object-cover rounded-full"
                />
              ) : (
                <img
                  src={item?.role === "EMPLOYER" ? employericon : profileicon}
                  alt="profile image"
                  className="w-10 h-10 object-cover rounded-full"
                />
              )}
              <h1 className="font-semibold text-lg">
                {item.firstName} {item.lastName}
              </h1>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
