import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Search from "../../components/Search/Search";
import TranslatorCards from "./TranslatorCards";
import api from "../../services/api";
import { toast } from "react-toastify";
import TranslatorsFilter from "../../components/Filter/TranslatorsFilter";
import { Outlet } from "react-router-dom";
import { useMatch } from "react-router-dom";
import SimpleLoader from "../../components/Loader/SimpleLoader";

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
  const [isLoading, setIsLoading] = useState(false);
  const [filterUsed, setFilterUsed] = useState(false);

  useEffect(() => {
    fetchTranslators(userSearch);
    isFilterUsed();
  }, [
    selectedLanguages,
    selectedSpecializations,
    selectedAvailabilities,
    selectedLocations,
    selectedServices,
  ]);

  const fetchTranslators = async (searchQuery = "") => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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

  const isFilterUsed = () => {
    if (
      selectedLanguages.length > 0 ||
      selectedServices.length > 0 ||
      selectedLocations.length > 0 ||
      selectedSpecializations.length > 0 ||
      selectedAvailabilities.length > 0
    ) {
      setFilterUsed(true);
    } else {
      setFilterUsed(false);
    }
  };

  return (
    <>
      <Navbar />
      {isDetailPage ? (
        <Outlet />
      ) : (
        <div className="grid md:justify-center">
          <Search
            setUserSearch={setUserSearch}
            handleSearch={fetchTranslators}
            placeholder={"Please enter name or surname"}
            value={userSearch}
            setSelectedLanguages={setSelectedLanguages}
            selectedLanguages={selectedLanguages}
            setSelectedSpecializations={setSelectedSpecializations}
            selectedSpecializations={selectedSpecializations}
            setSelectedLocations={setSelectedLocations}
            selectedLocations={selectedLocations}
            setSelectedServices={setSelectedServices}
            selectedServices={selectedServices}
            setSelectedAvailabilities={setSelectedAvailabilities}
            selectedAvailabilities={selectedAvailabilities}
            filterUsed={filterUsed}
          />
          <div className="flex gap-5 my-10 w-full">
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
            <main className="w-full md:max-w-260 px-2 md:px-0">
              <div className="flex items-center gap-10">
                <p className="text-xl md:text-2xl mb-1 pl-1 md:pl-0">
                  Results ({resultCount})
                </p>
                {isLoading && (
                  <div className="flex items-center justify-center">
                    <SimpleLoader className="h-6 md:h-7" />
                  </div>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-x-1 gap-y-3 xl:grid-cols-3 xl:gap-x-3 xl:gap-y-5 ">
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
