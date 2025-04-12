import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Search from "./../../components/Search/Search";
import JobCards from "./JobCards";
import api from "../../services/api";
import { toast } from "react-toastify";

const ProjectCatalog = () => {
  const [jobCount, setJobCount] = useState(0);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs/search?title=");
        setJobs(response?.data?.data);
        setJobCount(response?.data?.data.length);
      } catch (err) {
        toast.error("Failed to fetch jobs.");
      }
    };

    fetchJobs();
  }, []);
  return (
    <>
      <Navbar />
      <div className="grid justify-center">
        <Search />
        <div className="my-10">
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
