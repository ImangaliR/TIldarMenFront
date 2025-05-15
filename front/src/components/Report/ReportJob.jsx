import { useState } from "react";
import { useForm } from "react-hook-form";
import deletesign from "../../assets/delete_sign.png";
import api from "../../services/api";
import { toast } from "react-toastify";

const ReportJob = ({ id, handleLeaveReport }) => {
  const { handleSubmit } = useForm();
  const [reportDetails, setReportDetails] = useState("");
  const [reportTitle, setReportTitle] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [reportFile, setReportFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const maxChars = 500;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setReportFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const leaveReport = async () => {
    handleLeaveReport();

    const formData = new FormData();
    formData.append("file", reportFile);

    const metadata = JSON.stringify({
      type: "Project",
      reason:
        reportReason == "harassment"
          ? "HARASSMENT"
          : reportReason == "scam"
          ? "SCAM"
          : reportReason == "fake event"
          ? "FAKE_EVENT"
          : reportReason == "low-quality work"
          ? "LOW_QUALITY_WORK"
          : reportReason == "payment issues"
          ? "PAYMENT_ISSUES"
          : "" || null,
      title: reportTitle,
      details: reportDetails,
    });

    const metadataBlob = new Blob([metadata], { type: "application/json" });
    formData.append("reportDto", metadataBlob);

    try {
      const res = await api.post(`/report/job/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Successfully send report!");
    } catch (err) {
      if (
        err.response?.data?.data?.includes(
          "You are not allowed to report your job"
        )
      ) {
        toast.error("You are not allowed to report your job");
      } else {
        toast.error("Failed to leave report");
      }
    }
  };

  return (
    <>
      <div className="report fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white w-[800px] rounded-xl max-w-full min-h-[700px] max-h-full p-6 shadow-lg relative">
          <div className="flex justify-end">
            <button onClick={handleLeaveReport}>
              <img src={deletesign} alt="x sign" className="w-6 h-6" />
            </button>
          </div>
          <p className="block mb-3 ml-1">
            <span className="font-bold">Report Type: </span>Project
          </p>
          <form onSubmit={handleSubmit(leaveReport)} className="space-y-4">
            <div>
              <label className="block ml-1 mb-1">Reason For Report</label>
              <select
                value={reportReason || ""}
                onChange={(e) => setReportReason(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-3 hover:border-gray-400"
              >
                <option disabled value="">
                  Select reason
                </option>
                <option value="scam">Scam</option>
                <option value="harassment">Harassment</option>
                <option value="fake event">Fake Event</option>
                <option value="low-quality work">Low-Quality Work</option>
                <option value="payment issues">Payment Issues</option>
              </select>
            </div>
            <div>
              <label className="block ml-1 mb-1">Report Title</label>
              <input
                type="text"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                required
                placeholder="Enter a title"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
            <div>
              <label className="block ml-1 mb-1">Details</label>
              <div className="relative">
                <textarea
                  rows="5"
                  required
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="Enter your message or inquiry"
                  maxLength={maxChars}
                  className="w-full border border-gray-300 rounded-lg p-3 resize-none"
                />
                <p className="absolute right-1 bottom-2 text-sm text-right text-gray-400">
                  {reportDetails.length}/{maxChars}
                </p>
              </div>
            </div>
            <div>
              <label className="block ml-1 mb-1">Attach File (Optional)</label>
              <input
                type="file"
                onChange={handleFileChange}
                accept="application/pdf"
                id="fi"
                className="hidden"
              />
              {reportFile ? (
                <iframe
                  src={previewUrl}
                  width={750}
                  height={150}
                  className="border rounded mt-1"
                  title="PDF Preview"
                />
              ) : (
                <label
                  htmlFor="fi"
                  className="block border-1 border-[#DCDCDC] p-3 h-35 rounded-lg cursor-pointer text-center pt-15"
                >
                  Upload Photo
                </label>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-red-600 text-white py-2 px-8 rounded-lg hover:bg-red-700 transition"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReportJob;
