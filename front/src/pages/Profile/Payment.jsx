import { useEffect, useState } from "react";
import api from "../../services/api";
import { useUser } from "../../utils/contexts/UserContext";
import profileicon from "../../assets/profileicon.png";

const Payment = () => {
  const [transactions, setTransactions] = useState([]);
  const { userId } = useUser();

  useEffect(() => {
    api
      .get(`/employer/${userId}/transactions`)
      .then((res) => {
        setTransactions(res.data.data);
      })
      .catch((err) => {});
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function formateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <>
      <main className="bg-white md:w-280 md:h-180 md:py-20 md:px-25 rounded-md shadow-xs">
        <div className="border-1 h-full border-[#DCDCDC] rounded-md p-2 md:p-8">
          <h1 className="font-semibold text-lg md:text-xl mb-2 md:mb-5">
            Transcation History
          </h1>
          {transactions?.length !== 0 ? (
            transactions.map((transaction, i) => (
              <div
                key={i}
                className="flex items-center gap-2 md:gap-0 md:justify-between py-2 text-sm md:text-base"
              >
                <div className="flex items-center gap-3 md:gap-5">
                  <img
                    src={transaction?.profileImageUrl || profileicon}
                    alt="profile image"
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">
                      {transaction.translatorFirstName}{" "}
                      {transaction.translatorLastName}
                    </p>
                    <p className="text-[#70707A] text-sm">
                      {transaction.description}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">
                    {formatDate(transaction.date)}
                  </p>
                  <p className="font-light text-sm text-[#70707A]">
                    {formateTime(transaction.date)}
                  </p>
                </div>
                <p className="font-semibold">{transaction.price}₸</p>
              </div>
            ))
          ) : (
            <div className="min-h-50 flex items-center justify-center md:mt-50">
              <p className="text-[#8b8b8b] text-3xl">No transactions yet</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Payment;
