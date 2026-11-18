import { useContext } from 'react';
import { authUserDataContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute = () => {
     const { userData, loading } = useContext(authUserDataContext);

     if (loading) {
        return <p>Loading...</p>
     }
    return userData ? <Outlet /> : <Navigate to='/login' replace />
}

export default ProtectRoute;
