import React from "react";
import profileicon from "../../assets/profileicon.png";
import pen from "../../assets/pen.png";
import UploadVideo from "./UploadVideo";
import SpecializationDropdown from "../../components/Dropdown/SpecializationDropdown";
import LanguageDropdown from "./../../components/Dropdown/LanguageDropdown";
import TranslationServicesDropdown from "../../components/Dropdown/TranslationServicesDropdown";
import WorkExperience from "../../components/WorkExperience/WorkExperience";

const ProfileEditing = () => {
  const addWorkExperience = () => {
    <WorkExperience />;
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold ml-10 mb-2">Profile</h1>
        <main className="bg-white shadow-sm rounded-sm p-6">
          <div className="pl-15 pr-20 pt-10">
            <div className="flex items-center gap-10">
              <img
                src={profileicon}
                alt="profile icon"
                className="w-35 h-35 "
              />
              <div className="">
                <div className="flex items-center gap-2 mb-3">
                  <p className="w-35 font-medium">Full Name:</p>
                  <input
                    type="text"
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-50 md:w-55 lg:w-60 xl:w-80 h-7 rounded-sm text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <p className="w-35 text-[#8F8F8F]">Professional Title:</p>
                  <input
                    type="text"
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-50 md:w-55 lg:w-60 xl:w-80 h-7 rounded-sm text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <p className="w-35">Based In:</p>
                  <input
                    type="text"
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-50 md:w-55 lg:w-60 xl:w-80 h-7 rounded-sm text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <p className="w-35">Availability:</p>
                  <input
                    type="text"
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-50 md:w-55 lg:w-60 xl:w-80 h-7 rounded-sm text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end mt-15">
              <button className="flex items-center gap-2 text-[#38BF4C] border-1 rounded-lg pl-6 pr-6 pt-1 pb-1">
                Edit
                <img src={pen} alt="pen icon" className="w-4 h-4" />
              </button>
            </div>
          </div>
          <hr className="mt-10 mb-5" />
          <div className="pl-10 pr-20">
            <h1 className="text-2xl font-bold">Introduction</h1>
            <div className="flex items-center gap-30 pl-5">
              <div>
                <h1 className="font-bold mb-1">About</h1>
                <textarea
                  maxLength={300}
                  placeholder="Write something to introduce yourself.
Max. 300 symbols"
                  className="bg-[#EAF4F4] border-1 border-[#DCDCDC] p-3 w-55 h-30 md:w-60 lg:w-75 xl:w-80 rounded-sm text-sm resize-none"
                />
              </div>
              <div>
                <h1 className="font-bold mb-1">Video Greeting</h1>
                <UploadVideo />
              </div>
            </div>
            <div className="flex w-full justify-end mt-10">
              <button className="flex items-center gap-2 text-[#38BF4C] border-1 rounded-lg pl-6 pr-6 pt-1 pb-1">
                Edit
                <img src={pen} alt="pen icon" className="w-4 h-4" />
              </button>
            </div>
          </div>
          <hr className="mt-10 mb-5" />
          <div className="pl-10 pr-20">
            <h1 className="text-2xl font-bold">
              Language & Translation Details
            </h1>
            <div className="flex items-center gap-10 pl-5">
              <LanguageDropdown />
              <TranslationServicesDropdown />
              <SpecializationDropdown />
            </div>
            <div className="flex w-full justify-end mt-15">
              <button className="flex items-center gap-2 text-[#38BF4C] border-1 rounded-lg pl-6 pr-6 pt-1 pb-1">
                Edit
                <img src={pen} alt="pen icon" className="w-4 h-4" />
              </button>
            </div>
          </div>
          <hr className="mt-10 mb-5" />
          <div className="pl-10 pr-20">
            <h1 className="text-2xl font-bold">Work & Project Experience</h1>
            <div>
              <h1 className="font-bold text-lg mb-2">Work</h1>
              <div className="flex items-center gap-10 mb-5">
                <button
                  onClick={addWorkExperience}
                  className="w-20 h-20 bg-[#EAF4F4] outline-1 outline-[#dcdcdc] rounded-sm text-2xl text-[#777777]"
                >
                  +
                </button>
                <WorkExperience />
              </div>
            </div>
            <div>
              <h1 className="font-bold text-lg mb-2">Projects</h1>
              <input
                type="file"
                placeholder="Upload"
                className="bg-[#EAF4F4] border-1 border-[#DCDCDC] p-3 w-50 h-30 rounded-sm text-sm"
              />
            </div>
            <div className="flex w-full justify-end mt-10">
              <button className="flex items-center gap-2 text-[#38BF4C] border-1 rounded-lg pl-6 pr-6 pt-1 pb-1">
                Edit
                <img src={pen} alt="pen icon" className="w-4 h-4" />
              </button>
            </div>
          </div>
          <hr className="mt-10 mb-5" />
          <div className="pl-10 pr-20 pb-5">
            <h1 className="text-2xl font-bold">Education & Certifications</h1>
            <div className="flex ml-5 gap-25 mt-2">
              <div>
                <h1 className="font-bold">Educational Background</h1>
                <div>
                  <div className="flex items-center gap-2 my-3">
                    <h1 className="w-30">Degree:</h1>
                    <input
                      type="text"
                      className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-60 h-7 rounded-sm text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h1 className="w-30">University Name:</h1>
                    <input
                      type="text"
                      className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-60 h-7 rounded-sm text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h1 className="w-30">Graduation Year:</h1>
                    <input
                      type="text"
                      className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-60 h-7 rounded-sm text-sm"
                    />
                  </div>
                  <div className="w-full flex justify-end mt-3">
                    <button className="text-[#38BF4C] border-2 pl-6 pr-6 pt-1 pb-1 w-60">
                      Add Degree
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="font-bold">Certifications & Accreditations</h1>
                <div>
                  <div className="flex items-center gap-2 my-3">
                    <h1 className="w-35">Certificate Title:</h1>
                    <input
                      type="text"
                      className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-60 h-7 rounded-sm text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2 my-3">
                    <h1 className="w-35">Year of Certification:</h1>
                    <input
                      type="text"
                      className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-60 h-7 rounded-sm text-sm"
                    />
                  </div>
                  <div className="flex gap-2 my-3">
                    <h1 className="w-35">Upload Certification:</h1>
                    <input
                      type="file"
                      className="bg-[#EAF4F4] border-1 border-[#DCDCDC] p-3 w-60 h-20 rounded-sm text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end mt-15">
              <button className="flex items-center gap-2 text-[#38BF4C] border-1 rounded-lg pl-6 pr-6 pt-1 pb-1">
                Edit
                <img src={pen} alt="pen icon" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfileEditing;
