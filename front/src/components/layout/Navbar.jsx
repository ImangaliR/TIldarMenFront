import chaticon from "../../assets/chat.png";
import bellicon from "../../assets/bell.png";
import profileicon from "../../assets/profileicon.png";
import employericon from "../../assets/employericon.png";
import burger from "../../assets/burger.png";
import deletesign from "../../assets/delete_sign.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../utils/contexts/UserContext";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, userRole, userId } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/home" },
    { name: "Project Catalogs", href: "/project-catalog" },
    { name: "Translators", href: "/translators" },
  ];

  const handleProfileClick = () => {
    if (userRole && userId) {
      if (userRole === "TRANSLATOR") {
        navigate("/translator/settings");
      } else {
        navigate("/employer/settings");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between p-5 bg-white shadow-sm">
        <h1 className="text-2xl lg:text-3xl font-bold ml-2 md:ml-5 text-[#71C39C]">
          <button onClick={() => navigate("/home")}>TildarMen</button>
        </h1>

        <div className="hidden md:flex items-center justify-between min-w-60 md:min-w-72 lg:min-w-100 text-[#585858] lg:text-lg cursor-pointer">
          {navigation.map((item, i) => (
            <NavLink
              to={item.href}
              key={i}
              className={({ isActive }) =>
                `pl-1 pr-1 ${isActive ? "border-b-2" : "hover:border-b-1"}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center min-w-30 lg:min-w-40 gap-3">
          <button
            onClick={() => navigate("/chat")}
            className="bg-[#f1f1f1] rounded-full p-2"
          >
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
              src={
                userRole === "EMPLOYER"
                  ? user?.data?.profileImageUrl || employericon
                  : user?.data?.profileImageUrl || profileicon
              }
              alt="profile icon"
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
            />
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <img
              src={isMobileMenuOpen ? deletesign : burger}
              alt="menu"
              className="w-6 h-6"
            />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-18 left-0 w-full bg-white flex flex-col items-start px-7 py-4 gap-4 md:hidden z-50 border-t-1 border-[#dbdbdb]">
            {navigation.map((item, i) => (
              <NavLink
                to={item.href}
                key={i}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `w-full ${
                    isActive ? "font-semibold text-[#71C39C]" : "text-[#585858]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <button
              onClick={() => navigate("/chat")}
              className="text-[#585858]"
            >
              Chat
            </button>
            <button className="text-[#585858]">Notifications</button>
            <button onClick={handleProfileClick} className="text-[#585858]">
              Profile
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
