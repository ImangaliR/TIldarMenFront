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
  const [selectedCity, setSelectedCity] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

  return (
    <>
      <Navbar />
      <main>
        <div className="relative pl-30 h-182 flex bg-[#F3F3F3]">
          <div className="w-full flex flex-col">
            <h1 className="home text-6xl w-100 mt-35">
              DISCOVER HERE MORE{" "}
              <span className="text-[#71C39C]">PROJECTS</span>
            </h1>
            <img src={blueline} alt="blue line" className="w-93 py-4" />
            <p className="text-[#515B6F] w-110 text-xl">
              A platform that connects passionate translators with clients who
              need clear, professional, and multilingual communication.
            </p>
            <div className="flex items-center gap-5 bg-white w-fit mt-8 py-4 px-6 z-4">
              <div className="flex items-center gap-3">
                <img src={search} alt="search icon" className="w-6 h-6" />
                <input
                  type="text"
                  placeholder="Project title or keyword"
                  className="border-b border-[#dfdfdf] p-2 w-70 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <img src={gps} alt="gps icon" className="w-7 h-7" />
                <div className="relative">
                  <select
                    value={selectedCity || ""}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="border-b border-[#dfdfdf] focus:outline-none appearance-none p-2 w-70 text-[#8a8a8a]"
                  >
                    <option disabled value="">
                      -- Select a city --
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
              <button className="font-bold bg-[#71C39C] text-white px-7 py-3">
                Search my projects
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
              className="object-cover absolute bottom-0 right-0 w-232 z-1"
            />
            <img
              src={chel}
              alt="person image"
              className="object-cover absolute bottom-0 right-30 h-165 z-2"
            />
            <div className="w-100 h-50 absolute bottom-0 right-0 bg-white [clip-path:polygon(100%_0,100%_100%,0_100%)] z-3"></div>
          </div>
        </div>
        <div className="px-30 py-20 bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-5xl font-bold">
              Explore by <span className="text-[#71C39C]">specializations</span>
            </h1>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/project-catalog")}
            >
              <p className="text-[#71C39C] text-xl font-semibold">
                Show all projects
              </p>
              <img src={arrow} alt="arrow icon" className="w-5 h-5" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-5 mt-12">
            <div
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
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
        <div></div>
      </main>
      <footer className="bg-[#202430] text-white px-30 py-10">
        <div className="flex justify-between gap-10 text-[#D6DDEB] mt-5">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="logo icon" className="w-7 h-7" />
              <h1 className="text-2xl font-bold text-white">TildarMen</h1>
            </div>
            <p className="w-100 py-5">
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
              <h className="text-lg font-bold text-white">Recources</h>
              <p className="py-5 cursor-pointer">Help Docs</p>
              <p className="cursor-pointer">Guide</p>
              <p className="py-5 cursor-pointer">Updates</p>
              <p className="cursor-pointer">Contact Us</p>
            </div>
          </div>
        </div>
        <hr className="border-white border-t-2 my-10 w-full opacity-10" />
        <div className="flex items-center justify-between">
          <h1 className="opacity-50">2025 @ TildarMen. All rights reserved.</h1>
          <div className="flex items-center gap-5">
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
