import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { adminDataContext } from "../context/AdminContext";

const ProtectedRoute = () => {
  const { adminData, loading } = useContext(adminDataContext);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-cyan-600 rounded-full animate-spin" />
      </div>
    );
  }


  return adminData ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;