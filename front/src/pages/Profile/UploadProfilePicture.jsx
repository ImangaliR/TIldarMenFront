import { useState } from "react";
import { toast } from "react-toastify"; // adjust the path if needed
import { useUser } from "../../utils/contexts/UserContext";
import { uploadService } from "../../services/Upload/UploadService";
import SimpleLoader from "./../../components/Loader/SimpleLoader";
import profileicon from "../../assets/profileicon.png";
import employericon from "../../assets/employericon.png";
import { getProfile } from "../../services/ProfileService/ProfileService";

const UploadProfilePicture = () => {
  const { user, setUser, userRole, userId } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(user?.data?.profileImageUrl || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const cancelUpload = () => {
    setSelectedFile(null);
  };

  const changeProfilePicture = async () => {
    setIsLoading(true);

    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    try {
      const response = await uploadService(selectedFile, userId, userRole);
      const updatedProfile = await getProfile();
      setUser(updatedProfile);
      setPreview(response?.data);
      setSelectedFile(null);
      toast.success("Profile picture updated successfully!");
    } catch (err) {
      toast.error("Error uploading profile picture.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 md:gap-10">
      <div className="mx-4 md:ml-7 mb-4">
        {preview !== null ? (
          <img
            src={preview}
            alt="profile picture"
            className="w-25 h-25 md:w-30 md:h-30 rounded-full object-cover"
          />
        ) : (
          <img
            src={userRole === "TRANSLATOR" ? profileicon : employericon}
            alt="profile picture"
            className="w-25 h-25 md:w-30 md:h-30 rounded-full object-cover"
          />
        )}
      </div>
      <div>
        <div>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Button Area */}
          <div className="flex items-center gap-5 w-full">
            {selectedFile ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={cancelUpload}
                  className="border-2 border-[#8F8F8F] rounded-lg text-[#70B27A] px-4 md:px-5 pt-2 pb-2"
                >
                  Cancel
                </button>
                <button
                  onClick={changeProfilePicture}
                  className="border-2 border-[#8F8F8F] rounded-lg text-[#70B27A] px-4 md:px-5 pt-2 pb-2"
                >
                  Confirm
                </button>
              </div>
            ) : (
              <label
                htmlFor="fileInput"
                className="border-2 border-[#8F8F8F] rounded-lg text-[#70B27A] px-4 md:px-6 pt-2 pb-2 cursor-pointer"
              >
                Upload Profile Picture
              </label>
            )}
            <div>
              {isLoading && <SimpleLoader className="w-6 md:w-8 h-6 md:h-8" />}
            </div>
          </div>
          <p className="text-[#8F8F8F] mt-4">
            This will be displayed on your profile at the website
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadProfilePicture;
