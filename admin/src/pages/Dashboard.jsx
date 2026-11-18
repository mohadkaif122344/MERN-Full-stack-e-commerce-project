import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { adminDataContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import { FiPackage, FiShoppingCart } from "react-icons/fi";

function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  const { API } = useContext(adminDataContext);

  const getProductCounts = async () => {
    try {
      const products = await axios.get(`${API}/api/product/list`);
      setTotalProducts(
        Array.isArray(products.data) ? products.data.length : products.data.products?.length || 0);
      const orders = await axios.post(`${API}/api/order/list`,
        {},
        { withCredentials: true }
      );
      setTotalOrders(
        Array.isArray(orders.data) ? orders.data.length : orders.data.orders?.length || 0);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductCounts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-neutral-700" />
      </div>
    );
  }

 return (
  <div className="min-h-full w-full min-w-0 p-4 text-gray-800 sm:p-6">
    <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="flex min-h-36 items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-7">
        <div>
          <p className="text-base font-medium text-gray-500">Total Products</p>
          <h2 className="mt-3 text-4xl font-bold">{totalProducts}</h2>
        </div>
        <div className="rounded-xl bg-neutral-100 p-4 text-neutral-600">
          <FiPackage size={32} />
        </div>
      </div>

      <div className="flex min-h-36 items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-7">
        <div>
          <p className="text-base font-medium text-gray-500">Total Orders</p>
          <h2 className="mt-3 text-4xl font-bold">{totalOrders}</h2>
        </div>
        <div className="rounded-xl bg-neutral-100 p-4 text-neutral-600">
          <FiShoppingCart size={32} />
        </div>
      </div>
    </div>
  </div>
);
}

export default Dashboard;
