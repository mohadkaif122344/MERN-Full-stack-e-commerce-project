import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const authUserDataContext = createContext();

const AuthContext = ({ children }) => {
  const API = import.meta.env.VITE_BACKEND_URL;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`${API}/api/user/getuser`, {
        withCredentials: true});
      setUserData(data.user);
    } catch (error) {
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = {
    API,
    userData,
    setUserData,
    getCurrentUser,
    loading,
  };

  return (
    <authUserDataContext.Provider value={value}>
      {children}
    </authUserDataContext.Provider>
  );
};

export default AuthContext;
