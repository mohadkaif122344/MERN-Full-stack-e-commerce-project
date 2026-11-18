import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layout/Layout";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import AllProducts from "./pages/AllProducts";
import EditProduct from "./pages/EditProduct";
import Orders from "./pages/Orders";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
     <ToastContainer />
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AllProducts />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>
      </Routes>
      </div>
  );
}

export default App;