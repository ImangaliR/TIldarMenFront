import React from "react";

const UploadVideo = () => {
  return (
    <div className="w-50">
      <input
        id="fileInput"
        type="file"
        accept="video/*"
        className="block text-sm bg-[#EAF4F4] border-1 border-[#DCDCDC] w-full h-30 rounded-sm text-center cursor-pointer"
      />
    </div>
  );
};

export default UploadVideo;
