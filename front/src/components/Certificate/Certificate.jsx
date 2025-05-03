import { useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { getProfile } from "../../services/ProfileService/ProfileService";
import { useUser } from "../../utils/contexts/UserContext";
import { useForm } from "react-hook-form";
import SimpleLoader from "../Loader/SimpleLoader";

const Certificate = () => {
  const [loading, setLoading] = useState(false);
  const { user, userId, setUser } = useUser();
  const { handleSubmit } = useForm();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [certificate, setCertificate] = useState(
    user?.data?.certificates?.[0]?.certificateUrl || null
  );
  const [certificateYear, setCertificateYear] = useState(
    user?.data?.certificates?.[0]?.year || ""
  );
  const [certificateTitle, setCertificateTitle] = useState(
    user?.data?.certificates?.[0]?.title || ""
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCertificate(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const addCertificate = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", certificate);

    const metadata = JSON.stringify({
      title: certificateTitle,
      year: certificateYear,
    });

    const metadataBlob = new Blob([metadata], { type: "application/json" });
    formData.append("request", metadataBlob);

    try {
      const response = await api.post(
        `translator/${userId}/certificate`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const updatedProfile = await getProfile();
      setUser(updatedProfile);
      toast.success("Added certificate successfully!");
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCertificate = async () => {
    setLoading(true);
    try {
      const response = await api.delete(
        `translator/${userId}/certificate/${user?.data?.certificates?.[0].id}`
      );
      const updatedProfile = await getProfile();
      setUser(updatedProfile);
      setPreviewUrl(null);
      setCertificateTitle("");
      setCertificateYear("");
      setCertificate(null);
      toast.success("Deleted certificate successfully!");
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form name="certificate" onSubmit={handleSubmit(addCertificate)}>
        <h1 className="font-bold">Certifications & Accreditations</h1>
        <div>
          <div className="flex items-center gap-2 my-3">
            <h1 className="w-35">Certificate Title:</h1>
            <input
              type="text"
              required
              value={certificateTitle}
              onChange={(e) => setCertificateTitle(e.target.value)}
              className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-60 h-7 rounded-sm text-sm"
            />
          </div>
          <div className="flex items-center gap-2 my-3">
            <h1 className="w-35">Year of Certification:</h1>
            <input
              type="number"
              required
              value={certificateYear}
              onChange={(e) => setCertificateYear(e.target.value)}
              className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-60 h-7 rounded-sm text-sm"
            />
          </div>
          <div>
            <div className="flex gap-2 my-3">
              <h1 className="w-35">Upload Certification:</h1>
              <input
                type="file"
                onChange={handleFileChange}
                accept="application/pdf"
                id="fileIn"
                className="hidden"
                required
              />
              {certificate ? (
                <iframe
                  src={certificate || previewUrl}
                  width={240}
                  height="100%"
                  className="border rounded mt-1"
                  title="PDF Preview"
                />
              ) : (
                <label
                  htmlFor="fileIn"
                  className="bg-[#EAF4F4] border-1 border-[#DCDCDC] p-3 w-60 h-30 rounded-sm cursor-pointer text-center pt-11 text-[#8F8F8F]"
                >
                  Upload
                </label>
              )}
            </div>
            {user?.data?.certificates?.[0] ? (
              <div className="flex justify-end mt-5 gap-5">
                {loading && (
                  <div className="flex h-full items-center justify-center">
                    <SimpleLoader className="h-7" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={deleteCertificate}
                  className="w-25 h-8 text-[#FF0000] border-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-end mt-5 gap-5">
                {loading && (
                  <div className="flex h-full items-center justify-center">
                    <SimpleLoader className="h-7" />
                  </div>
                )}
                <button
                  type="submit"
                  className="w-25 h-8 text-[#38BF4C] border-1 rounded-lg"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default Certificate;
