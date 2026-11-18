import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { adminDataContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { API,getAdmin } = useContext(adminDataContext);


 const onSubmitHandler = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const { data } = await axios.post(`${API}/api/auth/admin`,
    {email, password},{ withCredentials: true });
    await getAdmin();
    toast.success(data.message);
    navigate("/");
    } catch (error) {
    toast.error(error.response?.data?.message);
    } finally {
    setLoading(false);
   }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">
          Admin Panel
        </h1>

        <p className="mb-7 text-center text-sm text-gray-500">
          Login to manage your store
        </p>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-neutral-600 focus:ring-2 focus:ring-neutral-100"/>
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-neutral-600 focus:ring-2 focus:ring-neutral-100"/>
             <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
          </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-neutral-600 px-4 py-3 font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
