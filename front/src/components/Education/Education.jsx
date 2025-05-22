import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../utils/contexts/UserContext";
import SimpleLoader from "../Loader/SimpleLoader";
import { toast } from "react-toastify";
import api from "../../services/api";
import { getProfile } from "../../services/ProfileService/ProfileService";

const Education = () => {
  const [loading, setLoading] = useState(false);
  const { user, userId, setUser } = useUser();
  const { handleSubmit } = useForm();
  const [education, setEducation] = useState(null);
  const [educationPreview, setEducationPreview] = useState(null);
  const [educationDegree, setEducationDegree] = useState("");
  const [educationYear, setEducationYear] = useState("");
  const [educationUni, setEducationUni] = useState("");

  const handleEducationChange = (e) => {
    const file = e.target.files[0];
    setEducation(file);
    setEducationPreview(URL.createObjectURL(file));
  };

  const addEducation = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", education);

    const metadata = JSON.stringify({
      degree: educationDegree,
      graduationYear: educationYear,
      university: educationUni,
    });

    const metadataBlob = new Blob([metadata], { type: "application/json" });
    formData.append("request", metadataBlob);

    try {
      const response = await api.post(
        `translator/${userId}/education`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const updatedProfile = await getProfile();
      setUser(updatedProfile);
      setEducationPreview(null);
      setEducation(null);
      setEducationUni("");
      setEducationDegree("");
      setEducationYear("");
      toast.success("Added education successfully!");
    } catch (err) {
      if (err.message.includes("Network Error")) {
        toast.error("File size is too large.");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteEducation = async (id) => {
    setLoading(true);
    try {
      const response = await api.delete(`translator/${userId}/education/${id}`);
      const updatedProfile = await getProfile();
      setUser(updatedProfile);
      setEducationPreview(null);
      setEducation(null);
      setEducationUni("");
      setEducationDegree("");
      setEducationYear("");
      toast.success("Deleted education successfully!");
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="md:ml-5 mt-2">
        <div className="w-full">
          <h1 className="font-bold">Educational Background</h1>
          <form name="addegree" onSubmit={handleSubmit(addEducation)}>
            <div className="flex items-center gap-2 my-3">
              <h1 className="w-30">Degree:</h1>
              <input
                required
                type="text"
                value={educationDegree}
                onChange={(e) => setEducationDegree(e.target.value)}
                className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-full md:w-60 h-7 rounded-sm text-sm"
              />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <h1 className="w-30">University Name:</h1>
              <input
                required
                type="text"
                value={educationUni}
                onChange={(e) => setEducationUni(e.target.value)}
                className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-full md:w-60 h-7 rounded-sm text-sm"
              />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <h1 className="w-30">Graduation Year:</h1>
              <input
                required
                type="text"
                value={educationYear}
                onChange={(e) => setEducationYear(e.target.value)}
                className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-full md:w-60 h-7 rounded-sm text-sm"
              />
            </div>
            <div className="flex justify-end mt-3">
              <input
                required
                type="file"
                onChange={handleEducationChange}
                accept="application/pdf"
                id="fileInpt"
                className="hidden"
              />

              <div className="flex items-center gap-8">
                {education ? (
                  <div>
                    <iframe
                      src={educationPreview}
                      width={240}
                      height="100%"
                      className="border rounded mt-1"
                      title="PDF Preview"
                    />
                    <div className="flex items-center justify-end gap-3 mt-3">
                      {loading && (
                        <div className="flex h-full items-center justify-center">
                          <SimpleLoader className="h-6 md:h-7" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setEducationPreview(null);
                          setEducation(null);
                        }}
                        className="w-22 h-8 border-1 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-22 h-8 text-[#38BF4C] border-1 rounded-lg"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="fileInpt"
                    className="block border-1 pt-1 w-full px-2 md:px-0 md:w-60 h-8 rounded-md cursor-pointer text-center text-[#38BF4C]"
                  >
                    Add Degree
                  </label>
                )}
              </div>
            </div>
          </form>
          {user?.data?.educations &&
            user?.data?.educations.map((education, i) => (
              <div key={i} className="mt-10">
                <div className="flex items-center gap-2 my-3">
                  <h1 className="w-30">Degree:</h1>
                  <input
                    required
                    type="text"
                    value={education?.degree}
                    onChange={(e) => setEducationDegree(e.target.value)}
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-full md:w-60 h-7 rounded-sm text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <h1 className="w-30">University Name:</h1>
                  <input
                    required
                    type="text"
                    value={education?.university}
                    onChange={(e) => setEducationUni(e.target.value)}
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-full md:w-60 h-7 rounded-sm text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <h1 className="w-30">Graduation Year:</h1>
                  <input
                    required
                    type="text"
                    value={education?.graduationYear}
                    onChange={(e) => setEducationYear(e.target.value)}
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-full md:w-60 h-7 rounded-sm text-sm"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 md:gap-5">
                  <ul>
                    <li>
                      <a
                        href={education?.degreeUrl}
                        target="_blank"
                        className="text-[#38BF4C] border-1 py-1.5 px-4 rounded-lg"
                      >
                        Degree
                      </a>
                    </li>
                  </ul>
                  <div>
                    <button
                      type="button"
                      onClick={() => deleteEducation(education?.id)}
                      className="py-1 px-4 text-[#FF0000] border-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Education;
