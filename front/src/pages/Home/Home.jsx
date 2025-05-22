import Navbar from "../../components/layout/Navbar";
import gps from "../../assets/location.png";
import search from "../../assets/search.png";
import logo from "../../assets/logo.png";
import blueline from "../../assets/blueline.png";
import rectangles from "../../assets/rectangles.png";
import chel from "../../assets/chel.png";
import arrow from "../../assets/arrow.png";
import arrowdown from "../../assets/arrowdown.png";
import rightarrow from "../../assets/rightarrow.png";
import arrowrighthover from "../../assets/arrowrighthover.png";
import postproject from "../../assets/postproject.png";
import business from "../../assets/business.png";
import businesshover from "../../assets/businesshover.png";
import sales from "../../assets/sales.png";
import saleshover from "../../assets/saleshover.png";
import micro from "../../assets/micro.png";
import microhover from "../../assets/microhover.png";
import humanresources from "../../assets/humanresources.png";
import humanresourceshover from "../../assets/humanresourceshover.png";
import overall from "../../assets/overall.png";
import overallhover from "../../assets/overallhover.png";
import finance from "../../assets/finance.png";
import financehover from "../../assets/financehover.png";
import engineering from "../../assets/engineering.png";
import engineeringhover from "../../assets/engineeringhover.png";
import technology from "../../assets/technology.png";
import technologyhover from "../../assets/technologyhover.png";
import instagram from "../../assets/instagram.png";
import facebook from "../../assets/facebook.png";
import linkedin from "../../assets/linkedin.png";
import twitter from "../../assets/twitter.png";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";

const icons = [
  { default: overall, hover: overallhover, alt: "overall icon" },
  { default: sales, hover: saleshover, alt: "sales icon" },
  { default: micro, hover: microhover, alt: "microphone icon" },
  { default: finance, hover: financehover, alt: "money icon" },
  { default: technology, hover: technologyhover, alt: "technology icon" },
  { default: engineering, hover: engineeringhover, alt: "engineering icon" },
  { default: business, hover: businesshover, alt: "business icon" },
  { default: humanresources, hover: humanresourceshover, alt: "people icon" },
];

export const Home = () => {
  const navigate = useNavigate();
  const [kazakhstanCities, setKazakhstanCities] = useState([]);
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [title, setTitle] = useState("");

  const handleSearchMarketing = () => {
    const query = new URLSearchParams();
    query.append("specialization", "Marketing Translation");
    navigate(`/project-catalog?${query.toString()}`);
  };
  const handleSearchLegal = () => {
    const query = new URLSearchParams();
    query.append("specialization", "Legal Translation");
    navigate(`/project-catalog?${query.toString()}`);
  };
  const handleSearchFinancial = () => {
    const query = new URLSearchParams();
    query.append("specialization", "Financial Translation");
    navigate(`/project-catalog?${query.toString()}`);
  };
  const handleSearchTechnical = () => {
    const query = new URLSearchParams();
    query.append("specialization", "Technical Translation");
    navigate(`/project-catalog?${query.toString()}`);
  };
  const handleSearchSoftware = () => {
    const query = new URLSearchParams();
    query.append("specialization", "Software Translation");
    navigate(`/project-catalog?${query.toString()}`);
  };
  const handleSearchDiplomatic = () => {
    const query = new URLSearchParams();
    query.append("specialization", "Diplomatic Translation");
    navigate(`/project-catalog?${query.toString()}`);
  };
  const handleSearchLiterary = () => {
    const query = new URLSearchParams();
    query.append("specialization", "Literary Translation");
    navigate(`/project-catalog?${query.toString()}`);
  };
  const handleSearch = () => {
    const query = new URLSearchParams();
    if (title) query.append("title", title);
    if (selectedCity) query.append("locations", selectedCity);
    navigate(`/project-catalog?${query.toString()}`);
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await api.get("/location/all");
        const cityList = response.data?.data;
        setKazakhstanCities(cityList);
      } catch (err) {}
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        const response = await api.get("/jobs/firstEight");
        const jobList = response.data?.data;
        setFeaturedJobs(jobList);
      } catch (err) {}
    };

    fetchFeaturedJobs();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <div className="relative md:pl-30 h-182 flex bg-[#F3F3F3]">
          <div className="w-full flex flex-col z-4 px-4">
            <h1 className="home text-4xl md:text-6xl md:w-100 mt-25 md:mt-35">
              DISCOVER HERE MORE{" "}
              <span className="text-[#71C39C]">PROJECTS</span>
            </h1>
            <img src={blueline} alt="blue line" className="w-55 md:w-93 py-4" />
            <p className="text-[#515B6F] md:w-110 md:text-xl">
              A platform that connects passionate translators with clients who
              need clear, professional, and multilingual communication.
            </p>
            <div className="grid md:flex items-center gap-5 bg-white w-full md:w-fit mt-8 px-3 py-4 md:px-6">
              <div className="flex items-center gap-3">
                <img src={search} alt="search icon" className="w-6 h-6" />
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="Project title or keyword"
                  className="border-b border-[#dfdfdf] p-2 w-full md:w-70 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <img src={gps} alt="gps icon" className="w-7 h-7" />
                <div className="relative w-full">
                  <select
                    value={selectedCity || ""}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="border-b border-[#dfdfdf] focus:outline-none appearance-none p-2 w-full md:min-w-70 text-[#8a8a8a]"
                  >
                    <option disabled value="">
                      Select a city
                    </option>
                    {kazakhstanCities.map((item, index) => (
                      <option key={index} value={item.city}>
                        {item.city}
                      </option>
                    ))}
                  </select>
                  <img
                    src={arrowdown}
                    alt="arrow pointing down"
                    className="absolute w-3.5 h-3.5 right-2 top-3.5"
                  />
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="font-bold bg-[#71C39C] text-white px-7 py-3"
              >
                Search projects
              </button>
            </div>
            <p className="mt-6 text-[#202430]">
              Popular:{" "}
              <span className="font-medium">
                Simultaneous translator, Digital Almaty, Certified Translator
              </span>
            </p>
          </div>
          <div className="">
            <img
              src={rectangles}
              alt="rectangles"
              className="object-cover absolute bottom-0 right-0 w-232 h-full z-1"
            />
            <img
              src={chel}
              alt="person image"
              className="hidden md:block object-cover absolute bottom-0 right-30 h-165 z-2"
            />
            <div className="w-60 h-25 md:w-100 md:h-50 absolute bottom-0 right-0 bg-white [clip-path:polygon(100%_0,100%_100%,0_100%)] z-3"></div>
          </div>
        </div>
        <div className="px-5 md:px-30 py-20 bg-white">
          <div className="flex items-center justify-between">
            <h1 className="home text-2xl md:text-3xl font-bold">
              Explore by <span className="text-[#71C39C]">specializations</span>
            </h1>
            <div
              className="flex items-center gap-2 md:gap-3 cursor-pointer"
              onClick={() => navigate("/project-catalog")}
            >
              <p className="text-[#71C39C] md:text-xl font-semibold">
                Show all projects
              </p>
              <img
                src={arrow}
                alt="arrow icon"
                className="w-4 h-4 md:w-5 md:h-5"
              />
            </div>
          </div>
          <div className="grid justify-center pl-4 md:pl-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-12">
            <div
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(0)}
              /* onTouchEnd={() => setHoveredIndex(null)} */
              onClick={() => navigate("/project-catalog")}
              className="flex flex-col justify-center p-6 w-74 h-50 border-2 border-[#D6DDEB] hover:border-none hover:bg-[#71C39C] hover:text-white cursor-pointer transition-all duration-75 ease-in-out"
            >
              <img
                src={hoveredIndex === 0 ? icons[0].hover : icons[0].default}
                alt="pen and ruler icon"
                className="w-10 h-10 mb-3"
              />
              <h1 className="text-2xl font-bold py-2">Overall</h1>
              <div className="flex items-center gap-3">
                <p
                  className={
                    hoveredIndex === 0
                      ? "text-white pb-1"
                      : "text-[#7C8493] pb-1"
                  }
                >
                  Available projects
                </p>
                <img
                  src={hoveredIndex === 0 ? arrowrighthover : rightarrow}
                  alt="arrow right icon"
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(1)}
              /* onTouchEnd={() => setHoveredIndex(null)} */
              onClick={handleSearchMarketing}
              className="flex flex-col justify-center p-6 w-74 h-50 border-2 border-[#D6DDEB] hover:border-none hover:bg-[#71C39C] hover:text-white cursor-pointer transition-all duration-75 ease-in-out"
            >
              <img
                src={hoveredIndex === 1 ? icons[1].hover : icons[1].default}
                alt="sales icon"
                className="w-10 h-10 mb-3"
              />
              <h1 className="text-2xl font-bold py-2 text-nowrap">
                Marketing Translation
              </h1>
              <div className="flex items-center gap-3">
                <p
                  className={
                    hoveredIndex === 1
                      ? "text-white pb-1"
                      : "text-[#7C8493] pb-1"
                  }
                >
                  Available projects
                </p>
                <img
                  src={hoveredIndex === 1 ? arrowrighthover : rightarrow}
                  alt="arrow right icon"
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div
              onMouseEnter={() => setHoveredIndex(2)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(2)}
              /* onTouchEnd={() => setHoveredIndex(null)} */
              onClick={handleSearchLegal}
              className="flex flex-col justify-center p-6 w-74 h-50 border-2 border-[#D6DDEB] hover:border-none hover:bg-[#71C39C] hover:text-white cursor-pointer transition-all duration-75 ease-in-out"
            >
              <img
                src={hoveredIndex === 2 ? icons[2].hover : icons[2].default}
                alt="sales icon"
                className="w-10 h-10 mb-3"
              />
              <h1 className="text-2xl font-bold py-2 text-nowrap">
                Legal Translation
              </h1>
              <div className="flex items-center gap-3">
                <p
                  className={
                    hoveredIndex === 2
                      ? "text-white pb-1"
                      : "text-[#7C8493] pb-1"
                  }
                >
                  Available projects
                </p>
                <img
                  src={hoveredIndex === 2 ? arrowrighthover : rightarrow}
                  alt="arrow right icon"
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div
              onMouseEnter={() => setHoveredIndex(3)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(3)}
              /* onTouchEnd={() => setHoveredIndex(null)} */
              onClick={handleSearchFinancial}
              className="flex flex-col justify-center p-6 w-74 h-50 border-2 border-[#D6DDEB] hover:border-none hover:bg-[#71C39C] hover:text-white cursor-pointer transition-all duration-75 ease-in-out"
            >
              <img
                src={hoveredIndex === 3 ? icons[3].hover : icons[3].default}
                alt="money icon"
                className="w-10 h-10 mb-3"
              />
              <h1 className="text-2xl font-bold py-2 text-nowrap">
                Financial Translation
              </h1>
              <div className="flex items-center gap-3">
                <p
                  className={
                    hoveredIndex === 3
                      ? "text-white pb-1"
                      : "text-[#7C8493] pb-1"
                  }
                >
                  Available projects
                </p>
                <img
                  src={hoveredIndex === 3 ? arrowrighthover : rightarrow}
                  alt="arrow right icon"
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div
              onMouseEnter={() => setHoveredIndex(4)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(4)}
              /* onTouchEnd={() => setHoveredIndex(null)} */
              onClick={handleSearchTechnical}
              className="flex flex-col justify-center p-6 w-74 h-50 border-2 border-[#D6DDEB] hover:border-none hover:bg-[#71C39C] hover:text-white cursor-pointer transition-all duration-75 ease-in-out"
            >
              <img
                src={hoveredIndex === 4 ? icons[4].hover : icons[4].default}
                alt="monitor icon"
                className="w-10 h-10 mb-3"
              />
              <h1 className="text-2xl font-bold py-2 text-nowrap">
                Technical Translation
              </h1>
              <div className="flex items-center gap-3">
                <p
                  className={
                    hoveredIndex === 4
                      ? "text-white pb-1"
                      : "text-[#7C8493] pb-1"
                  }
                >
                  Available projects
                </p>
                <img
                  src={hoveredIndex === 4 ? arrowrighthover : rightarrow}
                  alt="arrow right icon"
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div
              onMouseEnter={() => setHoveredIndex(5)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(5)}
              /* onTouchEnd={() => setHoveredIndex(null)} */
              onClick={handleSearchSoftware}
              className="flex flex-col justify-center p-6 w-74 h-50 border-2 border-[#D6DDEB] hover:border-none hover:bg-[#71C39C] hover:text-white cursor-pointer transition-all duration-75 ease-in-out"
            >
              <img
                src={hoveredIndex === 5 ? icons[5].hover : icons[5].default}
                alt="code icon"
                className="w-10 h-10 mb-3"
              />
              <h1 className="text-2xl font-bold py-2 text-nowrap">
                Software Localization
              </h1>
              <div className="flex items-center gap-3 w-fit">
                <p
                  className={
                    hoveredIndex === 5
                      ? "text-white pb-1"
                      : "text-[#7C8493] pb-1"
                  }
                >
                  Available projects
                </p>
                <img
                  src={hoveredIndex === 5 ? arrowrighthover : rightarrow}
                  alt="arrow right icon"
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div
              onMouseEnter={() => setHoveredIndex(6)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(6)}
              /* onTouchEnd={() => setHoveredIndex(null)} */
              onClick={handleSearchDiplomatic}
              className="flex flex-col justify-center p-6 w-74 h-50 border-2 border-[#D6DDEB] hover:border-none hover:bg-[#71C39C] hover:text-white cursor-pointer transition-all duration-75 ease-in-out"
            >
              <img
                src={hoveredIndex === 6 ? icons[6].hover : icons[6].default}
                alt="business icon"
                className="w-10 h-10 mb-3"
              />
              <h1 className="text-2xl font-bold py-2 text-nowrap">
                Diplomatic Translation
              </h1>
              <div className="flex items-center gap-3">
                <p
                  className={
                    hoveredIndex === 6
                      ? "text-white pb-1"
                      : "text-[#7C8493] pb-1"
                  }
                >
                  Available projects
                </p>
                <img
                  src={hoveredIndex === 6 ? arrowrighthover : rightarrow}
                  alt="arrow right icon"
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div
              onMouseEnter={() => setHoveredIndex(7)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(7)}
              /* onTouchEnd={() => setHoveredIndex(null)} */
              onClick={handleSearchLiterary}
              className="flex flex-col justify-center p-6 w-74 h-50 border-2 border-[#D6DDEB] hover:border-none hover:bg-[#71C39C] hover:text-white cursor-pointer transition-all duration-75 ease-in-out"
            >
              <img
                src={hoveredIndex === 7 ? icons[7].hover : icons[7].default}
                alt="business icon"
                className="w-10 h-10 mb-3"
              />
              <h1 className="text-2xl font-bold py-2 text-nowrap">
                Literary Translation
              </h1>
              <div className="flex items-center gap-3">
                <p
                  className={
                    hoveredIndex === 7
                      ? "text-white pb-1"
                      : "text-[#7C8493] pb-1"
                  }
                >
                  Available projects
                </p>
                <img
                  src={hoveredIndex === 7 ? arrowrighthover : rightarrow}
                  alt="arrow right icon"
                  className="w-5 h-5"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white px-5 md:px-30 pb-20">
          <div className="relative bg-[#71C39C] px-7 md:px-30 pt-8 md:pt-15 md:flex justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl w-52 md:w-90 text-white font-semibold">
                Start posting jobs today
              </h1>
              <button
                onClick={() => navigate("/signup")}
                className="mt-10 md:mt-20 bg-white text-[#71C39C] px-6 py-2 md:px-7 md:py-3 font-semibold"
              >
                Sign Up For Free
              </button>
            </div>
            <div className="mt-10 md:mt-0 h-[190px] md:h-[280px] overflow-hidden">
              <img
                src={postproject}
                alt="post project image"
                className="w-100"
              />
            </div>
            <div className="absolute top-0 left-0 w-25 h-10 md:w-30 md:h-15 bg-white [clip-path:polygon(0_0,100%_0,0_100%)] z-3"></div>
            <div className="w-25 h-10 md:w-30 md:h-15 absolute bottom-0 right-0 bg-white [clip-path:polygon(100%_0,100%_100%,0_100%)] z-3"></div>
          </div>
        </div>
        <div className="relative flex flex-col px-5 md:px-30 py-20 bg-[#F8F8FD]">
          <div className="flex flex-col z-4">
            <div className="flex items-center justify-between">
              <h1 className="home text-2xl md:text-3xl font-bold">
                Latest <span className="text-[#71C39C]">jobs open</span>
              </h1>
              <div
                className="flex items-center gap-2 md:gap-3 cursor-pointer"
                onClick={() => navigate("/project-catalog")}
              >
                <p className="text-[#71C39C] md:text-xl font-semibold">
                  Show all jobs
                </p>
                <img
                  src={arrow}
                  alt="arrow icon"
                  className="w-4 md:w-5 h-4 md:h-5 mt-0.5 md:mt-0"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
              {featuredJobs?.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-5 py-2 md:py-5 px-5 md:px-10 bg-white"
                >
                  <img
                    src={item?.employerProfilePicture}
                    alt="icon"
                    className="w-12 h-12 md:w-15 md:h-15 object-cover rounded-full mt-2"
                  />
                  <div>
                    <h1 className="md:text-lg font-semibold py-2">
                      {item?.title}
                    </h1>
                    <p className="text-[#515B6F] md:text-lg">
                      {item?.location}
                    </p>
                    <div className="md:flex items-center gap-2 mt-3">
                      <p className="rounded-full text-[#56CDAD] bg-green-50 w-fit px-3 py-1 text-nowrap">
                        Full-Time
                      </p>
                      {item?.specializations[0] && (
                        <p className="mt-2 md:mt-0 rounded-full text-sm md:text-md text-[#FFB836] border-1 w-fit px-3 py-1">
                          {item?.specializations[0]?.name}
                        </p>
                      )}
                      {item?.serviceTypes[0] && (
                        <p className="mt-2 md:mt-0 rounded-full text-sm md:text-md text-[#4640DE] border-1 w-fit px-3 py-1">
                          {item?.serviceTypes[0]?.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="">
            <img
              src={rectangles}
              alt="rectangles"
              className="object-cover absolute top-0 right-0 w-200 h-full z-1"
            />
            <div className="absolute top-0 left-0 w-40 h-20 bg-white [clip-path:polygon(0_0,100%_0,0_100%)] z-3"></div>
          </div>
        </div>
      </main>
      <footer className="bg-[#202430] text-white px-5 md:px-30 py-10">
        <div className="md:flex justify-between gap-10 text-[#D6DDEB] mt-5">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="logo icon" className="w-7 h-7" />
              <h1 className="text-2xl font-bold text-white">TildarMen</h1>
            </div>
            <p className="md:w-100 py-5">
              A platform that connects passionate translators with clients who
              need clear, professional, and multilingual communication.
            </p>
          </div>
          <div className="flex gap-30">
            <div>
              <h1 className="text-lg font-bold text-white">About</h1>
              <p className="py-5 cursor-pointer">Companies</p>
              <p className="cursor-pointer">Pricing</p>
              <p className="py-5 cursor-pointer">Terms</p>
              <p className="cursor-pointer">Advice</p>
              <p className="py-5 cursor-pointer">Privacy Policy</p>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Recources</h1>
              <p className="py-5 cursor-pointer">Help Docs</p>
              <p className="cursor-pointer">Guide</p>
              <p className="py-5 cursor-pointer">Updates</p>
              <p className="cursor-pointer">Contact Us</p>
            </div>
          </div>
        </div>
        <hr className="border-white border-t-2 my-10 w-full opacity-10" />
        <div className="flex items-center flex-col md:flex-row justify-between">
          <h1 className="opacity-50">2025 @ TildarMen. All rights reserved.</h1>
          <div className="flex items-center gap-5 mt-5 md:mt-0">
            <img
              src={facebook}
              alt="icon"
              className="w-10 h-10 cursor-pointer"
            />
            <img
              src={instagram}
              alt="icon"
              className="w-10 h-10 cursor-pointer"
            />
            <img
              src={linkedin}
              alt="icon"
              className="w-10 h-10 cursor-pointer"
            />
            <img
              src={twitter}
              alt="icon"
              className="w-10 h-10 cursor-pointer"
            />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
