import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import hiddeneye from "../../assets/hiddeneye.png";
import openeye from "../../assets/openeye.png";
import { toast } from "react-toastify";
import useAuth from "../../utils/hooks/useAuth";
import SimpleLoader from "../../components/Loader/SimpleLoader";
import { useUser } from "../../utils/contexts/UserContext";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { login, user, userRole } = useUser();
  const { loginUser, error } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    let data = { username: email, password };

    try {
      const user = await loginUser(data);
      if (user || userRole) {
        login(user);
        toast.success("Logged in successfully!");
        navigate("/home");
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login flex flex-col min-h-screen overflow-hidden">
        <header className="text-3xl md:text-4xl text-center font-extrabold p-8 mt-2 mx-2 mb-7 bg-[#71C39C] text-[#E8EAF6] rounded-2xl">
          <button onClick={() => navigate("/home")}>TildarMen</button>
        </header>
        <main className="flex-grow px-2 mt-5">
          {loading && (
            <div className="flex justify-center my-4">
              <SimpleLoader className="w-6 md:w-9 text-blue-500" />
            </div>
          )}
          <div className="flex flex-col items-center mx-auto bg-white h-fit md:w-140 rounded-2xl shadow-lg outline-1">
            <button onClick={() => navigate("/")}>
              <img src={logo} alt="logo" className="w-17.5 h-17.5 mt-10" />
            </button>
            <h1 className="text-2xl md:text-3xl font-semibold mt-5">
              WELCOME BACK!
            </h1>
            <p className="text-[#474747] text-sm md:text-lg">
              Please enter your details
            </p>
            {error && (
              <p className="text-red-500 text-sm md:text-base">
                {error?.message?.includes("Bad credentials")
                  ? "Please check your password and username and try again"
                  : error?.message?.includes("UserDetailsService returned null")
                  ? "User with this username does not exist"
                  : "Something went wrong"}
              </p>
            )}
            <form
              onSubmit={handleSubmit(handleLogin)}
              name="login-form"
              className="w-full px-5 flex flex-col items-center"
            >
              <input
                type="email"
                placeholder="Email"
                className="rounded-3xl border-2 border-[#d1d5d8] bg-white pl-4 pt-3 pb-3 shadow-xs w-full md:w-94 mb-3 mt-5 md:mt-7"
                {...register("email", { required: true })}
              />
              <div className="w-full md:w-fit relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="rounded-3xl border-2 border-[#d1d5d8] bg-white pl-4 pt-3 pb-3 shadow-xs w-full md:w-94"
                  {...register("password", { required: true })}
                />
                <img
                  src={showPassword ? openeye : hiddeneye}
                  alt={showPassword ? "hidden eye icon" : "open eye icon"}
                  className="w-5 h-5 md:w-6 md:h-6 absolute right-4 bottom-4 md:bottom-3.5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              <div className="flex justify-end w-full pr-2 md:w-88">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-[#8F8F8F] text-sm mt-2 mb-5"
                >
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                className="w-full h-12 md:w-94 md:h-14 bg-[#2A9E97] text-white rounded-3xl text-lg md:text-xl font-medium"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <button
              onClick={() => navigate("/signup")}
              className="text-[#3949AB] font-semibold md:text-lg mt-5 md:mt-9 mb-2"
            >
              Create new account?
            </button>
          </div>
        </main>

        <footer className="text-center text-[#333333] font-medium text-lg md:text-xl cursor-pointer mb-3">
          SUPPORT
        </footer>
      </div>
    </>
  );
}

export default Login;
