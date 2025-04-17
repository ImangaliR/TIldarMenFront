import React from "react";
import fullstar from "../../assets/full_star.png";
import emptystar from "../../assets/empty_star.png";
import employericon from "../../assets/employericon.png";

const ReviewCard = ({ reviews }) => {
  const reviewStars = (rating) => {
    switch (rating) {
      case 1:
        return (
          <div className="flex items-center gap-2">
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
          </div>
        );
      case 2:
        return (
          <div className="flex items-center gap-2">
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
          </div>
        );
      case 3:
        return (
          <div className="flex items-center gap-2">
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
          </div>
        );
      case 4:
        return (
          <div className="flex items-center gap-2">
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
          </div>
        );
      case 5:
        return (
          <div className="flex items-center gap-2">
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
            <img src={fullstar} alt="full star" className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
            <img src={emptystar} alt="empty star" className="w-4 h-4" />
          </div>
        );
    }
  };

  function formatDate(dateString) {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options).replace(",", " -");
  }

  return (
    <>
      {reviews?.map((review, i) => (
        <div
          key={i}
          className="max-w-170 flex gap-3 border-1 border-[#dcdcdc] rounded-lg p-2 m-2"
        >
          <img
            src={review?.profileImageUrl || employericon}
            alt="employer icon"
            className="w-13 h-13 rounded-full object-cover"
          />
          <div className="w-full mb-5">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-lg">
                {review?.firstName} {review?.lastName}
              </h1>
              {reviewStars(review?.rating)}
            </div>
            <p className="text-sm text-[#878787]">
              {formatDate(review?.creationDate)}
            </p>
            <textarea
              defaultValue={review?.comment || ""}
              disabled
              className="text-[#6e6e6e] mt-1 resize-none w-full pr-2"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default ReviewCard;
