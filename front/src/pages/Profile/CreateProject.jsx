import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";
import upload from "../../assets/upload.png";
import { toast } from "react-toastify";
import { useUser } from "../../utils/contexts/UserContext";
import { useForm } from "react-hook-form";

const CreateProject = () => {
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
  const [addLocations, setAddLocations] = useState([]);

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
      .catch((err) => {
        console.error("Error fetching Specialization:", err);
      });
  }, []);

  useEffect(() => {
    api
      .get("/service-types/all")
      .then((res) => {
        setTranslationServices(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching Translation Services:", err);
      });
  }, []);

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
      .get("/location/all")
      .then((res) => {
        setLocations(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching locations:", err);
      });
  }, []);

  const formatDate = (input) => {
    const raw = input.replace(/\D/g, "").slice(0, 8);
    let formatted = "";

    if (raw.length > 0) formatted += raw.substring(0, 2);
    if (raw.length > 2) formatted += "/" + raw.substring(2, 4);
    if (raw.length > 4) formatted += "/" + raw.substring(4, 8);

    return formatted;
  };

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
  const handleLocationCheck = (item) => {
    setAddLocations((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };
  const handleServiceCheck = (item) => {
    setAddTranslatorService((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };
  const convertToISOString = (dateStr) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    const date = new Date(year, month - 1, day); // Month is 0-indexed
    return date.toISOString(); // Outputs: "2025-04-05T00:00:00.000Z"
  };

  const addJob = async () => {
    setLoading(true);

    let data = {
      title: title,
      description: description,
      startDate: convertToISOString(startDate),
      endDate: convertToISOString(endDate),
      price: price,
      locations: addLocations.map((city) => ({ city })),
      languages: addLanguage.map((name) => ({ name })),
      serviceTypes: addTranslationService.map((name) => ({ name })),
      specialization: addSpecialization.map((name) => ({ name })),
    };

    api
      .post(`jobs/${userId}/add`, data)
      .then((res) => {
        toast.success("Successfully create a project" || res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.error("Error filtering users:", err);
      })
      .finally(setLoading(false));
  };

  return (
    <>
      <h1 className="text-center text-4xl font-bold mb-5">
        Create & post your project
      </h1>
      <button
        onClick={() => navigate("/employer/post-projects")}
        className="text-[#317BFF] my-2"
      >
        back
      </button>
      <div className="w-280 bg-white px-20 py-8 rounded-md shadow-xs">
        <div>
          <form onSubmit={handleSubmit(addJob)}>
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-3xl font-bold">Fill the Information</h1>

              <button
                type="sumbit"
                className="py-1 px-3 bg-[#38BF4C] text-white border-1 rounded-lg"
              >
                Publish
              </button>
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
                <p className="font-semibold mb-2">Post Type</p>
                <input
                  type="text"
                  className="border-1 border-[#DCDCDC] p-3 w-full rounded-lg py-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10 items-center mb-5">
              <div>
                <p className="font-semibold mb-1 after:content-['*'] after:text-[#FF0000]">
                  Specialization
                </p>
                <div className="max-h-30 overflow-y-auto">
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
                <div className="max-h-30 overflow-y-auto">
                  {locations.map((loc, i) => (
                    <label key={i} className="flex items-center space-x-2 ">
                      <input
                        type="checkbox"
                        value={loc.city}
                        checked={addLocations.includes(loc.city)}
                        onChange={() => handleLocationCheck(loc.city)}
                      />
                      <span className="font-light py-1">{loc.city}</span>
                    </label>
                  ))}
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
            {/* <div className="grid grid-cols-2 gap-10 items-center mb-5">
              <div>
                <p className="font-semibold mb-2 after:content-['*'] after:text-[#FF0000]">
                  Skill Level
                </p>
                <input
                  type="text"
                  className="border-1 border-[#DCDCDC] p-3 w-full rounded-lg py-2"
                />
              </div>

              <div>
                <p className="font-semibold mb-2 after:content-['*'] after:text-[#FF0000]">
                  Target Language
                </p>
                <input
                  type="text"
                  className="border-1 border-[#DCDCDC] p-3 w-full rounded-lg py-2"
                />
              </div>
            </div> */}
            <div className="grid grid-cols-2 gap-10 items-center mb-5">
              <div>
                <p className="font-semibold mb-2 after:content-['*'] after:text-[#FF0000]">
                  Start Date
                </p>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={formatDate(startDate)}
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
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={formatDate(endDate)}
                  onChange={(e) => setEndDate(e.target.value)}
                  minLength={10}
                  maxLength={10}
                  required
                  className="border-1 border-[#DCDCDC] p-3 w-full rounded-lg py-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10 items-center mb-5">
              <div>
                <p className="font-semibold mb-2">Format</p>
                <input
                  type="text"
                  className="border-1 border-[#DCDCDC] p-3 w-full rounded-lg py-2"
                />
              </div>
              <div>
                <p className="font-semibold mb-2 after:content-['*'] after:text-[#FF0000]">
                  Payment
                </p>
                <input
                  type="text"
                  required
                  onChange={(e) => setPrice(e.target.value)}
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
            <div className="mb-5">
              <p className="mb-2 font-semibold">Attach file (optional)</p>
              <input type="file" id="fileInput" className="hidden" />
              <label
                htmlFor="fileInput"
                className="flex items-center justify-center w-full h-30 border-1 border-[#DCDCDC] rounded-lg p-3 cursor-pointer"
              >
                <img src={upload} alt="upload icon" className="h-8" />
              </label>
            </div>
            <div className="mb-15">
              <p className="font-semibold mb-2">Contact Information</p>
              <input
                type="text"
                className="border-1 max-w-60 h-10 border-[#DCDCDC] rounded-lg px-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 w-fit">
              <button className="text-[#38BF4C] border-1 rounded-lg py-2 px-4">
                Preview
              </button>
              <button className="text-[#38BF4C] border-1 rounded-lg py-2 px-4">
                Save as Draft
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProject;
