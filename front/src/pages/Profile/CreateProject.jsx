import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "../../utils/contexts/UserContext";
import { useForm } from "react-hook-form";

const CreateProject = ({ refreshJobs }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { handleSubmit } = useForm();
  const { userId } = useUser();

  const [specialization, setSpecialization] = useState([]);
  const [addSpecialization, setAddSpecialization] = useState([]);

  const [translationServices, setTranslationServices] = useState([]);
  const [addTranslationService, setAddTranslatorService] = useState([]);

  const [languages, setLanguages] = useState([]);
  const [addLanguage, setAddLanguage] = useState([]);

  const [locations, setLocations] = useState([]);
  const [addLocations, setAddLocations] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    api
      .get("/specialization/all")
      .then((res) => {
        setSpecialization(res.data.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    api
      .get("/service-types/all")
      .then((res) => {
        setTranslationServices(res.data.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    api
      .get("/language/all")
      .then((res) => {
        setLanguages(res.data.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    api
      .get("/location/all")
      .then((res) => {
        setLocations(res.data.data);
      })
      .catch((err) => {});
  }, []);

  const handleLanguageCheck = (item) => {
    setAddLanguage((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };
  const handleSpecializationCheck = (item) => {
    setAddSpecialization((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };
  const handleServiceCheck = (item) => {
    setAddTranslatorService((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };
  const convertToISOString = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) return "";

    // Keep full ISO string, but manually append microseconds if needed
    const iso = date.toISOString(); // e.g. "2025-12-25T00:00:00.000Z"
    return iso.replace("Z", "") + "000"; // now: "2025-12-25T00:00:00.000000"
  };

  const addJob = async () => {
    setLoading(true);

    let data = {
      title: title,
      description: description,
      startDate: convertToISOString(startDate),
      endDate: convertToISOString(endDate),
      price: price,
      location: addLocations,
      languages: addLanguage.map((name) => ({ name })),
      serviceTypes: addTranslationService.map((name) => ({ name })),
      specializations: addSpecialization.map((name) => ({ name })),
    };

    api
      .post(`jobs/${userId}/add`, data)
      .then((res) => {
        toast.success("Successfully create a project" || res.data);
        refreshJobs();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
        navigate("/employer/post-projects");
      });
  };

  return (
    <>
      <div>
        <h1 className="text-center text-2xl md:text-4xl font-bold mb-5">
          Create & post your project
        </h1>
        <div className="md:w-280 bg-white px-2 py-4 md:px-20 md:py-8 rounded-md shadow-xs">
          <div>
            <form onSubmit={handleSubmit(addJob)}>
              <div className="flex items-center justify-between mb-5">
                <h1 className="text-xl md:text-3xl font-bold">
                  Fill the Information
                </h1>
                <div className="flex items-center gap-2 md:gap-5">
                  <button
                    type="button"
                    onClick={() => navigate("/employer/post-projects")}
                    className="py-1 px-2 md:py-2 md:px-4 border-1 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-1 px-2 md:py-2 md:px-4 text-[#38BF4C] border-1 rounded-lg"
                  >
                    Publish
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-10 items-center mb-5">
                <div>
                  <p className="font-semibold mb-2 after:content-['*'] after:text-[#FF0000]">
                    Title of Project
                  </p>
                  <input
                    type="text"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="eg. Digital Almaty"
                    className="border-1 border-[#DCDCDC] p-3 w-full rounded-lg py-2"
                  />
                </div>
                <div>
                  <p className="font-semibold mb-2 after:content-['*'] after:text-[#FF0000]">
                    Price
                  </p>
                  <input
                    type="number"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    className="border-1 border-[#DCDCDC] p-3 w-full rounded-lg py-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-10 items-top mb-5">
                <div>
                  <p className="font-semibold mb-1 after:content-['*'] after:text-[#FF0000]">
                    Specialization
                  </p>
                  <div className="max-h-20 overflow-y-auto">
                    {specialization.map((spec, i) => (
                      <label key={i} className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          value={spec.name}
                          checked={addSpecialization.includes(spec.name)}
                          onChange={() => handleSpecializationCheck(spec.name)}
                        />
                        <span className="font-light py-1">{spec.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-semibold mb-1 after:content-['*'] after:text-[#FF0000]">
                    Location
                  </p>
                  <div className="">
                    <select
                      className="w-full border-1 border-[#DCDCDC] text-[##8F8F8F] rounded-md p-3 pr-10"
                      defaultValue=""
                      onChange={(e) => setAddLocations(e.target.value)}
                      disabled={loading}
                    >
                      <option value="" disabled hidden>
                        {loading ? "Loading..." : "Type..."}
                      </option>
                      {locations.map((loc, i) => (
                        <option key={i} value={loc.city}>
                          {loc.city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-10 items-center mb-5">
                <div>
                  <p className="font-semibold mb-1 after:content-['*'] after:text-[#FF0000]">
                    Type of Translation Services
                  </p>
                  <div className="max-h-30 overflow-y-auto">
                    {translationServices.map((ser, i) => (
                      <label key={i} className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          value={ser.name}
                          checked={addTranslationService.includes(ser.name)}
                          onChange={() => handleServiceCheck(ser.name)}
                        />
                        <span className="font-light py-1">{ser.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-semibold mb-1 after:content-['*'] after:text-[#FF0000]">
                    Languages
                  </p>
                  <div className="max-h-30 overflow-y-auto mt-1">
                    {languages.map((lang, i) => (
                      <label key={i} className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          value={lang.name}
                          checked={addLanguage.includes(lang.name)}
                          onChange={() => handleLanguageCheck(lang.name)}
                        />
                        <span className="font-light py-1">{lang.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-10 items-center mb-5">
                <div>
                  <p className="font-semibold mb-2 after:content-['*'] after:text-[#FF0000]">
                    Start Date
                  </p>
                  <input
                    type="date"
                    placeholder="DD/MM/YYYY"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    minLength={10}
                    maxLength={10}
                    required
                    className="border-1 border-[#DCDCDC] p-3 w-full rounded-lg py-2"
                  />
                </div>
                <div>
                  <p className="font-semibold mb-2 after:content-['*'] after:text-[#FF0000]">
                    End Date
                  </p>
                  <input
                    type="date"
                    placeholder="DD/MM/YYYY"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    minLength={10}
                    maxLength={10}
                    required
                    className="border-1 border-[#DCDCDC] p-3 w-full rounded-lg py-2"
                  />
                </div>
              </div>
              <div className="mb-5">
                <p className="font-semibold mb-2 after:content-['*'] after:text-[#FF0000]">
                  Description
                </p>
                <textarea
                  name="description"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write detailed information about project/event..."
                  className="resize-none w-full h-30 border-1 border-[#DCDCDC] rounded-lg p-3"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProject;
