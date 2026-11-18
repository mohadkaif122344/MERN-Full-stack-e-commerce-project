import { useContext } from "react";
import { adminDataContext } from "../context/AdminContext";
import logo from "../assets/logo2.png";
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  const { adminData, setOpen } = useContext(adminDataContext);

  return (
    <nav className="flex h-20 items-center justify-between border-b bg-white px-5 shadow-md md:px-8">
      <div className="flex items-center gap-3">
        <button onClick={() => setOpen(true)} className="md:hidden">
          <IoMdMenu size={24} />
        </button>
        <img src={logo} alt="MyStore" className="w-10 object-contain md:w-12" />
        <h1 className="text-xl font-bold sm:text-2xl">
          Style<span className="text-neutral-600">Hub</span>
        </h1>
      </div>

      {adminData?.email && (
        <div className="group relative">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-600 text-lg font-bold text-white transition hover:bg-neutral-800">
            {adminData.email.charAt(0).toUpperCase()}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
