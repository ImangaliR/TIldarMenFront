import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import hiddeneye from "../../assets/hiddeneye.png";
import openeye from "../../assets/openeye.png";
import { toast } from "react-toastify";
import useAuth from "../../utils/hooks/useAuth";
import SimpleLoader from "../../components/Loader/SimpleLoader";
import { useUser } from "../../utils/contexts/UserContext";
import TokenService from "../../services/token.service";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const { login, user } = useUser();
  const { loginUser, error } = useAuth();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const userRole = TokenService.getUserRole();

  const handleLogin = async () => {
    setLoading(true);
    let data = {
      username: email,
      password: password,
    };

    try {
      const user = await loginUser(data);
      if (user || userRole) {
        login(user);
      } else {
        toast.warn("Incorrect email or password");
        setTimeout(() => {
          console.log("Redirecting to login page...");
        }, 2000);
        return;
      }
      toast.success("Logged in successfully!");
      navigate("/home");
    } catch (err) {
      toast.warn("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login flex flex-col min-h-screen overflow-hidden">
        <header className="text-3xl md:text-4xl text-center font-extrabold p-8 mt-2 mr-2 ml-2 mb-7 bg-[#71C39C] text-[#E8EAF6] rounded-2xl">
          TildarMen
        </header>
        <main className="flex-grow mt-5">
          {loading && (
            <div className="flex justify-center my-4">
              <SimpleLoader className="h-9 w-9 text-blue-500" />
            </div>
          )}
          <form
            onSubmit={handleSubmit(handleLogin)}
            name="login-form"
            className="flex flex-col items-center bg-white w-100 h-fit md:w-140 rounded-2xl mx-auto shadow-lg outline-1"
          >
            <img src={logo} alt="logo" className="w-17.5 h-17.5 mt-10" />
            <h1 className="text-2xl md:text-3xl font-semibold mt-5">
              WELCOME BACK!
            </h1>
            <p className="text-[#474747] text-sm md:text-lg">
              Please enter your details
            </p>
            <input
              type="email"
              placeholder="Email"
              className="rounded-3xl border-2 border-[#d1d5d8] bg-white
            pl-4 pt-3 pb-3 shadow-xs w-75 md:w-94 mb-3 mt-7"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="rounded-3xl border-2 border-[#d1d5d8] bg-white
            pl-4 pt-3 pb-3 shadow-xs w-75 md:w-94"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <img
                src={showPassword ? openeye : hiddeneye}
                alt={showPassword ? "hidden eye icon" : "open eye icon"}
                className="w-5 h-5 md:w-6 md:h-6 absolute right-4 bottom-4 md:bottom-3.5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="flex justify-end w-73 md:w-88">
              <button className="text-[#8F8F8F] text-sm mt-2 mb-5">
                Forgot password?
              </button>
            </div>
            <button className="w-75 h-12 md:w-94 md:h-14 bg-[#2A9E97] text-white rounded-3xl text-lg md:text-xl font-medium">
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-[#3949AB] font-semibold lg:text-lg mt-13 mb-1"
            >
              Create new account?
            </button>
          </form>
        </main>

        <footer className="text-center text-[#333333] font-medium text-lg md:text-xl cursor-pointer mb-3">
          SUPPORT
        </footer>
      </div>
    </>
  );
}

export default Login;
