import profileicon from "../../assets/profileicon.png";
import employericon from "../../assets/employericon.png";
import location from "../../assets/location.png";
import key from "../../assets/key.png";
import openeye from "../../assets/openeye.png";
import hiddeneye from "../../assets/hiddeneye.png";
import TokenService from "../../services/token.service";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../utils/contexts/UserContext";
import { toast } from "react-toastify";
import {
  deleteProfile,
  updatePassword,
  updateProfile,
  getSettings,
} from "../../services/ProfileService/ProfileService";
import CitiesDropdown from "../../components/Dropdown/CitiesDropdown";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [userSettings, setUserSettings] = useState([]);
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSettings();
        setUserSettings(response.data);
      } catch (err) {
        toast.error("Something went wrong while loading");
      }
    };
    fetchSettings();
  }, []);

  const userRole = TokenService.getUserRole();
  const { logout } = useUser();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState(userSettings.firstName || "");
  const [surname, setSurname] = useState(userSettings.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(
    userSettings.phoneNumber || ""
  );
  const [userLocation, setUserLocation] = useState(userSettings.location || "");
  const [introduction, setIntroduction] = useState(
    userSettings.introduction || ""
  );
  const { handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLocation && userSettings.location) {
      setUserLocation(userSettings.location);
      setName(userSettings.firstName);
      setSurname(userSettings.lastName);
      setPhoneNumber(userSettings.phoneNumber);
      setIntroduction(userSettings.introduction);
    }
  }, [userSettings]);

  const userInfo = {
    firstName: name,
    lastName: surname,
    phoneNumber: phoneNumber,
    location: userLocation,
  };

  const employerInfo = {
    location: userLocation,
    introduction: introduction,
  };

  const userPassword = {
    oldPassword: currentPassword,
    password: newPassword,
    repeatPassword: confirmNewPassword,
  };

  const userInfoUpdate = async () => {
    try {
      const response = await updateProfile(userInfo);
      if (response) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (err) {
      toast.error("Something went wrong while updating.");
    }
  };

  const employerInfoUpdate = async () => {
    console.log(employerInfo);
    try {
      const response = await updateProfile(employerInfo);
      if (response) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (err) {
      toast.error("Something went wrong while updating.");
    }
  };

  const passwordChange = async () => {
    try {
      const response = await updatePassword(userPassword);
      toast.success("Password updated successfully!");
    } catch (err) {
      if (err?.message?.includes("Oops")) {
        if (err?.data?.includes("Passwords does not match")) {
          toast.error("New password and confirm password do not match.");
        } else {
          toast.error("Incorrect current password.");
        }
      } else {
        toast.error("Something went wrong while updating.");
      }
    }
  };

  const deleteAccount = async () => {
    if (!confirmDelete) {
      toast.warn("Please confirm the deletion of your account first.");
      return;
    } else {
      try {
        const response = await deleteProfile();
        if (response) {
          toast.success("User deleted successfully!");
          logout();
          navigate("/login");
        }
      } catch (err) {
        toast.error("Something went wrong while updating.");
      }
    }
  };

  const changeProfilePicture = () => {};

  return (
    <>
      {userRole === "EMPLOYER" ? (
        <>
          <main className="bg-white shadow-sm rounded-sm text-sm pt-10 pl-15 pr-15 md:pt-15 md:pr-20 md:pl-20 lg:pt-25 lg:pr-25 lg:pl-25">
            <div className="flex items-center gap-8">
              <img
                src={employericon}
                alt="employer icon"
                className="w-30 h-30 "
              />
              <div>
                <button
                  className="border-2 border-[#8F8F8F] rounded-lg text-[#70B27A] pr-6 pl-6 pt-2 pb-2 mb-3"
                  onClick={changeProfilePicture()}
                >
                  Change Profile Picture
                </button>
                <p className="text-[#8F8F8F]">
                  This will be displayed on your profile at the website
                </p>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(employerInfoUpdate)}
              name="update user input"
              className="mt-15"
            >
              <div className="flex gap-4">
                <div>
                  <p className="ml-2">Company Name</p>
                  <input
                    type="text"
                    disabled
                    onChange={(e) => setName(e.target.value)}
                    placeholder={userSettings.firstName}
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-54 md:w-72 lg:w-90 xl:w-114 h-9 mt-1 mb-5 rounded-sm text-sm"
                  />
                </div>
                <div>
                  <p className="ml-2">Surname</p>
                  <input
                    type="text"
                    disabled
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder={userSettings.lastName}
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-54 md:w-72 lg:w-90 xl:w-114 h-9 mt-1 mb-5 rounded-sm text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="ml-2">Phone Number</p>
                  <input
                    type="tel"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    maxLength={11}
                    minLength={11}
                    disabled
                    placeholder={userSettings.phoneNumber}
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-54 md:w-72 lg:w-90 xl:w-114 h-9 mt-1 mb-5 rounded-sm text-sm"
                  />
                </div>
                <div>
                  <p className="ml-2">Email Address</p>
                  <input
                    type="email"
                    disabled
                    value={userSettings.email || ""}
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-54 md:w-72 lg:w-90 xl:w-114 h-9 mt-1 mb-5 rounded-sm text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="ml-2">Location</p>
                    <img
                      src={location}
                      alt="location icon"
                      className="w-4 h-4"
                    />
                  </div>
                  <CitiesDropdown
                    value={userLocation}
                    onChange={(e) => setUserLocation(e.target.value)}
                  />
                </div>
                <div>
                  <p className="ml-2">Description about company / Yourself</p>
                  <textarea
                    type="text"
                    value={introduction || ""}
                    onChange={(e) => setIntroduction(e.target.value)}
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-54 md:w-72 lg:w-90 xl:w-114 h-40 mt-1 mb-5 py-2 rounded-sm text-sm resize-none"
                  />
                </div>
              </div>
              <div className="flex w-full justify-end">
                <button
                  type="submit"
                  className="bg-[#38BF4C] text-white font-light rounded-2xl pr-4 pl-4 pt-1 pb-1"
                >
                  Update
                </button>
              </div>
            </form>

            <form
              action={handleSubmit(passwordChange)}
              name="change password"
              className="mt-15"
            >
              <h1>Password & Security</h1>
              <div className="flex gap-4">
                <div className="flex items-center relative">
                  <img
                    src={key}
                    alt="key icon"
                    className="w-4 h-4 lg:w-5 lg:h-5 absolute top-3.5 lg:top-3 left-2"
                  />
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    minLength={8}
                    placeholder="Enter Current Password"
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-9 lg:pl-10 w-54 md:w-72 lg:w-90 xl:w-114 h-9 mt-1 mb-5 rounded-sm text-sm"
                  />
                  <img
                    src={showCurrentPassword ? openeye : hiddeneye}
                    alt={
                      showCurrentPassword ? "hidden eye icon" : "open eye icon"
                    }
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="w-4 h-4 lg:w-5 lg:h-5 absolute top-3.5 lg:top-3 right-2 cursor-pointer"
                  />
                </div>
                <div className="flex items-center relative">
                  <img
                    src={key}
                    alt="key icon"
                    className="w-4 h-4 lg:w-5 lg:h-5 absolute top-3.5 lg:top-3 left-2"
                  />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    onChange={(e) => setNewPassword(e.target.value)}
                    minLength={8}
                    placeholder="Enter New Password"
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-9 lg:pl-10 w-54 md:w-72 lg:w-90 xl:w-114 h-9 mt-1 mb-5 rounded-sm text-sm"
                  />
                  <img
                    src={showNewPassword ? openeye : hiddeneye}
                    alt={showNewPassword ? "hidden eye icon" : "open eye icon"}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="w-4 h-4 lg:w-5 lg:h-5 absolute top-3.5 lg:top-3 right-2 cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="relative">
                  <img
                    src={key}
                    alt="key icon"
                    className="w-4 h-4 lg:w-5 lg:h-5 absolute top-3.5 lg:top-3 left-2"
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    minLength={8}
                    placeholder="Confirm New Password"
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-9 lg:pl-10 w-54 md:w-72 lg:w-90 xl:w-114 h-9 mt-1 mb-5 rounded-sm text-sm"
                  />
                  <img
                    src={showConfirmPassword ? openeye : hiddeneye}
                    alt={
                      showConfirmPassword ? "hidden eye icon" : "open eye icon"
                    }
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="w-4 h-4 lg:w-5 lg:h-5 absolute top-3.5 lg:top-3 right-2 cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex w-full justify-end">
                <button
                  type="submit"
                  className="bg-[#38BF4C] text-white font-light rounded-2xl pr-4 pl-4 pt-1 pb-1"
                >
                  Update
                </button>
              </div>
            </form>

            <div className="mt-12 pb-12">
              <h1 className="text-[#585858] font-semibold text-lg lg:text-xl">
                Delete you account
              </h1>
              <p className="text-[#949494] text-xs lg:text-sm mt-4">
                When you delete your account, we permanently delete your
                personal data, and you lose access to account services.
              </p>
              <div className="flex mt-4">
                <input
                  type="checkbox"
                  id="delete"
                  onClick={() => setConfirmDelete(!confirmDelete)}
                />
                <label htmlFor="delete" className="text-[#949494] text-sm ml-2">
                  Confirm that I want to delete my account
                </label>
              </div>
              <div className="flex w-full justify-end mt-4">
                <button
                  className={`${
                    confirmDelete ? "bg-[#FF0000] text-white" : "bg-gray-200"
                  }  font-light rounded-sm pr-6 pl-6 lg:pr-7 lg:pl-7 pt-1 pb-1`}
                  onClick={deleteAccount}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </main>
        </>
      ) : (
        <main className="bg-white shadow-sm rounded-sm text-sm pt-10 pl-15 pr-15 md:pt-15 md:pr-20 md:pl-20 lg:pt-25 lg:pr-25 lg:pl-25">
          <div className="flex items-center gap-8">
            <img src={profileicon} alt="profile icon" className="w-30 h-30 " />
            <div>
              <button
                className="border-2 border-[#8F8F8F] rounded-lg text-[#70B27A] pr-6 pl-6 pt-2 pb-2 mb-3"
                onClick={changeProfilePicture()}
              >
                Change Profile Picture
              </button>
              <p className="text-[#8F8F8F]">
                This will be displayed on your profile at the website
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(userInfoUpdate)}
            name="update user input"
            className="mt-15"
          >
            <div className="flex gap-4">
              <div>
                <p className="ml-2">Name</p>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder={userSettings.firstName}
                  className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-54 md:w-72 lg:w-90 xl:w-114 h-9 mt-1 mb-5 rounded-sm text-sm"
                />
              </div>
              <div>
                <p className="ml-2">Surname</p>
                <input
                  type="text"
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder={userSettings.lastName}
                  className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-54 md:w-72 lg:w-90 xl:w-114 h-9 mt-1 mb-5 rounded-sm text-sm"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <p className="ml-2">Phone Number</p>
                <input
                  type="tel"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  maxLength={11}
                  minLength={11}
                  placeholder={userSettings.phoneNumber}
                  className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-54 md:w-72 lg:w-90 xl:w-114 h-9 mt-1 mb-5 rounded-sm text-sm"
                />
              </div>
              <div>
                <p className="ml-2">Email Address</p>
                <input
                  type="email"
                  value={userSettings.email || ""}
                  disabled
                  className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-54 md:w-72 lg:w-90 xl:w-114 h-9 mt-1 mb-5 rounded-sm text-sm cursor-not-allowed"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <p className="ml-2">Role</p>
                <input
                  type="text"
                  disabled
                  value={userRole === "EMPLOYER" ? "Employer" : "Translator"}
                  className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-54 md:w-72 lg:w-90 xl:w-114 h-9 mt-1 mb-5 rounded-sm text-sm cursor-not-allowed"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="ml-2">Location</p>
                  <img src={location} alt="location icon" className="w-4 h-4" />
                </div>
                <CitiesDropdown
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full justify-end">
              <button
                type="submit"
                className="bg-[#38BF4C] text-white font-light rounded-2xl pr-4 pl-4 pt-1 pb-1"
              >
                Update
              </button>
            </div>
          </form>

          <form
            action={handleSubmit(passwordChange)}
            name="change password"
            className="mt-15"
          >
            <h1>Password & Security</h1>
            <div className="flex gap-4">
              <div className="flex items-center relative">
                <img
                  src={key}
                  alt="key icon"
                  className="w-4 h-4 lg:w-5 lg:h-5 absolute top-3.5 lg:top-3 left-2"
                />
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  minLength={8}
                  placeholder="Enter Current Password"
                  className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-9 lg:pl-10 w-54 md:w-72 lg:w-90 xl:w-114 h-9 mt-1 mb-5 rounded-sm text-sm"
                />
                <img
                  src={showCurrentPassword ? openeye : hiddeneye}
                  alt={
                    showCurrentPassword ? "hidden eye icon" : "open eye icon"
                  }
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="w-4 h-4 lg:w-5 lg:h-5 absolute top-3.5 lg:top-3 right-2 cursor-pointer"
                />
              </div>
              <div className="flex items-center relative">
                <img
                  src={key}
                  alt="key icon"
                  className="w-4 h-4 lg:w-5 lg:h-5 absolute top-3.5 lg:top-3 left-2"
                />
                <input
                  type={showNewPassword ? "text" : "password"}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength={8}
                  placeholder="Enter New Password"
                  className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-9 lg:pl-10 w-54 md:w-72 lg:w-90 xl:w-114 h-9 mt-1 mb-5 rounded-sm text-sm"
                />
                <img
                  src={showNewPassword ? openeye : hiddeneye}
                  alt={showNewPassword ? "hidden eye icon" : "open eye icon"}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="w-4 h-4 lg:w-5 lg:h-5 absolute top-3.5 lg:top-3 right-2 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="relative">
                <img
                  src={key}
                  alt="key icon"
                  className="w-4 h-4 lg:w-5 lg:h-5 absolute top-3.5 lg:top-3 left-2"
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  minLength={8}
                  placeholder="Confirm New Password"
                  className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-9 lg:pl-10 w-54 md:w-72 lg:w-90 xl:w-114 h-9 mt-1 mb-5 rounded-sm text-sm"
                />
                <img
                  src={showConfirmPassword ? openeye : hiddeneye}
                  alt={
                    showConfirmPassword ? "hidden eye icon" : "open eye icon"
                  }
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="w-4 h-4 lg:w-5 lg:h-5 absolute top-3.5 lg:top-3 right-2 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex w-full justify-end">
              <button
                type="submit"
                className="bg-[#38BF4C] text-white font-light rounded-2xl pr-4 pl-4 pt-1 pb-1"
              >
                Update
              </button>
            </div>
          </form>

          <div className="mt-12 pb-12">
            <h1 className="text-[#585858] font-semibold text-lg lg:text-xl">
              Delete you account
            </h1>
            <p className="text-[#949494] text-xs lg:text-sm mt-4">
              When you delete your account, we permanently delete your personal
              data, and you lose access to account services.
            </p>
            <div className="flex mt-4">
              <input
                type="checkbox"
                id="delete"
                onClick={() => setConfirmDelete(!confirmDelete)}
              />
              <label htmlFor="delete" className="text-[#949494] text-sm ml-2">
                Confirm that I want to delete my account
              </label>
            </div>
            <div className="flex w-full justify-end mt-4">
              <button
                className={`${
                  confirmDelete ? "bg-[#FF0000] text-white" : "bg-gray-200"
                }  font-light rounded-sm pr-6 pl-6 lg:pr-7 lg:pl-7 pt-1 pb-1`}
                onClick={deleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Settings;
