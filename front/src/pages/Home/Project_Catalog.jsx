import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Search from "./../../components/Search/Search";
import JobCards from "./JobCards";
import api from "../../services/api";
import { toast } from "react-toastify";
import JobsFilter from "../../components/Filter/JobsFilter";
import SimpleLoader from "./../../components/Loader/SimpleLoader";
import { useLocation } from "react-router-dom";

const ProjectCatalog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [jobCount, setJobCount] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const title = params.get("title") || "";
    const city = params.get("locations");
    const specialization = params.get("specialization");

    setUserSearch(title);
    if (city) {
      setSelectedLocations([city]);
    }
    if (specialization) {
      setSelectedSpecializations([specialization]);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const title = params.get("title") || "";
    const city = params.get("locations");
    const specialization = params.get("specialization");

    const filters = {
      locations: city ? [city] : selectedLocations,
      languages: selectedLanguages,
      serviceTypes: selectedServices,
      specializations: specialization
        ? [specialization]
        : selectedSpecializations,
    };

    fetchJobs(title || userSearch, filters);
  }, [
    userSearch,
    selectedLanguages,
    selectedSpecializations,
    selectedLocations,
    selectedServices,
  ]);

  const fetchJobs = async (searchQuery = "", filters = null) => {
    setIsLoading(true);

    var postChecks = filters || {
      locations: selectedLocations,
      languages: selectedLanguages,
      serviceTypes: selectedServices,
      specializations: selectedSpecializations,
    };

    try {
      const response = await api.post(
        `/jobs/filter?title=${searchQuery}`,
        postChecks
      );
      console.log("Response", response.data.data);
      setJobs(response?.data?.data);
      setJobCount(response?.data?.data.length);
    } catch (err) {
      toast.error("Failed to fetch jobs.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="grid justify-center">
        <Search
          setUserSearch={setUserSearch}
          handleSearch={fetchJobs}
          placeholder={"Please enter a job title"}
          value={userSearch}
        />
        <div className="flex gap-5 my-10 w-full">
          <JobsFilter
            setSelectedLanguages={setSelectedLanguages}
            selectedLanguages={selectedLanguages}
            setSelectedSpecializations={setSelectedSpecializations}
            selectedSpecializations={selectedSpecializations}
            setSelectedLocations={setSelectedLocations}
            selectedLocations={selectedLocations}
            setSelectedServices={setSelectedServices}
            selectedServices={selectedServices}
          />
          <main className="w-220 lg:w-260">
            <div className="flex items-center gap-10">
              <p className="text-2xl mb-1">Results ({jobCount})</p>
              {isLoading && (
                <div className="flex items-center justify-center">
                  <SimpleLoader className="h-7" />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4">
              {jobs.map((job, i) => (
                <JobCards key={i} job={job} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProjectCatalog;
