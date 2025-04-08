import chaticon from "../../assets/chat.png";
import searchicon from "../../assets/search.png";
import bellicon from "../../assets/bell.png";
import profileicon from "../../assets/profileicon.png";
import employericon from "../../assets/employericon.png";
import { useNavigate } from "react-router-dom";
import TokenService from "../../services/token.service";

const Navbar = () => {
  const navigate = useNavigate();
  const userRole = TokenService.getUserRole();
  const userId = TokenService.getUserId();

  const handleProfileClick = () => {
    if (userRole && userId) {
      if (userRole === "TRANSLATOR") {
        navigate("/translator");
      } else {
        navigate("/employer");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between p-5 bg-white shadow-sm">
        <h1 className="text-2xl lg:text-3xl font-bold ml-2 md:ml-5 text-[#71C39C] cursor-pointer">
          TildarMen
        </h1>
        <div className="flex items-center justify-between min-w-60 md:min-w-72 lg:min-w-100 text-[#585858] lg:text-lg cursor-pointer">
          <button onClick={() => navigate("/home")}>Home</button>
          <button>Project Catalog</button>
          <button>Translators</button>
        </div>
        <div className="flex items-center min-w-30 lg:min-w-40 gap-3">
          <button className="bg-[#f1f1f1] rounded-full p-2">
            <img
              src={searchicon}
              alt="search icon"
              className="min-w-4 h-4 lg:min-w-5 lg:h-5 opacity-80"
            />
          </button>
          <button className="bg-[#f1f1f1] rounded-full p-2">
            <img
              src={chaticon}
              alt="chat icon"
              className="min-w-4 h-4 lg:min-w-5 lg:h-5"
            />
          </button>
          <button className="bg-[#f1f1f1] rounded-full p-2">
            <img
              src={bellicon}
              alt="bell icon"
              className="min-w-4 h-4 lg:min-w-5 lg:h-5"
            />
          </button>
          <button className="ml-2 md:ml-4" onClick={handleProfileClick}>
            <img
              src={userRole === "TRANSLATOR" ? profileicon : employericon}
              alt="profile icon"
              className="min-w-8 h-8 lg:min-w-10 lg:h-10"
            />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
