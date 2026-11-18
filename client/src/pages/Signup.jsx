import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authUserDataContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { API, getCurrentUser } = useContext(authUserDataContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/api/auth/register`,
        { name, email, password },
        { withCredentials: true });
      await getCurrentUser();
      navigate("/login");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-white px-4 py-8 pt-20 dark:bg-neutral-950">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 dark:bg-neutral-950 dark:border">
        <div className="flex flex-col items-center gap-2 mb-8">
          <span className="text-3xl font-bold text-gray-900 dark:text-neutral-300">Signup Page</span>
          <span className="text-sm text-gray-500 text-center">
            Welcome to MyStore, place your order
          </span>
        </div>
        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-neutral-300">
              Username
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-neutral-600 focus:ring-2 focus:ring-neutral-200 dark:text-neutral-600"/>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-neutral-300">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-neutral-600 focus:ring-2 focus:ring-neutral-200 dark:text-neutral-600"/>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-neutral-300">
              Password
            </label>
             <div className="relative">
             <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-neutral-600 focus:ring-2 focus:ring-neutral-300 dark:text-neutral-600"/>
            <span onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-neutral-600 text-white font-semibold rounded-lg hover:bg-neutral-800 transition">
            {loading ? "Please wait..." : "Signup"}
          </button>

          <div className="text-sm text-center text-gray-600 flex px-2 justify-center gap-1 dark:text-neutral-300">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold hover:underline cursor-pointer">
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
