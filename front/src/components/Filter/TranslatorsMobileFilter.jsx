import rightarrow from "../../assets/rightarrow.png";

const languages = [
  {
    name: "Afrikaans",
  },
  {
    name: "Albanian",
  },
  {
    name: "Amharic",
  },
  {
    name: "Arabic",
  },
  {
    name: "Armenian",
  },
  {
    name: "Azerbaijani",
  },
  {
    name: "Basque",
  },
  {
    name: "Belarusian",
  },
  {
    name: "Bengali",
  },
  {
    name: "Bosnian",
  },
  {
    name: "Bulgarian",
  },
  {
    name: "Catalan",
  },
  {
    name: "Cebuano",
  },
  {
    name: "Chinese",
  },
  {
    name: "Corsican",
  },
  {
    name: "Croatian",
  },
  {
    name: "Czech",
  },
  {
    name: "Danish",
  },
  {
    name: "Dutch",
  },
  {
    name: "English",
  },
  {
    name: "Esperanto",
  },
  {
    name: "Estonian",
  },
  {
    name: "Finnish",
  },
  {
    name: "French",
  },
  {
    name: "Galician",
  },
  {
    name: "Georgian",
  },
  {
    name: "German",
  },
  {
    name: "Greek",
  },
  {
    name: "Gujarati",
  },
  {
    name: "Haitian Creole",
  },
  {
    name: "Hausa",
  },
  {
    name: "Hebrew",
  },
  {
    name: "Hindi",
  },
  {
    name: "Hungarian",
  },
  {
    name: "Icelandic",
  },
  {
    name: "Igbo",
  },
  {
    name: "Indonesian",
  },
  {
    name: "Irish",
  },
  {
    name: "Italian",
  },
  {
    name: "Japanese",
  },
  {
    name: "Javanese",
  },
  {
    name: "Kannada",
  },
  {
    name: "Kazakh",
  },
  {
    name: "Khmer",
  },
  {
    name: "Korean",
  },
  {
    name: "Kurdish",
  },
  {
    name: "Kyrgyz",
  },
  {
    name: "Lao",
  },
  {
    name: "Latin",
  },
  {
    name: "Latvian",
  },
  {
    name: "Lithuanian",
  },
  {
    name: "Luxembourgish",
  },
  {
    name: "Macedonian",
  },
  {
    name: "Malagasy",
  },
  {
    name: "Malay",
  },
  {
    name: "Malayalam",
  },
  {
    name: "Maltese",
  },
  {
    name: "Maori",
  },
  {
    name: "Marathi",
  },
  {
    name: "Mongolian",
  },
  {
    name: "Myanmar",
  },
  {
    name: "Nepali",
  },
  {
    name: "Norwegian",
  },
  {
    name: "Odia (Oriya)",
  },
  {
    name: "Pashto",
  },
  {
    name: "Persian",
  },
  {
    name: "Polish",
  },
  {
    name: "Portuguese",
  },
  {
    name: "Punjabi",
  },
  {
    name: "Romanian",
  },
  {
    name: "Russian",
  },
  {
    name: "Samoan",
  },
  {
    name: "Scottish Gaelic",
  },
  {
    name: "Serbian",
  },
  {
    name: "Sesotho",
  },
  {
    name: "Shona",
  },
  {
    name: "Sindhi",
  },
  {
    name: "Sinhala",
  },
  {
    name: "Slovak",
  },
  {
    name: "Slovenian",
  },
  {
    name: "Somali",
  },
  {
    name: "Spanish",
  },
  {
    name: "Sundanese",
  },
  {
    name: "Swahili",
  },
  {
    name: "Swedish",
  },
  {
    name: "Tagalog",
  },
  {
    name: "Tajik",
  },
  {
    name: "Tamil",
  },
  {
    name: "Tatar",
  },
  {
    name: "Telugu",
  },
  {
    name: "Thai",
  },
  {
    name: "Turkish",
  },
  {
    name: "Ukrainian",
  },
  {
    name: "Urdu",
  },
  {
    name: "Uzbek",
  },
  {
    name: "Vietnamese",
  },
  {
    name: "Welsh",
  },
  {
    name: "Xhosa",
  },
  {
    name: "Yiddish",
  },
  {
    name: "Yoruba",
  },
  {
    name: "Zulu",
  },
];

const specialization = [
  {
    name: "Legal Translation",
  },
  {
    name: "Medical Translation",
  },
  {
    name: "Technical Translation",
  },
  {
    name: "Financial Translation",
  },
  {
    name: "Marketing Translation",
  },
  {
    name: "Literary Translation",
  },
  {
    name: "Scientific Translation",
  },
  {
    name: "Software Localization",
  },
  {
    name: "Website Localization",
  },
  {
    name: "Diplomatic Translation",
  },
];

const location = [
  {
    city: "Almaty",
  },
  {
    city: "Astana",
  },
  {
    city: "Shymkent",
  },
  {
    city: "Aktobe",
  },
  {
    city: "Karaganda",
  },
  {
    city: "Taraz",
  },
  {
    city: "Pavlodar",
  },
  {
    city: "Oskemen",
  },
  {
    city: "Semey",
  },
  {
    city: "Atyrau",
  },
  {
    city: "Aktau",
  },
  {
    city: "Kostanay",
  },
  {
    city: "Kyzylorda",
  },
  {
    city: "Oral",
  },
  {
    city: "Petropavl",
  },
  {
    city: "Taldykorgan",
  },
  {
    city: "Ekibastuz",
  },
  {
    city: "Turkestan",
  },
  {
    city: "Kokshetau",
  },
  {
    city: "Zhanaozen",
  },
  {
    city: "Rudny",
  },
];

const service = [
  {
    name: "Book Translation",
  },
  {
    name: "Real-time Interpretation",
  },
  {
    name: "Video Game Localization",
  },
  {
    name: "Movie & TV Subtitle Translation",
  },
  {
    name: "Website Localization",
  },
  {
    name: "Software Localization",
  },
  {
    name: "Medical Translation",
  },
  {
    name: "Legal Document Translation",
  },
  {
    name: "Financial Document Translation",
  },
  {
    name: "Marketing & Advertising Translation",
  },
];

const TranslatorsModileFilter = ({
  setSelectedServices,
  setSelectedLocations,
  setSelectedAvailabilities,
  setSelectedSpecializations,
  setSelectedLanguages,
  selectedServices,
  selectedLocations,
  selectedAvailabilities,
  selectedSpecializations,
  selectedLanguages,
  setMobileFilterOn,
}) => {
  const availability = ["Busy", "Available"];

  const handleReset = () => {
    setSelectedAvailabilities([]);
    setSelectedLanguages([]);
    setSelectedLocations([]);
    setSelectedServices([]);
    setSelectedSpecializations([]);
  };
  const handleLanguageCheck = (item) => {
    setSelectedLanguages((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };
  const handleSpecializationCheck = (item) => {
    setSelectedSpecializations((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };
  const handleAvailabilityCheck = (item) => {
    setSelectedAvailabilities((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };
  const handleLocationCheck = (item) => {
    setSelectedLocations((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };
  const handleServiceCheck = (item) => {
    setSelectedServices((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <>
      <section className="fixed top-0 left-0 w-full h-full bg-white z-50 overflow-y-auto px-3 py-5">
        <div className="flex items-center justify-between mb-2 rounded-md">
          <div className="flex items-center gap-2">
            <img
              onClick={() => setMobileFilterOn(false)}
              src={rightarrow}
              alt="arrow"
              className="rotate-180 w-4 h-4 "
            />
            <h1 className="text-lg font-semibold">Filters</h1>
          </div>
          <button
            onClick={handleReset}
            className="text-sm text-[#192DF7] cursor-pointer"
          >
            reset
          </button>
        </div>

        <div>
          <div className="mb-5 bg-white rounded-md">
            <h1>Languages</h1>
            <div className="max-h-50 overflow-y-auto mt-1">
              {languages.map((lang, i) => (
                <label key={i} className="flex items-center space-x-2 ">
                  <input
                    type="checkbox"
                    value={lang.name}
                    checked={selectedLanguages.includes(lang.name)}
                    onChange={() => handleLanguageCheck(lang.name)}
                  />
                  <span className="font-light py-1">{lang.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-5 bg-white rounded-md">
            <h1>Specializations</h1>
            <div className="max-h-60 overflow-y-auto mt-1">
              {specialization.map((spec, i) => (
                <label key={i} className="flex items-center space-x-2 ">
                  <input
                    type="checkbox"
                    value={spec.name}
                    checked={selectedSpecializations.includes(spec.name)}
                    onChange={() => handleSpecializationCheck(spec.name)}
                  />
                  <span className="font-light py-1">{spec.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-5 bg-white rounded-md">
            <h1>Availability & Work Type</h1>
            <div className="mt-1">
              {availability.map((avai, i) => (
                <label key={i} className="flex items-center space-x-2 ">
                  <input
                    type="checkbox"
                    value={avai}
                    checked={selectedAvailabilities.includes(avai)}
                    onChange={() => handleAvailabilityCheck(avai)}
                  />
                  <span className="font-light py-1">{avai}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-5 bg-white rounded-md">
            <h1>Locations</h1>
            <div className="max-h-60 overflow-y-auto mt-1">
              {location.map((loc, i) => (
                <label key={i} className="flex items-center space-x-2 ">
                  <input
                    type="checkbox"
                    value={loc.city}
                    checked={selectedLocations.includes(loc.city)}
                    onChange={() => handleLocationCheck(loc.city)}
                  />
                  <span className="font-light py-1">{loc.city}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-5 bg-white rounded-md">
            <h1>Services</h1>
            <div className="max-h-60 overflow-y-auto mt-1">
              {service.map((ser, i) => (
                <label key={i} className="flex items-center space-x-2 ">
                  <input
                    type="checkbox"
                    value={ser.name}
                    checked={selectedServices.includes(ser.name)}
                    onChange={() => handleServiceCheck(ser.name)}
                  />
                  <span className="font-light py-1">{ser.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TranslatorsModileFilter;
