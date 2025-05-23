import { useEffect, useState } from "react";
import api from "../../services/api";
import TokenService from "../../services/token.service";
import ReviewCard from "../../components/Review/ReviewCard";
import reviewstar from "../../assets/reviewstar.png";
import reviewstarfull from "../../assets/reviewstarfull.png";
import customerreviews from "../../assets/customer_reviews.png";
import RatingBar from "../../components/Review/RatingBar";
import { useUser } from "../../utils/contexts/UserContext";

const Reviews = () => {
  const userID = TokenService.getUserId();
  const [reviews, setReviews] = useState([]);
  const { user } = useUser();
  const reviewStars = (rating) => {
    switch (rating) {
      case 1:
        return (
          <div className="flex items-center gap-2">
            <img src={reviewstarfull} alt="full star" className="w-4 h-4" />
            <img src={reviewstar} alt="empty star" className="w-4 h-4" />
            <img src={reviewstar} alt="empty star" className="w-4 h-4" />
            <img src={reviewstar} alt="empty star" className="w-4 h-4" />
            <img src={reviewstar} alt="empty star" className="w-4 h-4" />
          </div>
        );
      case 2:
        return (
          <div className="flex items-center gap-2">
            <img src={reviewstarfull} alt="full star" className="w-4 h-4" />
            <img src={reviewstarfull} alt="full star" className="w-4 h-4" />
            <img src={reviewstar} alt="empty star" className="w-4 h-4" />
            <img src={reviewstar} alt="empty star" className="w-4 h-4" />
            <img src={reviewstar} alt="empty star" className="w-4 h-4" />
          </div>
        );
      case 3:
        return (
          <div className="flex items-center gap-2">
            <img src={reviewstarfull} alt="full star" className="w-4 h-4" />
            <img src={reviewstarfull} alt="full star" className="w-4 h-4" />
            <img src={reviewstarfull} alt="full star" className="w-4 h-4" />
            <img src={reviewstar} alt="empty star" className="w-4 h-4" />
            <img src={reviewstar} alt="empty star" className="w-4 h-4" />
          </div>
        );
      case 4:
        return (
          <div className="flex items-center gap-2">
            <img src={reviewstarfull} alt="full star" className="w-4 h-4" />
            <img src={reviewstarfull} alt="full star" className="w-4 h-4" />
            <img src={reviewstarfull} alt="full star" className="w-4 h-4" />
            <img src={reviewstarfull} alt="full star" className="w-4 h-4" />
            <img src={reviewstar} alt="empty star" className="w-4 h-4" />
          </div>
        );
      case 5:
        return (
          <div className="flex items-center gap-2">
            <img src={reviewstarfull} alt="full star" className="w-4 h-4" />
            <img src={reviewstarfull} alt="full star" className="w-4 h-4" />
            <img src={reviewstarfull} alt="full star" className="w-4 h-4" />
            <img src={reviewstarfull} alt="full star" className="w-4 h-4" />
            <img src={reviewstarfull} alt="full star" className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <img src={reviewstar} alt="empty star" className="w-4 h-4" />
            <img src={reviewstar} alt="empty star" className="w-4 h-4" />
            <img src={reviewstar} alt="empty star" className="w-4 h-4" />
            <img src={reviewstar} alt="empty star" className="w-4 h-4" />
            <img src={reviewstar} alt="empty star" className="w-4 h-4" />
          </div>
        );
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(`/review/${userID}/all`);
        setReviews(response.data?.data);
      } catch (err) {}
    };

    fetchReviews();
  }, []);

  const totalReviews = reviews?.length;
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let totalRating = 0;
  reviews.forEach(({ rating }) => {
    ratingCounts[rating]++;
    totalRating += rating;
  });
  const ratingPercentages = [];
  const count = [];
  for (let star = 1; star <= 5; star++) {
    count[star] = ratingCounts[star].toFixed(0);
    ratingPercentages[star] =
      ((ratingCounts[star] / totalReviews) * 100).toFixed(0) + "%";
  }

  return (
    <>
      <main className="bg-white w-full md:w-280 md:h-max md:min-h-130 rounded-lg p-5">
        <div className="grid md:flex gap-2">
          <div className="p-5 rounded-lg border-1 border-[#dcdcdc] md:sticky top-5 h-max">
            <div>
              <div className="flex flex-col items-center md:w-80">
                <img
                  src={customerreviews}
                  alt=""
                  className="w-22 md:w-25 h-22 md:h-25 shadow-sm rounded-full"
                />
                <h1 className="mt-4 text-lg text-[#5e5e5e]">
                  Customer Reviews
                </h1>
                <h1 className="text-2xl font-bold mt-1">
                  {user?.data?.rating.toFixed(2)}
                </h1>
                <p className="text-[#a3a2a2] mb-2">
                  {user?.data?.reviews} Reviews
                </p>
                {reviewStars(Math.floor(user?.data?.rating))}
              </div>
              <div className="mt-4">
                {[5, 4, 3, 2, 1].map((star) => (
                  <RatingBar
                    key={star}
                    star={star}
                    percent={ratingPercentages[star]}
                    count={count[star]}
                    className="flex items-center gap-2"
                  />
                ))}
              </div>
            </div>
          </div>
          {reviews?.length !== 0 ? (
            <div className="md:ml-5">
              <div className="md:w-170 border-1 border-[#dcdcdc] md:border-b-0 rounded-lg md:rounded-b-none p-1">
                <ReviewCard reviews={reviews} />
              </div>
            </div>
          ) : (
            <div className="min-h-40 flex flex-1 justify-center items-center">
              <p className="text-[#8b8b8b] text-xl md:text-3xl">
                No reviews yet
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Reviews;
