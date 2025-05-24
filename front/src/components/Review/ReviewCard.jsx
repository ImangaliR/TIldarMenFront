import reviewstar from "../../assets/reviewstar.png";
import reviewstarfull from "../../assets/reviewstarfull.png";
import employericon from "../../assets/employericon.png";

const ReviewCard = ({ reviews }) => {
  const reviewStars = (rating) => (
    <div className="flex items-center gap-1 md:gap-2">
      {[...Array(5)].map((_, i) => (
        <img
          key={i}
          src={i < rating ? reviewstarfull : reviewstar}
          alt={i < rating ? "full star" : "empty star"}
          className="w-4 h-4"
        />
      ))}
    </div>
  );

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
            className="w-10 h-10 md:w-13 md:h-13 rounded-full object-cover"
          />
          <div className="w-full mb-2 md:mb-5">
            <div className="grid gap-2 md:gap-0 md:flex justify-between items-center">
              <h1 className="font-semibold md:text-lg">
                {review?.firstName} {review?.lastName}
              </h1>
              {reviewStars(review?.rating)}
            </div>
            <p className="mt-2 md:mt-0 text-sm text-[#878787]">
              {formatDate(review?.creationDate)}
            </p>
            {/* <textarea
              defaultValue={review?.comment || ""}
              disabled
              className="text-[#6e6e6e] mt-2 resize-none w-full pr-2 pb-2"
            /> */}
            <p className="text-[#6e6e6e] mt-2 md:mt-1 w-full">
              {review?.comment || ""}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ReviewCard;
