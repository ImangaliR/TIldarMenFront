import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../utils/contexts/UserContext";
import SimpleLoader from "../Loader/SimpleLoader";
import { toast } from "react-toastify";
import api from "../../services/api";

const Education = () => {
  const [loading, setLoading] = useState(false);
  const { user, userId, setUser } = useUser();
  const { handleSubmit } = useForm();
  const [education, setEducation] = useState(
    user?.data?.educations?.[0]?.degreeUrl || null
  );
  const [educationPreview, setEducationPreview] = useState(null);
  const [educationDegree, setEducationDegree] = useState(
    user?.data?.educations?.[0]?.degree || ""
  );
  const [educationYear, setEducationYear] = useState(
    user?.data?.educations?.[0]?.graduationYear || ""
  );
  const [educationUni, setEducationUni] = useState(
    user?.data?.educations?.[0]?.university || ""
  );

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
      toast.success("Added education successfully!");
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const deleteEducation = async () => {
    setLoading(true);
    try {
      const response = await api.delete(
        `translator/${userId}/education/${user?.data?.educations?.[0].id}`
      );
      const updatedProfile = await getProfile();
      setUser(updatedProfile);
      setEducationPreview(null);
      setEducation(null);
      toast.success("Deleted education successfully!");
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex ml-5 gap-25 mt-2">
        <div>
          <h1 className="font-bold">Educational Background</h1>
          <form name="addegree" onSubmit={handleSubmit(addEducation)}>
            <div className="flex items-center gap-2 my-3">
              <h1 className="w-30">Degree:</h1>
              <input
                required
                type="text"
                value={educationDegree}
                onChange={(e) => setEducationDegree(e.target.value)}
                className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-60 h-7 rounded-sm text-sm"
              />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <h1 className="w-30">University Name:</h1>
              <input
                required
                type="text"
                value={educationUni}
                onChange={(e) => setEducationUni(e.target.value)}
                className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-60 h-7 rounded-sm text-sm"
              />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <h1 className="w-30">Graduation Year:</h1>
              <input
                required
                type="text"
                value={educationYear}
                onChange={(e) => setEducationYear(e.target.value)}
                className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-60 h-7 rounded-sm text-sm"
              />
            </div>
            <div className="flex justify-end">
              {education && (
                <iframe
                  src={education || educationPreview}
                  width={240}
                  height="100%"
                  className="border rounded"
                  title="PDF Preview"
                />
              )}
            </div>
            <div className="w-full flex justify-end mt-3">
              <input
                required
                type="file"
                onChange={handleEducationChange}
                accept="application/pdf"
                id="fileInpt"
                className="hidden"
              />
              <div className="flex items-center gap-8">
                {loading && (
                  <div className="flex h-full items-center justify-center">
                    <SimpleLoader className="h-7" />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  {user?.data?.educations?.[0] ? (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={deleteEducation}
                        className="w-25 h-8 text-[#FF0000] border-1 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-3">
                      <label
                        htmlFor="fileInpt"
                        className="block border-1 pt-2 px-10 h-10 rounded-md cursor-pointer text-center text-[#38BF4C]"
                      >
                        Add Degree
                      </label>
                      <button
                        type="submit"
                        className="py-2 px-4 text-[#38BF4C] border-1 rounded-md"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Education;
