import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PaymentFail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <>
      <main className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div class="flex items-center justify-center h-40 bg-white">
            <div class="relative w-24 h-24 flex items-center justify-center">
              <div class="absolute w-full h-full rounded-full bg-red-100 animate-ping"></div>
              <div class="absolute w-16 h-16 rounded-full bg-red-200 animate-ping"></div>
              <div class="z-10 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                <svg
                  class="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-red-400 text-4xl">Oops!</h1>
          <p>Payment failed</p>
          <p className="text-gray-400 text-sm mt-5 max-w-80">
            You will be redirected to the home page shortly or click here to
            return to home page
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-green-400 text-white px-6 py-1.5 rounded-xl text-lg mt-5"
          >
            Home
          </button>
        </div>
      </main>
    </>
  );
};

export default PaymentFail;
