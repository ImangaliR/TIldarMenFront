import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Search from "./../../components/Search/Search";
import JobCards from "./JobCards";
import api from "../../services/api";
import { toast } from "react-toastify";
import JobsFilter from "../../components/Filter/JobsFilter";

const ProjectCatalog = () => {
  const [jobCount, setJobCount] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    fetchJobs(userSearch);
  }, [
    selectedLanguages,
    selectedSpecializations,
    selectedLocations,
    selectedServices,
  ]);

  const fetchJobs = async (searchQuery = "") => {
    var postChecks = {
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
      setJobs(response?.data?.data);
      setJobCount(response?.data?.data.length);
    } catch (err) {
      toast.error("Failed to fetch jobs.");
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
        />
        <div className="flex gap-5 my-10">
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
            <p className="text-2xl mb-1">Results ({jobCount})</p>
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
