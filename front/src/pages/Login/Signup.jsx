import { use, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import hiddeneye from "../../assets/hiddeneye.png";
import openeye from "../../assets/openeye.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createAccount } from "./../../services/auth/authService";
import { useForm } from "react-hook-form";
import SimpleLoader from "../../components/Loader/SimpleLoader";
import api from "../../services/api";

function Signup() {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("employer");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationCode, setverificationCode] = useState("");
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    const createUser = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      confirmPassword: confirmPassword,
      role: role,
      code: verificationCode,
    };

    if (verificationCode === "") {
      toast.warn("Verify your email first");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      toast.warn("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      await createAccount(createUser);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      if (err.includes("User with this Email already exists")) {
        toast.error("User with such email or phone number already exists");
      } else {
        toast.error("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!email) {
      toast.warn("Please enter an email first");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);

    try {
      await api.post(`/users/send-val`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setVerificationCodeSent(true);
      toast.success("Verification code sent");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="signup flex flex-col min-h-screen overflow-hidden">
        <header className="text-3xl md:text-4xl text-center font-extrabold p-8 m-2 bg-[#71C39C] text-[#E8EAF6] rounded-2xl">
          <button onClick={() => navigate("/home")}>TildarMen</button>
        </header>
        <main className="flex flex-col md:flex-grow items-center scale-95">
          {loading && (
            <div className="flex justify-center my-4">
              <SimpleLoader className="h-9 w-9 text-blue-500" />
            </div>
          )}
          <form
            onSubmit={handleSubmit(handleSignup)}
            name="signup-form"
            className="bg-white h-fit w-full md:w-235 px-5 md:px-15 rounded-2xl shadow-sm"
          >
            <button type="button" onClick={() => navigate("/home")}>
              <img src={logo} alt="logo" className="w-15 h-15 mt-8 mb-2" />
            </button>
            <h1 className="text-3xl md:text-5xl">Sign up</h1>
            <p className="text-[#8B9AA6] text-sm md:text-lg mt-1">
              Enter your details below to create your account and get started
            </p>
            <div className="md:flex justify-between text-[#374753] mt-3">
              <div>
                <p className="after:content-['*'] after:text-[#FF0000]">
                  First Name
                </p>
                <input
                  type="text"
                  placeholder="Nick"
                  value={firstname}
                  required
                  onChange={(e) => setFirstname(e.target.value)}
                  className="rounded-lg border-2 border-[#d1d5d8] bg-white
            pl-4 pt-2 pb-2 shadow-xs w-full md:w-100 mt-1"
                />
              </div>
              <div className="mt-2 md:mt-0">
                <p className="after:content-['*'] after:text-[#FF0000]">
                  Last Name
                </p>
                <input
                  type="text"
                  placeholder="Smith"
                  value={lastname}
                  required
                  onChange={(e) => setLastname(e.target.value)}
                  className="rounded-lg border-2 border-[#d1d5d8] bg-white
            pl-4 pt-2 pb-2 shadow-xs w-full md:w-100 mt-1"
                />
              </div>
            </div>
            <div className="md:flex justify-between text-[#374753] mt-3">
              <div>
                <p className="after:content-['*'] after:text-[#FF0000]">
                  Email
                </p>
                <div className="flex items-end gap-2">
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-lg border-2 border-[#d1d5d8] bg-white
            pl-4 pt-2 pb-2 shadow-xs w-full md:w-73 mt-1"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    className="px-3 py-2 text-[#38BF4C] text-nowrap border-2 rounded-lg shadow-xs"
                  >
                    Send code
                  </button>
                </div>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="after:content-['*'] after:text-[#FF0000]">
                  Phone Number
                </p>
                <input
                  type="tel"
                  placeholder="83457680932"
                  maxLength={11}
                  minLength={11}
                  value={phoneNumber}
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="rounded-lg border-2 border-[#d1d5d8] bg-white
            pl-4 pt-2 pb-2 shadow-xs w-full md:w-100 mt-1"
                />
              </div>
            </div>
            <div className="md:flex justify-between text-[#374753] mt-3">
              <div>
                <p className="after:content-['*'] after:text-[#FF0000]">
                  Password
                </p>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="qwerty0912"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                    minLength={8}
                    className="rounded-lg border-2 border-[#d1d5d8] bg-white
            pl-4 pt-2 pb-2 shadow-xs w-full md:w-100 mt-1"
                  />
                  <img
                    src={showPassword ? openeye : hiddeneye}
                    alt={showPassword ? "hidden eye icon" : "open eye icon"}
                    className="w-5 h-5 lg:w-6 lg:h-6 absolute right-4 bottom-3 lg:bottom-2.5 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="after:content-['*'] after:text-[#FF0000]">
                  Confirm Password
                </p>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="qwerty0912"
                    required
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setPasswordMatch(password === e.target.value);
                    }}
                    value={confirmPassword}
                    minLength={8}
                    className={`rounded-lg border-2 border-[#d1d5d8] bg-white
            pl-4 pt-2 pb-2 shadow-xs w-full md:w-100 mt-1 ${
              !passwordMatch ? "border-red-400" : "border-gray-300"
            }`}
                  />
                  <img
                    src={showConfirmPassword ? openeye : hiddeneye}
                    alt={
                      showConfirmPassword ? "hidden eye icon" : "open eye icon"
                    }
                    className="w-5 h-5 lg:w-6 lg:h-6 absolute right-4 bottom-3 lg:bottom-2.5 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>
              </div>
            </div>
            {verificationCodeSent && (
              <div className="mt-3">
                <p className="after:content-['*'] after:text-[#FF0000]">
                  Verification Code
                </p>
                <input
                  type="text"
                  placeholder="Enter the code sent to your email"
                  maxLength={6}
                  minLength={6}
                  required
                  value={verificationCode}
                  onChange={(e) => setverificationCode(e.target.value)}
                  className="rounded-lg border-2 border-[#d1d5d8] bg-white
            pl-4 pt-2 pb-2 shadow-xs w-full md:w-100 mt-1"
                />
              </div>
            )}
            <div className="flex justify-center gap-8 font-medium mt-8">
              <p className="text-[#374753] scale-105 mt-2">You are.....</p>
              <label
                className={`w-30 md:w-55 h-20 md:h-15 outline-1 rounded-lg text-center cursor-pointer
                ${role === "employer" ? "text-[#71C39C]" : "text-black "}`}
              >
                <input
                  className="scale-150 mx-3 mt-3"
                  type="radio"
                  name="employment"
                  value="employer"
                  checked={role === "employer"}
                  onChange={() => setRole("employer")}
                ></input>
                <span className="block md:hidden">Customer</span>
                <span className="hidden md:block">
                  Customer, hiring for a project
                </span>
              </label>
              <label
                className={`w-30 md:w-55 h-20 md:h-15 outline-1 rounded-lg text-center cursor-pointer
                ${role === "translator" ? "text-[#71C39C]" : "text-black "}`}
              >
                <input
                  className="scale-150 mx-3 mt-3"
                  type="radio"
                  name="employment"
                  checked={role === "translator"}
                  value="translator"
                  onChange={() => setRole("translator")}
                ></input>
                <span className="block md:hidden">Translator</span>
                <span className="hidden md:block">
                  Translator, looking for work
                </span>
              </label>
            </div>
            <div className="flex justify-between w-full gap-5 md:gap-0 mt-8 font-medium">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-55 lg:w-100 pt-2 pb-2 rounded-lg outline-1 outline-[#838383]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-55 lg:w-100 pt-2 pb-2 rounded-lg text-white bg-[#2A9E97]"
              >
                Confirm
              </button>
            </div>
            <div className="flex justify-center gap-1 w-full mt-8 text-[#838383] font-medium md:text-lg mb-2">
              <p>Already have an account ?</p>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-[#3949AB]"
              >
                Login
              </button>
            </div>
          </form>
        </main>

        <footer className="text-center text-[#333333] font-medium md:text-xl cursor-pointer mb-3">
          SUPPORT
        </footer>
      </div>
    </>
  );
}

export default Signup;
