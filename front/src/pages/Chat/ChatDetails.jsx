import { useParams } from "react-router-dom";
import profileicon from "../../assets/profileicon.png";
const ChatDetails = () => {
  const { id } = useParams();
  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-md">
        <div className="flex flex-center gap-2 py-5 px-8">
          <img
            src={profileicon}
            alt="profile image"
            className="w-13 h-13 object-cover rounded-lg"
          />
          <div className="grid items-center">
            <h1 className="font-semibold text-xl">Florencio Dorrance</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <p>Online</p>
            </div>
          </div>
        </div>
        <hr className="text-[#F3F3F3]" />
      </div>
    </>
  );
};

export default ChatDetails;
