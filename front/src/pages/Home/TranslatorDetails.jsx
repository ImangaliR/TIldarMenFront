import Navbar from "../../components/layout/Navbar";
import profileicon from "../../assets/profileicon.png";
import star from "../../assets/full_star.png";
import emptystar from "../../assets/empty_star.png";
const TranslatorDetails = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-between px-40 py-5 w-full bg-[#EAF4F4]">
        <div className="flex items-center gap-10">
          <img src={profileicon} alt="profile icon" className="w-35 h-35" />
          <div>
            <h1>Full Name</h1>
            <p>Professional Title</p>
            <h2>Based In: Location</h2>
            <h2>Availability: Flexible</h2>
            <div className="flex items-center gap-2">
              <img src={star} alt="star icon" className="w-4 h-4" />
              <img src={star} alt="star icon" className="w-4 h-4" />
              <img src={star} alt="star icon" className="w-4 h-4" />
              <img src={emptystar} alt="empty star icon" className="w-4 h-4" />
              <img src={emptystar} alt="empty star icon" className="w-4 h-4" />
            </div>
          </div>
        </div>
        <div className="grid">
          <button className="text-[#FF0000] bg-white border-1 rounded-md font-semibold flex items-center justify-center gap-2 px-2 py-1">
            Report
          </button>
          <button className="bg-[#2A9E97] text-white px-2 py-1 rounded-3xl">
            Leave request
          </button>
          <button className="text-[#2A9E97] border-1 px-2 py-1 rounded-3xl">
            Chat with Translator
          </button>
        </div>
      </div>
      <main className="bg-white w-full px-40 py-5">
        <div>
          <div>
            <h1 className="text-2xl font-bold">Introduction</h1>
            <div>
              <h1 className="font-bold ml-5">About</h1>
              <p className="w-100">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit fuga quae repudiandae aliquam, quasi sunt
                voluptate error! Animi libero numquam dolore eos placeat, vel,
                nam dignissimos sit assumenda molestias optio. Similique quasi
                officiis enim iusto tempore aspernatur eos sint consequuntur
                asperiores placeat error
              </p>
            </div>
            <div>
              <h1 className="font-bold ml-5">Video Greeting</h1>
            </div>
          </div>
          <div>
            <h1>Languages & Translator Details</h1>
          </div>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </main>
    </>
  );
};

export default TranslatorDetails;
