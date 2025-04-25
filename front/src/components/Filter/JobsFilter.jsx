import { useEffect, useState } from "react";
import api from "../../services/api";

const JobsFilter = ({ setJobs, setJobCount }) => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const [specialization, setSpecialization] = useState([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);

  /* const [location, setLocation] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]); */

  const [service, setService] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleReset = () => {
    setSelectedLanguages([]);
    /* setSelectedLocations([]); */
    setSelectedServices([]);
    setSelectedSpecializations([]);
  };

  useEffect(() => {
    api
      .get("/language/all")
      .then((res) => {
        setLanguages(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching languages:", err);
      });
  }, []);

  useEffect(() => {
    api
      .get("/specialization/all")
      .then((res) => {
        setSpecialization(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching specializations:", err);
      });
  }, []);

  useEffect(() => {
    api
      .get("/service-types/all")
      .then((res) => {
        setService(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching service types:", err);
      });
  }, []);

  /* useEffect(() => {
    api
      .get("/location/all")
      .then((res) => {
        setLocation(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching locations:", err);
      });
  }, []); */

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
  /* const handleLocationCheck = (item) => {
    setSelectedLocations((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  }; */
  const handleServiceCheck = (item) => {
    setSelectedServices((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const fetchFilteredJobs = () => {
    var postChecks = {
      /* locations: selectedLocations, */
      languages: selectedLanguages,
      serviceTypes: selectedServices,
      specializations: selectedSpecializations,
    };

    api
      .post(`/jobs/filter`, postChecks)
      .then((res) => {
        setJobs(res.data.data);
        setJobCount(res.data.data.length);
      })
      .catch((err) => {
        console.error("Error filtering users:", err);
      });
  };

  useEffect(() => {
    fetchFilteredJobs();
  }, [
    selectedLanguages,
    selectedSpecializations,
    /* selectedLocations, */
    selectedServices,
  ]);

  return (
    <>
      <div className="">
        <section className=" w-65 top-25 bg-white px-3 py-5 rounded-md border-1">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold">Filters</h1>
            <button
              onClick={handleReset}
              className="text-sm text-[#192DF7] cursor-pointer"
            >
              reset
            </button>
          </div>

          <div className="text-lg font-medium">
            <div className="mb-5">
              <h1>Language Filters</h1>
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

            <div className="mb-5">
              <h1>Specialization Filters</h1>
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

            {/* <div className="mb-5">
              <h1>Location Filters</h1>
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
            </div> */}

            <div className="mb-5">
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
      </div>
    </>
  );
};

export default JobsFilter;
