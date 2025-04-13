import { useState } from "react";
import { toast } from "react-toastify"; // adjust the path if needed
import { useUser } from "../../utils/contexts/UserContext";
import { uploadService } from "../../services/Upload/UploadService";
import SimpleLoader from "./../../components/Loader/SimpleLoader";

const UploadProfilePicture = () => {
  const { user, setUser, userRole, userId } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const changeProfilePicture = async () => {
    setIsLoading(true);

    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    try {
      const response = await uploadService(selectedFile, userId, userRole);
      setUser((prev) => ({
        ...prev,
        profileImageUrl: response?.data,
      }));
      toast.success("Profile picture updated successfully!");
      setSelectedFile(null);
      setIsLoading(false);
    } catch (err) {
      toast.error("Something went wrong while updating.");
    }
  };

  return (
    <div>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex items-center gap-5 w-full">
        {selectedFile ? (
          <button
            onClick={changeProfilePicture}
            className="border-2 border-[#8F8F8F] rounded-lg text-[#70B27A] pr-6 pl-6 pt-2 pb-2"
          >
            Change Profile Picture
          </button>
        ) : (
          <label
            htmlFor="fileInput"
            className="border-2 border-[#8F8F8F] rounded-lg text-[#70B27A] pr-6 pl-6 pt-2 pb-2 cursor-pointer"
          >
            Upload Profile Picture
          </label>
        )}
        <div>{isLoading && <SimpleLoader className="w-8 h-8" />}</div>
      </div>
      {/* <button
        onClick={changeProfilePicture}
        className="border-2 border-[#8F8F8F] rounded-lg text-[#70B27A] pr-6 pl-6 pt-2 pb-2 mb-3"
      >
        Change Profile Picture
      </button> */}
      <p className="text-[#8F8F8F] mt-5">
        This will be displayed on your profile at the website
      </p>
    </div>
  );
};

export default UploadProfilePicture;
