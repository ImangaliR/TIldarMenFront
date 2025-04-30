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
      .catch((err) => {
        console.error("Error fetching locations:", err);
      });
  }, []);

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
      <main className="bg-white w-280 h-180 py-20 px-20 rounded-md shadow-xs">
        <div className="border-1 h-full border-[#DCDCDC] rounded-xl p-6">
          <h1 className="font-semibold text-xl mb-5">Transcation History</h1>
          {transactions?.length !== 0 ? (
            transactions.map((transaction, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-4">
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
                    <p className="text-[#70707A]">{transaction.description}</p>
                  </div>
                </div>
                <p className="font-semibold">{formatDate(transaction.date)}</p>
                <p className="font-semibold">{transaction.price}₸</p>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center mt-50">
              <p className="text-[#8b8b8b] text-3xl">No transactions yet</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Payment;
