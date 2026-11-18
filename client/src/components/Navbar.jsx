import { useContext, useState } from "react";
import logo from "../assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import {FaHome,FaMoon,FaSun,FaSignInAlt,FaSignOutAlt,FaBoxOpen,FaInfoCircle} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import {MdCollections,MdOutlineShoppingCart,MdContacts} from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaCircleUser } from "react-icons/fa6";
import { authUserDataContext } from "../context/AuthContext";
import { cartDataContext } from "../context/CartContext";
import { toast } from "react-toastify";
import axios from "axios";
import { themeDataContext } from "../context/ThemeContext";

const Navbar = () => {
  const { API, userData, setUserData } = useContext(authUserDataContext);

  const { showSearch, setShowSearch, search, setSearch, getCartCount } =
    useContext(cartDataContext);
  const { dark, toggleTheme } = useContext(themeDataContext);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(`${API}/api/auth/logout`,
        {},
        { withCredentials: true });
      setUserData(null);
      setShowProfile(false);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <>
      <div className="bg-neutral-600 px-4 py-2 text-center text-xs tracking-wide text-white sm:text-sm">
        FREE SHIPPING ON ORDERS ABOVE ₹999
        <span className="mx-2">/</span>
        <Link to="/collection" className="underline underline-offset-4">
          Shop NOW
        </Link>
      </div>
      <div className="sticky top-0 z-50 flex h-[70px] w-full items-center justify-between gap-5 px-6 shadow-md bg-white dark:bg-neutral-950 border-b">
        <div
          onClick={() => navigate("/")}
          className="flex cursor-pointer items-center justify-start duration-300 hover:scale-95">
          <img src={logo} alt="" className="w-12 h-12 rounded-full" />
          <p className="text-xl font-bold">
            Style<span className="text-neutral-500">Hub</span>
          </p>
        </div>

        <div className="absolute left-1/2 hidden -translate-x-1/2 md:flex ">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 text-lg text-black hover:underline dark:text-white">
              <FaHome className="text-neutral-600" />
              Home
            </Link>

            <Link
              to="/collection"
              className="flex items-center gap-2 px-3 py-2 text-lg text-black hover:underline dark:text-white">
              <MdCollections className="text-neutral-600" />
              Collections
            </Link>

            <Link
              to="/about"
              className="flex items-center gap-2 px-3 py-2 text-lg text-black hover:underline dark:text-white">
              <FaInfoCircle className="text-neutral-600" />
              About
            </Link>

            <Link
              to="/contact"
              className="flex items-center gap-2 px-3 py-2 text-lg text-black hover:underline dark:text-white">
              <MdContacts className="text-neutral-600" />
              Contact
            </Link>
          </div>
        </div>

        <div className="flex w-[30%] items-center justify-end gap-5 md:gap-10 md:px-10">
          <div className="flex items-center">
            <IoSearch
              className="h-6 w-6 cursor-pointer duration-300 hover:scale-110 hover:text-neutral-600"
              onClick={() => setShowSearch(true)}/>

            {showSearch && (
              <div className="absolute left-0 top-full flex h-[80px] w-full items-center justify-center bg-white/90 px-4 shadow-md md:px-16 dark:bg-neutral-950 dark:text-white">
                <input
                  type="text"
                  placeholder="Search products"
                  className="h-[60%] w-[80%] rounded-full bg-neutral-600 px-8 text-white outline-none lg:w-[40%]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}/>
                <RxCross2
                  className="ml-3 h-7 w-7 cursor-pointer rounded-full border bg-red-500 text-white duration-300 hover:scale-110 hover:bg-red-600"
                  onClick={() => setShowSearch(false)}/>
              </div>
            )}
          </div>

          <button
            onClick={toggleTheme}
            className="rounded-full border-2 border-neutral-400 p-0.5 hover:bg-neutral-600 hover:text-white">
            {dark ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>

          {userData ? (
            <div
              onClick={() => setShowProfile((prev) => !prev)}
              className="flex items-center gap-1 cursor-pointer">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-neutral-600 bg-neutral-500 text-xl font-semibold text-white sm:h-10 sm:w-10">
                {userData.name?.charAt(0).toUpperCase()}
              </div>
              <IoIosArrowDown
                size={18}
                className={` transition-transform ${
                  showProfile ? "rotate-180" : ""}`}/>
            </div>
          ) : (
            <div
              onClick={() => setShowProfile((prev) => !prev)}
              className="flex items-center gap-1 cursor-pointer">
              <FaCircleUser className="h-9 w-9 sm:h-10 sm:w-10" />

              <IoIosArrowDown
                size={18}
                className={`transition-transform ${
                  showProfile ? "rotate-180" : ""
                }`}
              />
            </div>
          )}
          {showProfile && (
            <div className="absolute right-[9%] top-full z-50 w-[220px] rounded-xl border-2 border-neutral-600 bg-white px-0 pt-12 dark:bg-neutral-950 ">
              <div className="absolute right-1 top-1 ">
                <RxCross2
                  className="h-7 w-7 cursor-pointer rounded-full border bg-red-500 text-white duration-300 hover:scale-110 hover:bg-red-600"
                  onClick={() => setShowProfile(false)}
                />
              </div>

              <div
                onClick={() => {
                  if (userData) {
                    handleLogout();
                  } else {
                    setShowProfile(false);
                    navigate("/login");
                  }
                }}
                className="flex cursor-pointer items-center gap-3 rounded-lg border-b-2 px-3 py-2 hover:border-neutral-600 hover:bg-neutral-300"
              >
                {userData ? (
                  <FaSignOutAlt className="text-red-500" />
                ) : (
                  <FaSignInAlt className="text-neutral-600" />
                )}
                <span
                  className={
                    userData ? "text-red-500" : "hover:text-neutral-700"
                  }
                >
                  {userData ? "Logout" : "Login"}
                </span>
              </div>

              <div
                onClick={() => {
                  navigate("/orders");
                  setShowProfile(false);
                }}
                className="flex cursor-pointer items-center gap-3 rounded-lg border-b-2 px-3 py-2 hover:text-neutral-700 hover:bg-neutral-300"
              >
                <FaBoxOpen className="text-neutral-600" />
                My Orders
              </div>
              <div
                onClick={() => {
                  navigate("/about");
                  setShowProfile(false);
                }}
                className="flex cursor-pointer items-center gap-3 rounded-lg border-b-2 px-3 py-2 hover:text-neutral-700 hover:bg-neutral-300"
              >
                <FaInfoCircle className="text-neutral-600" />
                About
              </div>
            </div>
          )}

          <MdOutlineShoppingCart
            className="hidden h-6 w-6 shrink-0 cursor-pointer duration-300 hover:scale-110 md:block"
            onClick={() => navigate("/cart")}
          />

          <p className="absolute top-3 hidden h-4 w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] text-white md:block">
            {getCartCount()}
          </p>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-50 flex h-[70px] w-full items-center justify-around border-t-2 border-neutral-800 bg-neutral-100 px-5 md:hidden dark:bg-neutral-950">
          <button
            onClick={() => navigate("/")}
            className="flex flex-col items-center justify-center gap-1 text-black dark:text-white"
          >
            <FaHome className="h-6 w-6 text-neutral-600 duration-300 hover:scale-95 dark:text-neutral-500" />
            Home
          </button>

          <button
            onClick={() => navigate("/collection")}
            className="flex flex-col items-center justify-center gap-1 text-black dark:text-white"
          >
            <MdCollections className="h-6 w-6 text-neutral-600 duration-300 hover:scale-95 dark:text-neutral-500" />
            Collections
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="flex flex-col items-center justify-center gap-1 text-black dark:text-white"
          >
            <MdContacts className="h-6 w-6 text-neutral-600 duration-300 hover:scale-95 dark:text-neutral-500" />
            Contact
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="relative flex flex-col items-center justify-center gap-1 text-black dark:text-white"
          >
            <MdOutlineShoppingCart className="h-6 w-6 text-neutral-600 duration-300 hover:scale-95 dark:text-neutral-500" />
            <span className="absolute -right-0.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] text-white">
              {getCartCount()}
            </span>
            Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
