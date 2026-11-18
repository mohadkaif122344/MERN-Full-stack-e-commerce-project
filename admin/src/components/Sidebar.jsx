import { NavLink } from "react-router-dom";
import {FiHome,FiPackage,FiPlusCircle,FiShoppingCart} from "react-icons/fi";
import { VscCloseCompact } from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { adminDataContext } from "../context/AdminContext";

const Sidebar = () => {
  const { open, setOpen, logout } = useContext(adminDataContext);

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-neutral-950 p-5 text-white transition-transform duration-300 ease-in-out ${
        open ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}>
      <div className="flex items-center justify-between">
        <h2 className="p-6 text-2xl font-bold text-white">Admin Panel</h2>

        <button onClick={() => setOpen(false)} className="md:hidden">
          <VscCloseCompact size={24} />
        </button>
      </div>

      <nav className="mt-10 flex flex-1 flex-col gap-2">
        <NavLink
          to="/"
          end
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 font-semibold ${
              isActive ? "bg-neutral-700" : "hover:bg-slate-800"
            }`
          }>
          <FiHome size={22} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/products"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 font-semibold ${
              isActive ? "bg-neutral-700" : "hover:bg-slate-800"
            }`
          }>
          <FiPackage size={22} />
          <span>All Product</span>
        </NavLink>

        <NavLink
          to="/add-product"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 font-semibold ${
              isActive ? "bg-neutral-700" : "hover:bg-slate-800"
            }`
          }>
          <FiPlusCircle size={22} />
          <span>Add Product</span>
        </NavLink>

        <NavLink
          to="/orders"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 font-semibold ${
              isActive ? "bg-neutral-700" : "text-slate-300 hover:bg-slate-800"
            }`
          }>
          <FiShoppingCart size={22} />
          <span>Orders</span>
        </NavLink>
        <button
          onClick={logout}
          className="mt-auto flex w-full items-center gap-3 rounded-lg px-4 py-3 font-semibold text-slate-300 hover:bg-red-600 hover:text-white">
          <FiLogOut size={22} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
