import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useUser } from "../../utils/contexts/UserContext";
import stripe from "../../assets/stripe.png";

const Wallet = () => {
  const [walletDashboard, setWalletDashboard] = useState(null);
  const { userId } = useUser();

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
    try {
      const res = await api.post(`stripe/account/${userId}`);
      window.location.href = res.data.data.onboardingUrl;
    } catch (err) {
      toast.error("Failed to create account");
    }
  };

  /* const handleCreateAccount = () => {
    toast.warn(
      <div className="ml-2">
        <p className="text-center">Create account</p>
        <div className="flex items-center justify-center gap-2 mt-1">
          <button
            className="px-3 py-1 rounded-md"
            onClick={() => {
              createAccount();
              toast.dismiss();
            }}
          >
            <p className="bg-green-400 text-white text-sm border-1 px-3 py-1 rounded-md">
              Confirm
            </p>
          </button>
          <button
            className="bg-gray-400 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss()}
          >
            <p className="text-sm">Cancel</p>
          </button>
        </div>
      </div>,
      {
        position: "bottom-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
      }
    );
  }; */

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
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Wallet;
