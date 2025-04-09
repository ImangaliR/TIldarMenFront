import profileicon from "../../assets/profileicon.png";
import employericon from "../../assets/employericon.png";
import accountsettings from "../../assets/account-settings.png";
import profiledit from "../../assets/profile-edit.png";
import timemanagement from "../../assets/time-management.png";
import reviewicon from "../../assets/review.png";
import logouticon from "../../assets/logout.png";
import { useUser } from "../../utils/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TokenService from "../../services/token.service";
import { useEffect, useState } from "react";
import IconMenuItem from "./IconMenuItem";

const Sidebar = () => {
  const navigate = useNavigate();
  const userRole = TokenService.getUserRole();
  const userId = TokenService.getUserId();
  const { logout, user } = useUser();
  const userFirstname = user?.data?.firstName;
  const userLastname = user?.data?.lastName;
  const [navigation, setNavigation] = useState([]);

  useEffect(() => {
    if (userId) {
      if (userRole.includes("EMPLOYER")) {
        setNavigation([
          {
            name: "Account Settings",
            href: "settings",
            icon: accountsettings,
          },
          {
            name: "Post Projects",
            href: "post-projects",
            icon: null,
          },
          {
            name: "Project Applicants",
            href: "project-applicants",
            icon: timemanagement,
          },
          {
            name: "Payment",
            href: "payment",
            icon: null,
          },
          {
            name: "Reviews",
            href: "reviews",
            icon: reviewicon,
          },
        ]);
      } else {
        setNavigation([
          {
            name: "Account Settings",
            href: "settings",
            icon: accountsettings,
          },
          {
            name: "Profile Editing",
            href: "profile-edit",
            icon: profiledit,
          },
          {
            name: "Applied Projects",
            href: "applied-projects",
            icon: timemanagement,
          },
          {
            name: "Reviews",
            href: "reviews",
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

  return (
    <>
      <div className="grid sticky top-0 justify-center bg-[#fcfcfc] pr-2 pl-2 w-68 h-160 mt-0.5 shadow-sm">
        <div className="flex flex-col items-center justify-center mt-5">
          <div className="grid justify-center w-30 h-30">
            <img
              src={userRole === "EMPLOYER" ? employericon : profileicon}
              alt="profile icon"
            />
          </div>
          <p className="font-medium text-center mt-2 w-full">
            {userFirstname} {userLastname}
          </p>
        </div>

        {/* Sidebar Items */}
        <div className="text-[#949494]">
          {navigation.map((item, i) => (
            <IconMenuItem key={i} item={item} />
          ))}
        </div>

        {/* Logout */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center text-red-500 text-lg gap-2 border-3 border-red-500 rounded-xl h-10 w-30"
          >
            <p className="text-sm">Log out</p>
            <img src={logouticon} alt="logout icon" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
