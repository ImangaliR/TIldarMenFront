import React, { useEffect, useState } from "react";
import profileicon from "../../assets/profileicon.png";
import UploadVideo from "./UploadVideo";
import SpecializationDropdown from "../../components/Dropdown/SpecializationDropdown";
import LanguageDropdown from "./../../components/Dropdown/LanguageDropdown";
import TranslationServicesDropdown from "../../components/Dropdown/TranslationServicesDropdown";
import AvaibilityDropdown from "../../components/Dropdown/AvailabilityDropdown";
import WorkExperience from "../../components/WorkExperience/WorkExperience";
import { useUser } from "../../utils/contexts/UserContext";
import { toast } from "react-toastify";
import {
  getProfile,
  updateAvailability,
} from "../../services/ProfileService/ProfileService";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import SimpleLoader from "../../components/Loader/SimpleLoader";
import Education from "../../components/Education/Education";
import Certificate from "../../components/Certificate/Certificate";

const ProfileEditing = () => {
  const [loading, setLoading] = useState(false);
  const { user, userId, setUser } = useUser();
  const [availability, setAvailability] = useState(
    user?.data?.availability || ""
  );
  const [userTitle, setUserTitle] = useState(
    user?.data?.professionalTitle || ""
  );
  const { handleSubmit } = useForm();
  const [intro, setIntro] = useState(user?.data?.introduction || "");

  const [project, setProject] = useState(null);
  const [projectPreview, setProjectPreview] = useState(null);

  const [work, setWork] = useState(user?.data?.workExperiences || null);
  const [addWork, setAddWork] = useState(
    user?.data?.workExperiences?.length || 0
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProject(file);
      setProjectPreview(URL.createObjectURL(file));
    }
  };

  const addIntroduction = async () => {
    try {
      const response = await api.put(`translator/${userId}/intro`, {
        intro: intro,
      });
      toast.success("Updated introduction successfully!");
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  const addProject = async () => {
    setLoading(true);

    if (!project) {
      toast.warn("Select a file first");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", project);

    try {
      const response = await api.post(
        `translator/${userId}/project`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const updatedProfile = await getProfile();
      setUser(updatedProfile);
      toast.success("Added project successfully!");
    } catch (err) {
      if (err.message.includes("Network Error")) {
        toast.error("File size is too large.");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async () => {
    try {
      const response = await api.delete(`translator/${userId}/project/1`);
      const updatedProfile = await getProfile();
      setUser(updatedProfile);
      setProjectPreview(null);
      toast.success("Deleted project successfully!");
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    setProject(user?.data?.projectUrls?.[0] || null);
    setProjectPreview(user?.data?.projectUrls?.[0] || null);
    setWork(user?.data?.workExperiences);
    if (!availability && user.data.availability) {
      setAvailability(user.data.availability);
      setUserTitle(user.data.professionalTitle);
    }
  }, [user]);

  const userUpdate = {
    title: userTitle,
    basedIn: user?.data?.location?.city,
    availability: availability,
  };

  const updateProfile = async () => {
    try {
      const response = await updateAvailability(userUpdate);
      toast.success("Updated profile successfully!");
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <div className="w-full md:w-fit">
        <h1 className="text-2xl md:text-3xl font-bold ml-5 md:ml-10 mb-2">
          Profile
        </h1>
        <main className="bg-white shadow-sm rounded-sm p-6">
          <form
            name="update user profile"
            onSubmit={handleSubmit(updateProfile)}
            className="md:pl-15 md:pr-20 md:pt-10"
          >
            <div className="grid md:flex items-center gap-10">
              <div className="flex md:block justify-center">
                <img
                  src={user?.data?.profileImageUrl || profileicon}
                  alt="profile icon"
                  className="w-30 h-30 md:w-35 md:h-35 rounded-full object-cover"
                />
              </div>
              <div className="">
                <div className="flex items-center gap-2 mb-3">
                  <p className="w-35 font-bold">Full Name:</p>
                  <input
                    type="text"
                    disabled
                    value={user?.data?.firstName + " " + user?.data?.lastName}
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-full md:w-55 lg:w-60 xl:w-80 h-7 rounded-sm text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <p className="w-35">Based In:</p>
                  <input
                    type="text"
                    disabled
                    value={user?.data?.location?.city}
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-full md:w-55 lg:w-60 xl:w-80 h-7 rounded-sm text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <p className="w-35">Professional Title:</p>
                  <input
                    type="text"
                    value={userTitle}
                    onChange={(e) => setUserTitle(e.target.value)}
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-full md:w-55 lg:w-60 xl:w-80 h-7 rounded-sm text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <p className="w-35">Availability:</p>
                  <AvaibilityDropdown
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-5 md:mt-15 gap-2">
              <button
                type="submit"
                className="justify-center items-center gap-2 text-[#38BF4C] border-1 rounded-lg w-25 h-8"
              >
                Save
              </button>
            </div>
          </form>

          <hr className="mt-10 mb-5" />

          <div className="md:pl-10 md:pr-20">
            <h1 className="text-xl md:text-2xl font-bold">Introduction</h1>
            <div className="grid md:flex gap-15 md:gap-30 md:pl-5">
              <div className="grid">
                <h1 className="font-bold mb-1">About</h1>
                <textarea
                  maxLength={300}
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  placeholder="Write something to introduce yourself.
Max. 300 symbols"
                  className="bg-[#EAF4F4] border-1 border-[#DCDCDC] p-3 w-full h-40 md:w-60 lg:w-75 xl:w-90 rounded-sm text-sm resize-none"
                />
                <button
                  onClick={addIntroduction}
                  className="justify-center items-center gap-2 text-[#38BF4C] border-1 rounded-lg w-25 h-8 mt-5 md:mt-10"
                >
                  Save
                </button>
              </div>
              <UploadVideo />
            </div>
          </div>

          <hr className="mt-10 mb-5" />

          <div className="md:pl-10 md:pr-20">
            <h1 className="text-xl md:text-2xl font-bold">
              Language & Translation Details
            </h1>
            <div className="grid md:flex items-start gap-10 md:pl-5 mt-2">
              <LanguageDropdown />
              <TranslationServicesDropdown />
              <SpecializationDropdown />
            </div>
          </div>

          <hr className="mt-10 mb-5" />

          <div className="md:pl-10 md:pr-20">
            <h1 className="text-xl md:text-2xl font-bold">
              Work & Project Experience
            </h1>
            <div>
              <h1 className="font-bold md:text-lg mb-2">Work</h1>
              <div className="w-full">
                <WorkExperience works={work} />
              </div>
            </div>

            <div className="mt-10">
              <h1 className="font-bold text-lg mb-2">Projects</h1>
              <input
                id="file"
                type="file"
                accept=".pdf,image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {project ? (
                <>
                  <iframe
                    src={projectPreview}
                    width={240}
                    height="100%"
                    className="border rounded"
                    title="PDF Preview"
                  />
                </>
              ) : (
                <label
                  htmlFor="file"
                  className="block bg-[#EAF4F4] border-1 border-[#DCDCDC] p-3 w-50 h-30 rounded-sm text-center pt-12 cursor-pointer"
                >
                  Upload
                </label>
              )}
              <div className="flex justify-start mt-5 md:mt-10 gap-5">
                {user?.data?.projectUrls?.[0] ? (
                  <button
                    onClick={deleteProject}
                    className="w-25 h-8 text-[#FF0000] border-1 rounded-lg"
                  >
                    Delete
                  </button>
                ) : (
                  <div className="flex gap-3 md:mt-5">
                    <button
                      onClick={() => {
                        setProject(null);
                        setProjectPreview(null);
                      }}
                      className="w-22 h-8 border-1 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addProject}
                      className="w-22 h-8 text-[#38BF4C] border-1 rounded-lg"
                    >
                      Add
                    </button>
                    {loading && (
                      <div className="flex h-full items-center justify-center">
                        <SimpleLoader className="h-7" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <hr className="mt-10 mb-5" />

          <div className="md:pl-10 md:pr-20 pb-5">
            <h1 className="text-xl md:text-2xl font-bold">
              Education & Certifications
            </h1>
            <div className="w-full grid gap-10 md:gap-0 md:flex md:justify-between">
              <Education />
              <Certificate />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfileEditing;
