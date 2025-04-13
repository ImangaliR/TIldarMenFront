import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Search from "../../components/Search/Search";
import TranslatorCards from "./TranslatorCards";
import api from "../../services/api";
import { toast } from "react-toastify";

const Translators = () => {
  const [resultCount, setResultCount] = useState(0);
  const [userSearch, setUserSearch] = useState("");
  const [translators, setTranslators] = useState([]);

  useEffect(() => {
    fetchTranslators(userSearch);
  }, []);

  const fetchTranslators = async (searchQuery = "") => {
    try {
      const response = await api.get(
        `/users/translators/search?username=${searchQuery}`
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
      <div className="grid justify-center">
        <Search
          setUserSearch={setUserSearch}
          handleSearch={fetchTranslators}
          placeholder={"Please enter name or surname"}
        />
        <div className="my-10">
          <main className="max-w-260 w-full">
            <p className="text-2xl mb-1">Results ({resultCount})</p>
            <div className="grid grid-cols-3 gap-x-3 gap-y-5">
              {translatorCards}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Translators;
