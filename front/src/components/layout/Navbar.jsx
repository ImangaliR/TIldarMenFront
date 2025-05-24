import chaticon from "../../assets/chat.png";
import bellicon from "../../assets/bell.png";
import profileicon from "../../assets/profileicon.png";
import employericon from "../../assets/employericon.png";
import accountsettings from "../../assets/account-settings.png";
import profiledit from "../../assets/profile-edit.png";
import timemanagement from "../../assets/time-management.png";
import reviewicon from "../../assets/review.png";
import logouticon from "../../assets/logout.png";
import payment from "../../assets/payment.png";
import burger from "../../assets/burger.png";
import rightarrow from "../../assets/rightarrow.png";
import deletesign from "../../assets/delete_sign.png";
import { NavLink, useMatch, useNavigate } from "react-router-dom";
import { useUser } from "../../utils/contexts/UserContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  const match1 = useMatch("/translator/applied-projects");
  const match2 = useMatch("/translator/settings");
  const match3 = useMatch("/translator/profile-edit");
  const match4 = useMatch("/translator/reviews");
  const match5 = useMatch("/employer/settings");
  const match6 = useMatch("/employer/payment");
  const match7 = useMatch("/employer/post-projects");
  const match8 = useMatch("/employer/post-projects/edit-project/:id");
  const match9 = useMatch("/employer/post-projects/project-applicants/:id");
  const match10 = useMatch("/employer/post-projects/create-project");

  const navigate = useNavigate();
  const isProfilePage =
    match1 ||
    match2 ||
    match3 ||
    match4 ||
    match5 ||
    match6 ||
    match7 ||
    match8 ||
    match9 ||
    match10;

  const { logout, user, userRole, userId } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [profileNavigation, setProfileNavigation] = useState([]);

  const navigation = [
    { name: "Home", href: "/home" },
    { name: "Project Catalogs", href: "/project-catalog" },
    { name: "Translators", href: "/translators" },
  ];

  const menuOpen = () => {
    if (isMobileMenuOpen || isProfileMenuOpen) {
      return true;
    } else return false;
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  useEffect(() => {
    if (userId) {
      if (userRole.includes("EMPLOYER")) {
        setProfileNavigation([
          {
            name: "Account Settings",
            href: "/employer/settings",
            icon: accountsettings,
          },
          {
            name: "Post Projects",
            href: "/employer/post-projects",
            icon: timemanagement,
          },
          {
            name: "Payment",
            href: "/employer/payment",
            icon: payment,
          },
        ]);
      } else {
        setProfileNavigation([
          {
            name: "Account Settings",
            href: "/translator/settings",
            icon: accountsettings,
          },
          {
            name: "Profile Editing",
            href: "/translator/profile-edit",
            icon: profiledit,
          },
          {
            name: "Project Offers",
            href: "/translator/applied-projects",
            icon: timemanagement,
          },
          {
            name: "Reviews",
            href: "/translator/reviews",
            icon: reviewicon,
          },
        ]);
      }
    }
  }, [userId, userRole]);

  const handleLogout = () => {
    toast.warn(
      <div className="ml-4">
        <p>Confirm Logout</p>
        <div className="flex justify-center gap-4 mt-2">
          <button
            className="bg-red-600 text-white px-3 py-1 rounded-md"
            onClick={() => {
              logout();
              navigate("/login");
              toast.dismiss();
            }}
          >
            <p className="text-sm">Confirm</p>
          </button>
          <button
            className="bg-gray-400 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss()}
          >
            <p className="text-sm">Cancel</p>
          </button>
        </div>
      </div>,
      {
        position: "bottom-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
      }
    );
  };

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

  const handleProfileClickMobile = () => {
    if (userRole && userId) {
      setIsProfileMenuOpen(!isProfileMenuOpen);
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      toast.error("Please login to access your profile settings");
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between p-5 bg-white shadow-sm">
        <h1 className="text-2xl lg:text-3xl font-bold ml-2 md:ml-5 text-[#71C39C]">
          {isProfileMenuOpen ? (
            <div
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsProfileMenuOpen(!isProfileMenuOpen);
              }}
              className="flex items-center gap-2"
            >
              <img
                src={rightarrow}
                alt="arrow sign"
                className="w-3 h-3 -scale-x-100"
              />
              <button className="text-base font-normal">back</button>
            </div>
          ) : (
            <button onClick={() => navigate("/home")}>TildarMen</button>
          )}
        </h1>

        <div className="hidden md:flex items-center justify-between min-w-72 lg:min-w-100 text-[#585858] lg:text-lg cursor-pointer">
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
          <div className="flex items-center gap-2 z-50">
            <button
              onClick={() => navigate("/chat")}
              className={`text-left bg-[#f1f1f1] rounded-full p-1.5`}
            >
              <img
                src={chaticon}
                alt="chat icon"
                className="min-w-4 h-4 lg:min-w-5 lg:h-5"
              />
            </button>
            <button className={`text-left bg-[#f1f1f1] rounded-full p-1.5`}>
              <img
                src={bellicon}
                alt="bell icon"
                className="min-w-4 h-4 lg:min-w-5 lg:h-5"
              />
            </button>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isProfileMenuOpen
              ? []
              : !isMobileMenuOpen && (
                  <img src={burger} alt="menu" className="w-6 h-6" />
                )}
          </button>
          {menuOpen() && (
            <img
              onClick={closeMenus}
              src={deletesign}
              alt="menu close"
              className="w-6 h-6"
            />
          )}
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-18 left-0 w-full flex flex-col px-7 py-4 gap-4 z-50 border-y-1 border-[#dbdbdb] shadow-lg bg-white">
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
            <div
              onClick={handleProfileClickMobile}
              className="flex items-center justify-between w-full"
            >
              <button
                className={`w-full text-left ${
                  isProfilePage
                    ? "text-[#71C39C] font-semibold"
                    : "text-[#585858]"
                }`}
              >
                Profile
              </button>
              <img src={rightarrow} alt="arrow" className="w-4 h-4" />
            </div>

            {userId && userRole ? (
              <div onClick={handleLogout} className="flex items-center gap-2">
                <img src={logouticon} alt="" className="w-4 h-4" />
                <button className="text-red-500">Logout</button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="w-full text-left"
              >
                Login
              </button>
            )}
          </div>
        )}

        {isProfileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white flex flex-col items-start px-7 py-4 gap-4 md:hidden z-50 border-y-1 border-[#dbdbdb] shadow-lg">
            {profileNavigation.map((item, i) => (
              <NavLink
                to={item.href}
                key={i}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsProfileMenuOpen(false);
                }}
                className={({ isActive }) =>
                  `w-full ${
                    isActive ? "font-semibold text-[#71C39C]" : "text-[#585858]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div
              onClick={handleLogout}
              className="flex items-center gap-2 w-full"
            >
              <img src={logouticon} alt="log out sign" className="w-4 h-4" />
              <button className="text-red-500">Logout</button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
