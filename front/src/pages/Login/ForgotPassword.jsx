import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "./../../services/api";
import { toast } from "react-toastify";
import hiddeneye from "../../assets/hiddeneye.png";
import openeye from "../../assets/openeye.png";
import SimpleLoader from "../../components/Loader/SimpleLoader";

function ForgotPassword() {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [codeIsSent, setCodeIsSent] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendCode = async () => {
    setLoading(true);
    if (!email) {
      setLoading(false);
      toast.warn("Please enter an email first");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);

    try {
      await api.post(`/users/send-code`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCodeIsSent(true);
      toast.success("Code is sent to your email");
    } catch (err) {
      toast.error("Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!email) {
      toast.warn("Please enter an email first");
      return;
    }

    let data = {
      email: email,
      code: code,
    };

    try {
      await api.post(`/users/verify-code`, data);
    } catch (err) {
      if (err.response?.data?.data?.includes("Invalid verification code")) {
        toast.error("Invalid verification code");
      } else {
        toast.error("Something went wrong");
      }
      throw err;
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);

    if (!email) {
      setLoading(false);
      toast.warn("Please enter an email first");
      return;
    }
    if (password !== confirmPassword) {
      setLoading(false);
      setPasswordMatch(false);
      toast.warn("Passwords don't match");
      return;
    }

    try {
      await verifyCode();
    } catch (err) {
      setLoading(false);
      return;
    }

    let data = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      await api.post(`/users/reset-password`, data);
      setCodeIsSent(true);
      toast.success("Password reset successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login flex flex-col min-h-screen overflow-hidden">
        <header className="text-3xl md:text-4xl text-center font-extrabold p-8 mt-2 mr-2 ml-2 mb-7 bg-[#71C39C] text-[#E8EAF6] rounded-2xl">
          <button onClick={() => navigate("/home")}>TildarMen</button>
        </header>
        <main className="flex flex-grow justify-center items-center">
          <div className="bg-white p-10 rounded-2xl forgot-password flex flex-col mb-20">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-[#574F4A]">
              We will send you a code to reset your password
            </p>
            <form onSubmit={handleSubmit(handleResetPassword)} className="mt-5">
              <div className="flex items-center">
                <p className="mb-2">Email</p>
                {loading && (
                  <div className="flex justify-center w-full mr-15">
                    <SimpleLoader className="h-6 w-6 text-blue-500 mb-1" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white py-3 px-4 w-full rounded-lg border-2 border-[#d1d5d8] shadow-xs"
                  placeholder="Enter your email"
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  className="bg-[#34C759] py-3 px-4 rounded-lg"
                >
                  Send
                </button>
              </div>
              {codeIsSent && (
                <div className="grid gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Reset code"
                    required
                    onChange={(e) => {
                      setCode(e.target.value);
                    }}
                    value={code}
                    maxLength={6}
                    minLength={6}
                    className="rounded-lg border-2 border-[#d1d5d8] bg-white
            pl-4 pt-2 pb-2 shadow-xs mt-1"
                  />
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="New password"
                      required
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      value={password}
                      minLength={8}
                      className="rounded-lg border-2 w-full border-[#d1d5d8] bg-white
            pl-4 pt-2 pb-2 shadow-xs mt-1"
                    />
                    <img
                      src={showPassword ? openeye : hiddeneye}
                      alt={showPassword ? "hidden eye icon" : "open eye icon"}
                      className="w-5 h-5 lg:w-6 lg:h-6 absolute right-4 bottom-3 lg:bottom-2.5 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      required
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordMatch(password === e.target.value);
                      }}
                      value={confirmPassword}
                      minLength={8}
                      className={`rounded-lg border-2 w-full border-[#d1d5d8] bg-white
            pl-4 pt-2 pb-2 shadow-xs mt-1 ${
              !passwordMatch ? "border-red-400" : "border-gray-300"
            }`}
                    />
                    <img
                      src={showConfirmPassword ? openeye : hiddeneye}
                      alt={
                        showConfirmPassword
                          ? "hidden eye icon"
                          : "open eye icon"
                      }
                      className="w-5 h-5 lg:w-6 lg:h-6 absolute right-4 bottom-3 lg:bottom-2.5 cursor-pointer"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#34C759] py-3 px-4 rounded-lg"
                  >
                    Reset Password
                  </button>
                </div>
              )}
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default ForgotPassword;
