import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Search from "../../components/Search/Search";
import TranslatorCards from "./TranslatorCards";

const Translators = () => {
  const [resultCount, setResultCount] = useState(0);

  const cardExample = [
    {
      img: {
        src: "https://img.freepik.com/premium-vector/profile-icon_933463-643.jpg",
        alt: "profile icon",
      },
      name: "Asar",
      jobtitle: "Simultaneous interpreter",
      location: "Almaty",
      languages: "Arabic, Kazakh, Russian, Turkish",
      services: "Legal & Contracts; Finance & Banking",
      specialization: "Simultaneous Interpretation ",
    },
    {
      img: {
        src: "https://cdn-icons-png.flaticon.com/512/6522/6522516.png",
        alt: "profile icon",
      },
      name: "Asar",
      jobtitle: "Simultaneous interpreter",
      location: "Almaty",
      languages: "Arabic, Kazakh, Russian, Turkish",
      services: "Legal & Contracts; Finance & Banking",
      specialization: "Simultaneous Interpretation ",
    },
    {
      img: {
        src: "https://cdn-icons-png.flaticon.com/512/6522/6522516.png",
        alt: "profile icon",
      },
      name: "Asar",
      jobtitle: "Simultaneous interpreter",
      location: "Almaty",
      languages: "Arabic, Kazakh, Russian, Turkish",
      services: "Legal & Contracts; Finance & Banking",
      specialization: "Simultaneous Interpretation ",
    },
    {
      img: {
        src: "https://cdn-icons-png.flaticon.com/512/6522/6522516.png",
        alt: "profile icon",
      },
      name: "Asar",
      jobtitle: "Simultaneous interpreter",
      location: "Almaty",
      languages: "Arabic, Kazakh, Russian, Turkish",
      services: "Legal & Contracts; Finance & Banking",
      specialization: "Simultaneous Interpretation ",
    },
  ];

  const translatorCards = cardExample.map((translator) => (
    <TranslatorCards
      img={translator.img}
      name={translator.name}
      jobtitle={translator.jobtitle}
      location={translator.location}
      languages={translator.languages}
      services={translator.services}
      specialization={translator.specialization}
    />
  ));

  return (
    <>
      <Navbar />
      <div>
        <Search />
        <div>
          <main className="max-w-200">
            <p>Results({resultCount})</p>
            <div className="grid grid-cols-2 gap-x-2 gap-y-5">
              {translatorCards}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Translators;
