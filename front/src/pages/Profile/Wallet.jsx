import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useUser } from "../../utils/contexts/UserContext";
import stripe from "../../assets/stripe.png";
import SimpleLoader from "./../../components/Loader/SimpleLoader";

const Wallet = () => {
  const [walletDashboard, setWalletDashboard] = useState(null);
  const { userId } = useUser();
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAccountDashboard = async () => {
      try {
        const res = await api.get(`stripe/account/${userId}`);
        setWalletDashboard(res.data.data);
      } catch (err) {}
    };

    getAccountDashboard();
  }, [userId]);

  const createAccount = async () => {
    setIsLoading(true);
    try {
      const res = await api.post(`stripe/account/${userId}`);
      window.location.href = res.data.data.onboardingUrl;
    } catch (err) {
      toast.error("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="bg-white w-full shadow-sm rounded-sm">
        <div className="flex items-center justify-center py-10">
          {walletDashboard ? (
            <div className="flex items-center gap-5 ">
              <p>Go to your stripe wallet</p>
              <button onClick={() => (window.location.href = walletDashboard)}>
                <img
                  src={stripe}
                  alt="stripe logo"
                  className="w-25 rounded-md"
                />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <p>You don't have account yet</p>
              <button
                onClick={createAccount}
                className="border-1 px-3 py-2 rounded-md"
              >
                Create Account
              </button>
              {isloading && (
                <div className="flex h-full items-center justify-center">
                  <SimpleLoader className="h-6 md:h-7" />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Wallet;
