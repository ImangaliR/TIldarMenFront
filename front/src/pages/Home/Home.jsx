import Navbar from "../../components/layout/Navbar";
import gps from "../../assets/location.png";
import search from "../../assets/search.png";
import blueline from "../../assets/blueline.png";
import rectangles from "../../assets/rectangles.png";
import chel from "../../assets/chel.png";
import arrow from "../../assets/arrow.png";
import arrowdown from "../../assets/arrowdown.png";
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
        <div className="px-30 bg-white">
          <div className="pt-20 flex items-center justify-between">
            <h1 className="text-4xl font-bold">
              Explore by <span className="text-[#26A4FF]">specializations</span>
            </h1>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/project-catalog")}
            >
              <p className="text-[#4640DE] text-lg font-semibold">
                Show all projects
              </p>
              <img src={arrow} alt="arrow icon" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
