import Navbar from "../../components/layout/Navbar";
import gps from "../../assets/location.png";
import search from "../../assets/search.png";
import blueline from "../../assets/blueline.png";
import rectangles from "../../assets/rectangles.png";
import chel from "../../assets/chel.png";
import arrow from "../../assets/arrow.png";
import arrowdown from "../../assets/arrowdown.png";
import rightarrow from "../../assets/rightarrow.png";
import business from "../../assets/business.png";
import sales from "../../assets/sales.png";
import overall from "../../assets/overall.png";
import finance from "../../assets/finance.png";
import engineering from "../../assets/engineering.png";
import technology from "../../assets/technology.png";
import instagram from "../../assets/instagram.png";
import facebook from "../../assets/facebook.png";
import linkedin from "../../assets/linkedin.png";
import twitter from "../../assets/twitter.png";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";

export const Home = () => {
  const navigate = useNavigate();
  const [kazakhstanCities, setKazakhstanCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

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
              <span className="text-[#26A4FF]">PROJECTS</span>
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
              <button className="font-bold bg-[#4640DE] text-white px-7 py-3">
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
              Explore by <span className="text-[#26A4FF]">specializations</span>
            </h1>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/project-catalog")}
            >
              <p className="text-[#4640DE] text-xl font-semibold">
                Show all projects
              </p>
              <img src={arrow} alt="arrow icon" className="w-5 h-5" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-5 mt-12">
            <div className="flex flex-col justify-center p-6 w-74 h-50 border-2 border-[#D6DDEB]">
              <img
                src={overall}
                alt="pen and ruler icon"
                className="w-10 h-10"
              />
              <h1 className="text-2xl font-bold py-2">Overall</h1>
              <div className="flex items-center gap-3 cursor-pointer">
                <p className="text-[#7C8493] pb-1">Available projects</p>
                <img
                  src={rightarrow}
                  alt="arrow right icon"
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 w-74 h-50 border-2 border-[#D6DDEB]">
              <img src={sales} alt="sales icon" className="w-10 h-10" />
              <h1 className="text-2xl font-bold py-2 text-nowrap">
                Marketing Translation
              </h1>
              <div className="flex items-center gap-3 cursor-pointer">
                <p className="text-[#7C8493] pb-1">Available projects</p>
                <img
                  src={rightarrow}
                  alt="arrow right icon"
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 w-74 h-50 border-2 border-[#D6DDEB]">
              <img src={finance} alt="money icon" className="w-10 h-10" />
              <h1 className="text-2xl font-bold py-2 text-nowrap">
                Financial Translation
              </h1>
              <div className="flex items-center gap-3 cursor-pointer">
                <p className="text-[#7C8493] pb-1">Available projects</p>
                <img
                  src={rightarrow}
                  alt="arrow right icon"
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 w-74 h-50 border-2 border-[#D6DDEB]">
              <img src={technology} alt="monitor icon" className="w-10 h-10" />
              <h1 className="text-2xl font-bold py-2 text-nowrap">
                Technical Translation
              </h1>
              <div className="flex items-center gap-3 cursor-pointer">
                <p className="text-[#7C8493] pb-1">Available projects</p>
                <img
                  src={rightarrow}
                  alt="arrow right icon"
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 w-74 h-50 border-2 border-[#D6DDEB]">
              <img src={engineering} alt="code icon" className="w-10 h-10" />
              <h1 className="text-2xl font-bold py-2 text-nowrap">
                Software Localization
              </h1>
              <div className="flex items-center gap-3 cursor-pointer">
                <p className="text-[#7C8493] pb-1">Available projects</p>
                <img
                  src={rightarrow}
                  alt="arrow right icon"
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 w-74 h-50 border-2 border-[#D6DDEB]">
              <img src={business} alt="business icon" className="w-10 h-10" />
              <h1 className="text-2xl font-bold py-2 text-nowrap">
                Diplomatic Translation
              </h1>
              <div className="flex items-center gap-3 cursor-pointer">
                <p className="text-[#7C8493] pb-1">Available projects</p>
                <img
                  src={rightarrow}
                  alt="arrow right icon"
                  className="w-5 h-5"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-[#202430] text-white px-30 py-10">
        <div className="flex justify-between gap-10 text-[#D6DDEB] mt-5">
          <div>
            <h1 className="text-2xl font-bold text-white">TildarMen</h1>
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
            <div>
              <h1 className="text-lg font-bold text-white">
                Get job notifications
              </h1>
              <p className="w-65 py-5">
                The latest project news, articles, sent to your inbox weekly.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="bg-white px-4 py-2 focus:outline-none"
                />
                <button className="font-bold bg-[#4640DE] text-white px-5 py-2">
                  Subscribe
                </button>
              </div>
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
