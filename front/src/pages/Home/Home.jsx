import Navbar from "../../components/layout/Navbar";
import gps from "../../assets/location.png";
import search from "../../assets/search.png";

export const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <div>
          <h1 className="text-3xl">
            DISCOVER HERE MORE <span className="text-[#26A4FF]">PROJECTS</span>
          </h1>
          <p>
            A platform that connects passionate translators with clients who
            need clear, professional, and multilingual communication.
          </p>
          <div className="flex items-center gap-5 bg-white w-fit p-4">
            <div className="flex items-center gap-3">
              <img src={search} alt="search icon" className="w-5 h-5" />
              <input
                type="text"
                placeholder="Project title or keyword"
                className="border-b border-[#dfdfdf] p-2"
              />
            </div>
            <div className="flex items-center gap-3">
              <img src={gps} alt="gps icon" className="w-6 h-6" />
              <input
                type="text"
                placeholder=""
                className="border-b border-[#dfdfdf] p-2"
              />
            </div>
            <button className="bg-[#4640DE] text-white px-5 py-2">
              Search my projects
            </button>
          </div>
          <p>
            Popular : Simultaneous translator, Digital Almaty, Certified
            Translator
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
