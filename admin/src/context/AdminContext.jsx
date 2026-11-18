import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const adminDataContext = createContext();

const AdminContext = ({ children }) => {

  const API = import.meta.env.VITE_BACKEND_URL;

  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);


  const getAdmin = async () => {
  try {
    const { data } = await axios.get(`${API}/api/user/admin`, {
      withCredentials: true});
    if (data.success && data.role === "admin") {
      setAdminData(data);
    } else {
      setAdminData(null);
    }
  } catch (error) {
    setAdminData(null);
  } finally {
    setLoading(false);
  }
};


const logout = async () => {
  try {
    const { data } = await axios.post(`${API}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    setAdminData(null);
    toast.success(data.message);
    navigate("/login");
    toast.success(data.message)
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};

 useEffect(() => {
  getAdmin();
}, []);

  const value = {
    API,
    adminData,
    setAdminData,
    getAdmin,
    loading,
    open,setOpen,
    logout
  };

  return (
    <adminDataContext.Provider value={value}>
      {children}
    </adminDataContext.Provider>
  );
};

export default AdminContext;

