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
  const [certificate, setCertificate] = useState(null);
  const [certificateYear, setCertificateYear] = useState("");
  const [certificateTitle, setCertificateTitle] = useState("");

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
      setPreviewUrl(null);
      setCertificateTitle("");
      setCertificateYear("");
      setCertificate(null);
      toast.success("Added certificate successfully!");
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCertificate = async (id) => {
    setLoading(true);
    try {
      const response = await api.delete(
        `translator/${userId}/certificate/${id}`
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
      <div>
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
                  <div>
                    <iframe
                      src={certificate || previewUrl}
                      width={240}
                      height={150}
                      className="border rounded mt-1"
                      title="PDF Preview"
                    />
                    <div className="flex items-center justify-end gap-3 mt-5">
                      {loading && (
                        <div className="flex h-full items-center justify-center">
                          <SimpleLoader className="h-7" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl(null);
                          setCertificate(null);
                        }}
                        className="w-22 h-8 border-1 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-22 h-8 text-[#38BF4C] border-1 rounded-lg"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="fileIn"
                    className="bg-[#EAF4F4] border-1 border-[#DCDCDC] p-3 w-60 h-30 rounded-sm cursor-pointer text-center pt-11 text-[#8F8F8F]"
                  >
                    Upload
                  </label>
                )}
              </div>
            </div>
          </div>
        </form>
        <div className="mt-10">
          {user?.data?.certificates &&
            user?.data?.certificates.map((certificate) => (
              <div>
                <div>
                  <div className="flex items-center gap-2 my-3">
                    <h1 className="w-35">Certificate Title:</h1>
                    <input
                      type="text"
                      required
                      value={certificate?.title}
                      className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-60 h-7 rounded-sm text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2 my-3">
                    <h1 className="w-35">Year of Certification:</h1>
                    <input
                      type="number"
                      required
                      value={certificate?.year}
                      className="bg-[#EAF4F4] border-1 border-[#DCDCDC] pl-3 w-60 h-7 rounded-sm text-sm"
                    />
                  </div>
                  <div>
                    <div className="flex gap-2 my-3">
                      <h1 className="w-35">Upload Certification:</h1>
                      <ul>
                        <li className="ml-1">
                          <a
                            href={certificate?.certificateUrl}
                            target="_blank"
                            className="text-teal-600 no-underline"
                          >
                            file
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-3 gap-5">
                  <button
                    type="button"
                    onClick={() => deleteCertificate(certificate?.id)}
                    className="w-25 h-8 text-[#FF0000] border-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Certificate;
