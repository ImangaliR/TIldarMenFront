import { NavLink } from "react-router-dom";
import profileicon from "../../assets/profileicon.png";

const ChatSidebar = ({ chats }) => {
  return (
    <>
      <div className="bg-white md:rounded-lg h-174 w-full md:w-fit md:min-w-75 lg:min-w-95 shadow-md">
        <div className="flex items-center justify-center gap-3 p-5 md:p-8">
          <h1 className="font-bold text-xl">Messages</h1>
          <p className="w-10 rounded-full bg-gray-200 text-center font-semibold">
            12
          </p>
        </div>
        <hr className="text-[#F3F3F3]" />
        <div className="grid gap-2 py-4 px-5 max-h-135 min-h-135 overflow-y-auto">
          {chats?.map((item, i) => (
            <NavLink
              key={i}
              to={`/chat/chat-details/:${id}`}
              className={({ isActive }) =>
                `flex gap-4 hover:bg-gray-100 p-3 rounded-xl ${
                  isActive ? "bg-gray-100" : ""
                }`
              }
            >
              <img
                src={profileicon}
                alt="profile image"
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div>
                <h1 className="font-semibold text-lg">Florencio Dorrance</h1>
                <p className="text-start text-sm opacity-50">woohoooo</p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
