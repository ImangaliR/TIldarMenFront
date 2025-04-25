import fullstar from "../../assets/full_star.png";
import emptystar from "../../assets/empty_star.png";
import profileicon from "../../assets/profileicon.png";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./../../services/api";

const languageColors = {
  0: "#FFF27F",
  1: "#DE9DFC",
  2: "#A0E7E5",
  3: "#FFC75F",
  4: "#F9A1BC",
  5: "#55EAD7",
  6: "#55AAFF",
  7: "#FDCBFA",
  8: "#9EE493",
  9: "#AECBFE",
};

const TranslatorDetails = () => {
  const { id } = useParams();
  const [translator, setTranslator] = useState();
  const navigate = useNavigate();
  const reviewStars = (rating) => {
    switch (rating) {
      case 1:
        return (
          <div className="flex items-center gap-2">
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
          </div>
        );
      case 2:
        return (
          <div className="flex items-center gap-2">
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
          </div>
        );
      case 3:
        return (
          <div className="flex items-center gap-2">
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
          </div>
        );
      case 4:
        return (
          <div className="flex items-center gap-2">
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
          </div>
        );
      case 5:
        return (
          <div className="flex items-center gap-2">
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
          </div>
        );
    }
  };

  useEffect(() => {
    api
      .get(`/users/translator/${id}/profile`)
      .then((res) => {
        setTranslator(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const encodeSpaces = (url) => {
    if (!url || typeof url !== "string") return null;
    return url.replace(/ /g, "%20");
  };

  return (
    <>
      <div>
        <p className="pl-10 pt-3 text-sm">
          <span
            className="cursor-pointer"
            onClick={() => navigate("/translators")}
          >
            Translators
          </span>
          {" > "}
          <span className="font-semibold">Translator Details</span>
        </p>
        <div className="flex items-center gap-8 px-40 py-5 w-full bg-[#EAF4F4]">
          <img
            src={translator?.data.profileImageUrl || profileicon}
            alt="profile icon"
            className="w-40 h-40 rounded-full object-cover"
          />
          <div className="flex justify-between w-full h-fit">
            <div>
              <h1 className="text-2xl font-bold">
                {translator?.data?.firstName !== " "
                  ? translator?.data?.firstName
                  : "Full"}{" "}
                {translator?.data?.lastName !== " "
                  ? translator?.data?.lastName
                  : "Name"}
              </h1>
              <p className="text-gray-400 text-sm">
                {translator?.data?.professionalTitle !== " "
                  ? translator?.data?.professionalTitle
                  : "Professional Title"}
              </p>
              <h2 className="text-lg mt-2">
                Based In:{" "}
                <span className="text-[#2A9E97]">
                  {translator?.data?.location.city !== " "
                    ? translator?.data?.location.city
                    : "Location"}
                </span>
              </h2>
              <h2 className="text-lg mb-2">
                Availability:{" "}
                <span className="text-[#2A9E97]">
                  {translator?.data?.availability !== " "
                    ? translator?.data?.availability === "BUSY"
                      ? "Busy"
                      : "Available"
                    : " "}
                </span>
              </h2>
              {reviewStars(Math.floor(translator?.data?.rating))}
            </div>
            <div className="relative w-43">
              <button className="absolute top-2 right-0 w-fit h-fit text-[#FF0000] bg-white border-1 rounded-sm font-semibold gap-2 px-4 py-1">
                Report
              </button>
              <button className="absolute bottom-10 right-0 w-fit h-fit bg-[#2A9E97] text-white px-4 py-1 rounded-2xl">
                Leave request
              </button>
              <button className="absolute bottom-0 right-0 w-fit h-fit text-[#2A9E97] border-1 px-4 py-1 rounded-2xl">
                Chat with Translator
              </button>
            </div>
          </div>
        </div>
      </div>
      <main className="bg-white w-full px-40 py-7">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 mb-10">
          <div>
            <h1 className="text-2xl font-bold">Introduction</h1>
            <div>
              <h1 className="font-bold ml-5 mb-2">About</h1>
              <p>{translator?.data?.introduction}</p>
            </div>
            <div className="mt-5">
              <h1 className="font-bold ml-5 mb-2">Video Greeting</h1>
              <div>
                <video
                  controls
                  className="w-full max-w-[600px] aspect-video rounded-lg shadow"
                >
                  <source
                    src={encodeSpaces(translator?.data?.videoUrl)}
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Specializations & Translator Details
            </h1>
            <div>
              <h1 className="ml-5 font-bold mb-2">Languages</h1>
              <div className="grid grid-cols-4 xl:grid-cols-7 gap-2">
                {translator?.data?.languages?.map((language, i) => (
                  <p
                    key={i}
                    className={`w-fit text-sm text-[#585858] px-3 py-0.5 rounded-md text-center`}
                    style={{ backgroundColor: languageColors[i] }}
                  >
                    {language?.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-10">
              <h1 className="ml-5 font-bold mb-2">
                Types of Translation Services
              </h1>
              <div className="grid grid-cols-4 gap-2">
                {translator?.data?.serviceTypes?.map((service, i) => (
                  <p
                    key={i}
                    className={`w-fit text-sm text-[#585858] px-3 py-0.5 rounded-md text-center`}
                    style={{ backgroundColor: languageColors[i] }}
                  >
                    {service?.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-10">
              <h1 className="ml-5 font-bold mb-2">Specialization</h1>
              <div className="grid grid-cols-4 gap-2">
                {translator?.data?.specializations?.map((specialization, i) => (
                  <p
                    key={i}
                    className={`w-fit text-[#585858] px-3 py-0.5 rounded-md text-center`}
                    style={{ backgroundColor: languageColors[i] }}
                  >
                    {specialization?.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <h1 className="text-2xl font-bold">Work & Project Exprience</h1>
          <div>
            <div>{translator?.data?.workExperiences}</div>
          </div>
        </div>
        <div className="mb-10">
          <h1 className="text-2xl font-bold">Education & Certifications</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-15">
            <div>
              <h1 className="font-bold mb-2 ml-5">Educational Background</h1>
              <div>{translator?.data?.educations}</div>
            </div>
            <div>
              <h1 className="font-bold mb-2 ml-5">
                Certificates & Accreditations
              </h1>
              <div>{translator?.data?.certificates}</div>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <h1 className="text-2xl font-bold">Write your Review</h1>
        </div>
        <div className="mb-10">
          <h1 className="text-2xl font-bold">Latest Reviews</h1>
        </div>
      </main>
    </>
  );
};

export default TranslatorDetails;
