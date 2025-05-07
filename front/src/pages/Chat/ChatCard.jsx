import { useNavigate } from "react-router-dom";
import profileicon from "../../assets/profileicon.png";
const ChatCards = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => navigate(`/chat/chat-details/:1`)}
        className="flex gap-4 hover:bg-gray-100 p-3 rounded-xl"
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
      </button>
    </>
  );
};

export default ChatCards;
