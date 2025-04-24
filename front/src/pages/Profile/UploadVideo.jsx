import React, { useEffect, useState } from "react";
import { useUser } from "../../utils/contexts/UserContext";
import api from "../../services/api";
import { toast } from "react-toastify";
import SimpleLoader from "../../components/Loader/SimpleLoader";
import { getProfile } from "./../../services/ProfileService/ProfileService";

const UploadVideo = () => {
  const { user, userId, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(user?.data?.videoUrl || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const cancelUpload = () => {
    setSelectedFile(null);
  };

  const addVideo = async () => {
    setIsLoading(true);

    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await api.post(`translator/${userId}/video`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.message.inlucdes("Success")) {
        const updatedProfile = await getProfile();
        setUser(updatedProfile);
        setPreview(response?.data);
        toast.success("Added video successfully!");
        setSelectedFile(null);
      } else {
        toast.error("Video size can't exceed 50mb.");
      }
    } catch (err) {
      toast.error("Failed to add video.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteVideo = async () => {
    setIsLoading(true);

    try {
      const response = await api.delete(`translator/${userId}/video`);
      const updatedProfile = await getProfile();
      setUser(updatedProfile);
      setPreview(null);
      toast.success("Deleted video successfully!");
    } catch (err) {
      toast.error("Failed to delete video.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full">
      <input
        id="fileInput"
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div>
        <p className="font-bold mb-1">Video Greeting</p>
        <div className="flex items-center gap-10">
          <div>
            {preview ? (
              <div>
                <video controls className="w-full h-30 rounded-sm">
                  <source src={preview} type="video/mp4" />
                </video>
                <div className="flex gap-4">
                  <button
                    onClick={deleteVideo}
                    className="border-1 rounded-lg text-[#FF0000] px-5 py-1 mt-10"
                  >
                    Delete
                  </button>
                  <div>
                    {isLoading && <SimpleLoader className="w-8 h-8 mt-10" />}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="fileInput"
                  className="block bg-[#EAF4F4] border-1 border-[#DCDCDC] px-18 py-12 rounded-sm text-center cursor-pointer text-gray-500"
                >
                  Upload
                </label>
                <div className="flex gap-4">
                  {selectedFile && (
                    <div className="flex items-center gap-2 mt-10">
                      <button
                        onClick={cancelUpload}
                        className="border-1 rounded-lg text-[#38BF4C] px-5 py-1"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={addVideo}
                        className="border-1 rounded-lg text-[#38BF4C] px-5 py-1"
                      >
                        Confirm
                      </button>
                    </div>
                  )}
                  <div>
                    {isLoading && <SimpleLoader className="w-8 h-8 mt-10" />}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
