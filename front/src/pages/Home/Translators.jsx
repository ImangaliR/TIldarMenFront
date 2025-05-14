import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Search from "../../components/Search/Search";
import TranslatorCards from "./TranslatorCards";
import api from "../../services/api";
import { toast } from "react-toastify";
import TranslatorsFilter from "../../components/Filter/TranslatorsFilter";
import { Outlet } from "react-router-dom";
import { useMatch } from "react-router-dom";

const Translators = () => {
  const [resultCount, setResultCount] = useState(0);
  const [userSearch, setUserSearch] = useState("");
  const [translators, setTranslators] = useState([]);
  const isDetailPage = useMatch("/translators/translator-details/:id");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    fetchTranslators(userSearch);
  }, [
    selectedLanguages,
    selectedSpecializations,
    selectedAvailabilities,
    selectedLocations,
    selectedServices,
  ]);

  const fetchTranslators = async (searchQuery = "") => {
    var postChecks = {
      locations: selectedLocations,
      languages: selectedLanguages,
      serviceTypes: selectedServices,
      specializations: selectedSpecializations,
      availability: selectedAvailabilities[0] || null,
    };

    try {
      const response = await api.post(
        `/users/translators/filter?username=${searchQuery}`,
        postChecks
      );
      setTranslators(response.data?.data);
      setResultCount(response.data?.data.length);
    } catch (err) {
      toast.error("Failed to fetch translators.");
    }
  };

  const translatorCards = translators.map((translator, i) => (
    <TranslatorCards
      key={i}
      id={translator?.id || null}
      name={translator?.firstName || ""}
      profileImageUrl={translator?.profileImageUrl || null}
      surname={translator?.lastName || ""}
      serviceTypes={translator?.serviceTypes || []}
      specializations={translator?.specializations || []}
      languages={translator?.languages || []}
      location={translator?.location || null}
    />
  ));

  return (
    <>
      <Navbar />
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="grid justify-center">
          <Search
            setUserSearch={setUserSearch}
            handleSearch={fetchTranslators}
            placeholder={"Please enter name or surname"}
          />
          <div className="flex gap-5 my-10">
            <TranslatorsFilter
              selectedLanguages={selectedLanguages}
              selectedSpecializations={selectedSpecializations}
              selectedAvailabilities={selectedAvailabilities}
              selectedLocations={selectedLocations}
              selectedServices={selectedServices}
              setSelectedLanguages={setSelectedLanguages}
              setSelectedSpecializations={setSelectedSpecializations}
              setSelectedAvailabilities={setSelectedAvailabilities}
              setSelectedLocations={setSelectedLocations}
              setSelectedServices={setSelectedServices}
            />
            <main className="max-w-260">
              <p className="text-2xl mb-1">Results ({resultCount})</p>
              <div className="grid grid-cols-2 gap-x-1 gap-y-3 xl:grid-cols-3 xl:gap-x-3 xl:gap-y-5 ">
                {translatorCards}
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Translators;
