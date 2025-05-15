import profileicon from "../../assets/profileicon.png";
import employericon from "../../assets/employericon.png";
import reviewstar from "../../assets/reviewstar.png";
import reviewstarfull from "../../assets/reviewstarfull.png";
import deletesign from "../../assets/delete_sign.png";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./../../services/api";
import { toast } from "react-toastify";
import { useUser } from "../../utils/contexts/UserContext";
import ReportTranslator from "../../components/Report/ReportTranslator";

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
  const navigate = useNavigate();
  const [translator, setTranslator] = useState();
  const [jobs, setJobs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [hover, setHover] = useState(0);
  const { userId, userRole } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReport, setIsOpenReport] = useState(false);

  const reviewStars = (rating) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <img
          key={i}
          src={i < rating ? reviewstarfull : reviewstar}
          alt={i < rating ? "full star" : "empty star"}
          className="w-4 h-4"
        />
      ))}
    </div>
  );

  useEffect(() => {
    api
      .get(`/users/translator/${id}/profile`)
      .then((res) => {
        setTranslator(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    api
      .get(`/review/${id}/all`)
      .then((res) => {
        setReviews(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const encodeSpaces = (url) => {
    if (!url || typeof url !== "string") return null;
    return url.replace(/ /g, "%20");
  };

  function formatDate(dateString) {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options).replace(",", " -");
  }

  const addReview = async () => {
    if (!userId) {
      toast.warn("User needs to login first to add a review");
      navigate("/login");
      return;
    }

    if (rating === 0 || description.length === 0) {
      toast.warn("Please add a rating and comment");
      return;
    }

    let data = {
      comment: description,
      rating: rating,
    };

    try {
      const response = await api.post(`/review/${userId}/create/${id}`, data);
      toast.success("Added review successfully");
    } catch (err) {
      toast.error("Failed to add a review");
    }
  };

  useEffect(() => {
    api
      .get(`/employer/${userId}/jobs`)
      .then((res) => {
        setJobs(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching locations:", err);
      });
  }, [userId]);

  const handleLeaveRequest = () => {
    if (userRole !== "EMPLOYER") {
      toast.warn("Only employers can leave a request");
      return;
    }
    setIsOpen(!isOpen);
  };
  const leaveRequest = async (jobId) => {
    setIsOpen(!isOpen);
    try {
      const res = await api.post(
        `/job-request/${userId}/send/${id}/job/${jobId}`
      );
      toast.success("Successfully send request!");
    } catch (err) {
      if (
        err.response?.data?.data?.includes(
          "You already have a request for this translator"
        )
      ) {
        toast.error("You already leaved this request for this translator");
      } else {
        toast.error("Failed to leave request");
      }
    }
  };
  const handleLeaveReport = () => {
    setIsOpenReport(!isOpenReport);
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
            src={translator?.profileImageUrl || profileicon}
            alt="profile icon"
            className="w-40 h-40 rounded-full object-cover"
          />
          <div className="h-fit flex justify-between w-full">
            <div>
              <h1 className="text-2xl font-bold">
                {translator?.firstName != null ? translator?.firstName : "Full"}{" "}
                {translator?.lastName != null ? translator?.lastName : "Name"}
              </h1>
              <p className="text-gray-400 text-sm">
                {translator?.professionalTitle != null
                  ? translator?.professionalTitle
                  : "Professional Title"}
              </p>
              <h2 className="text-lg mt-2">
                Based In:{" "}
                <span className="text-[#2A9E97]">
                  {translator?.location?.city != null
                    ? translator?.location?.city
                    : "Location"}
                </span>
              </h2>
              <h2 className="text-lg mb-2">
                Availability:{" "}
                <span className="text-[#2A9E97]">
                  {translator?.availability !== " "
                    ? translator?.availability === "BUSY"
                      ? "Busy"
                      : "Available"
                    : " "}
                </span>
              </h2>
              {reviewStars(Math.floor(translator?.rating))}
            </div>
            <div className="relative min-w-43">
              {isOpenReport && (
                <ReportTranslator
                  handleLeaveReport={handleLeaveReport}
                  id={id}
                />
              )}
              <button
                onClick={handleLeaveReport}
                className="absolute top-2 right-0 w-fit h-fit text-[#FF0000] bg-white border-1 rounded-sm font-semibold gap-2 px-4 py-1"
              >
                Report
              </button>
              <div>
                {isOpen && (
                  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white w-[600px] rounded-xl max-w-full h-[300px] max-h-full p-6 shadow-lg relative">
                      {/* Modal Header */}
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Your Projects</h2>
                        <button
                          className="text-gray-500 hover:text-black"
                          onClick={handleLeaveRequest}
                        >
                          <img
                            src={deletesign}
                            alt="close sign"
                            className="w-6 h-6"
                          />
                        </button>
                      </div>
                      {/* Job List */}
                      <div className="space-y-3 max-h-45 overflow-y-auto">
                        {jobs.map((job) => (
                          <div
                            key={job.id}
                            onClick={() => leaveRequest(job.id)}
                            className="border border-gray-200 rounded p-3 bg-gray-50 cursor-pointer"
                          >
                            <p className="text-center">{job.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <button
                  onClick={handleLeaveRequest}
                  className="absolute bottom-10 right-0 w-fit h-fit bg-[#2A9E97] text-white px-4 py-1 rounded-2xl"
                >
                  Leave request
                </button>
              </div>
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
              <h1 className="font-bold ml-5 mb-2">About me</h1>
              <p>{translator?.introduction}</p>
            </div>
            <div className="mt-5">
              <h1 className="font-bold ml-5 mb-2">Video Greeting</h1>
              {translator?.videoUrl && (
                <div>
                  <video
                    controls
                    className="w-full max-w-[600px] aspect-video rounded-lg shadow"
                  >
                    <source
                      src={encodeSpaces(translator?.videoUrl)}
                      type="video/mp4"
                    />
                  </video>
                </div>
              )}
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Specializations & Translator Details
            </h1>
            <div>
              <h1 className="ml-5 font-bold mb-2">Languages</h1>
              <div className="w-fit grid grid-cols-3 xl:grid-cols-5 gap-2">
                {translator?.languages?.map((language, i) => (
                  <p
                    key={i}
                    className={`w-full text-sm text-[#585858] px-3 py-1 rounded-md text-center`}
                    style={{ backgroundColor: languageColors[i % 10] }}
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
              <div className="w-fit grid grid-cols-2 gap-2">
                {translator?.serviceTypes?.map((service, i) => (
                  <p
                    key={i}
                    className={`w-full text-sm text-[#585858] px-3 py-1 rounded-md text-center`}
                    style={{ backgroundColor: languageColors[i % 10] }}
                  >
                    {service?.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-10">
              <h1 className="ml-5 font-bold mb-2">Specialization</h1>
              <div className="w-fit grid grid-cols-3 gap-2">
                {translator?.specializations?.map((specialization, i) => (
                  <p
                    key={i}
                    className={`w-full text-[#585858] px-3 py-1 rounded-md text-center`}
                    style={{ backgroundColor: languageColors[i % 10] }}
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
            <div className="grid grid-cols-2 gap-15">
              {translator?.workExperiences.map((workExperience, i) => (
                <div key={i}>
                  <h1 className="font-bold">
                    {workExperience.position != "" || null
                      ? workExperience.position
                      : "Role/Position"}{" "}
                    -{" "}
                    {workExperience.companyName != "" || null
                      ? workExperience.companyName
                      : "Company"}
                  </h1>
                  <p>
                    {formatDate(workExperience?.startDate)}
                    {" - "}
                    {formatDate(workExperience?.endDate)}
                  </p>
                  <p>
                    <span className="font-semibold">
                      Description of tasks, responsibilities, and achievements:
                    </span>{" "}
                    {workExperience?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-10">
          <h1 className="text-2xl font-bold">Education & Certifications</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-15">
            <div>
              <h1 className="font-bold mb-2 ml-5">Educational Background</h1>
              <div className="grid gap-5">
                {translator?.educations.map((education, i) => (
                  <div className="flex gap-5" key={i}>
                    <div>
                      <p>
                        {education?.degree != "" || null
                          ? education?.degree
                          : "Degree"}
                      </p>
                      <h1 className="font-bold">
                        {education?.university != "" || null
                          ? education?.university
                          : "University/Institution Name"}
                      </h1>
                      <h1>
                        {education?.graduationYear != "" || null
                          ? education?.graduationYear
                          : "Graduation Year"}
                      </h1>
                    </div>
                    <ul>
                      <li className="ml-5 list-disc">
                        <a
                          href={education?.degreeUrl}
                          target="_blank"
                          className="text-teal-600 no-underline"
                        >
                          file.pdf
                        </a>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h1 className="font-bold mb-2 ml-5">
                Certificates & Accreditations
              </h1>
              <div className="grid gap-5">
                {translator?.certificates.map((certificate, i) => (
                  <div key={i}>
                    <h1 className="mb-2">
                      {certificate?.title != "" || null
                        ? certificate?.title
                        : "Certificate Title"}
                      {" - "}
                      {certificate?.year != "" || null
                        ? certificate?.year
                        : "Year of Certification"}
                    </h1>
                    <ul>
                      <li className="ml-5 list-disc">
                        <a
                          href={certificate?.certificateUrl}
                          target="_blank"
                          className="text-teal-600 no-underline"
                        >
                          file.pdf
                        </a>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <h1 className="text-2xl font-bold">Write your Review</h1>
          <div className="flex items-center gap-10 my-4">
            <h1 className="text-xl font-bold">My rate</h1>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHover(value)}
                  onMouseLeave={() => setHover(0)}
                >
                  {(hover || rating) >= value ? (
                    <img
                      src={reviewstarfull}
                      alt="star icon"
                      className="w-5 h-5 text-yellow-400"
                    />
                  ) : (
                    <img
                      src={reviewstar}
                      alt="star icon"
                      className="w-5 h-5 text-gray-400"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold">Review</h1>
            <div className="mt-2">
              <div className="w-wull h-fit relative">
                <textarea
                  name="experience"
                  id="review"
                  placeholder="Describe your experience"
                  onChange={(e) => setDescription(e.target.value)}
                  className="resize-none rounded-xl border-1 border-[#CACACE] w-full h-35 p-3"
                  maxLength={300}
                />
                <p className="absolute bottom-2 right-2 text-[#CACACE]">
                  {description?.length}/300
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={addReview}
                  className="bg-[#34C759] text-white py-1 px-4 rounded-lg"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-10">Latest Reviews</h1>
          <div className="grid grid-cols-3 gap-8">
            {reviews
              ? reviews.map((review, i) => (
                  <div
                    className="h-fit border-1 border-[#D9D9D9] rounded-lg px-5 py-8 w-full"
                    key={i}
                  >
                    <div className="mb-3">{reviewStars(review.rating)}</div>
                    <p className="mb-3 block break-words">{review.comment}</p>
                    <div className="flex items-center gap-2">
                      <img
                        src={review?.profileImageUrl || employericon}
                        alt="profile image"
                        className="w-13 h-13 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-[#5c5c5c]">
                          {review.firstName} {review.lastName}
                        </p>
                        <p className="text-[#979797]">
                          {formatDate(review.creationDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : []}
          </div>
        </div>
      </main>
    </>
  );
};

export default TranslatorDetails;
