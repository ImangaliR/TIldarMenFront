import { useEffect, useState } from "react";
import api from "../../services/api";
import TokenService from "../../services/token.service";
import ReviewCard from "../../components/Review/ReviewCard";
import fullstar from "../../assets/full_star.png";
import emptystar from "../../assets/empty_star.png";
import customerreviews from "../../assets/customer_reviews.png";
import RatingBar from "../../components/Review/RatingBar";

const Reviews = () => {
  const userID = TokenService.getUserId();
  const [reviews, setReviews] = useState([]);
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

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(`/review/${userID}/all`);
        setReviews(response.data?.data);
      } catch (err) {
        console.error("Axios Error:", err);
        console.log(err.response?.data || "Failed to fetch cities.");
      }
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
  const averageRating = (totalRating / totalReviews).toFixed(2);
  const ratingPercentages = [];
  for (let star = 1; star <= 5; star++) {
    ratingPercentages[star] =
      ((ratingCounts[star] / totalReviews) * 100).toFixed(0) + "%";
  }

  return (
    <>
      <main className="flex gap-2 bg-white w-280 h-max min-h-130 rounded-lg p-5">
        <div className="p-5 rounded-lg border-1 border-[#dcdcdc] sticky top-5 h-max">
          <div>
            <div className="flex flex-col items-center w-80">
              <img
                src={customerreviews}
                alt=""
                className="w-25 h-25 shadow-sm rounded-full"
              />
              <h1 className="mt-4 text-lg text-[#5e5e5e]">Customer Reviews</h1>
              <h1 className="text-2xl font-bold mt-1">{averageRating}</h1>
              <p className="text-[#a3a2a2] mb-2">{totalReviews} Reviews</p>
              {reviewStars(Math.floor(averageRating))}
            </div>
            <div className="mt-4">
              {[5, 4, 3, 2, 1].map((star) => (
                <RatingBar
                  key={star}
                  star={star}
                  percent={ratingPercentages[star]}
                  className="flex items-center gap-2"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="ml-5">
          <div className="w-170 border-1 border-[#dcdcdc] border-b-0 rounded-lg rounded-b-none p-1">
            <ReviewCard reviews={reviews} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Reviews;
