import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
   <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />

      <div className="h-screen min-w-0 flex-1 overflow-y-auto md:ml-64 ">
        <Navbar/>

        <div className="p-5 md:p-8 ">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default Layout;
