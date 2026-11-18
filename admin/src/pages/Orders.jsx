import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SiEbox } from "react-icons/si";
import { adminDataContext } from "../context/AdminContext";
import { toast } from "react-toastify";

const Orders = () => {
  const { API } = useContext(adminDataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const { data } = await axios.post(`${API}/api/order/list`,
        {},
        { withCredentials: true },
      );
      setOrders(
        [...(Array.isArray(data) ? data : data.orders)].reverse(),
      );
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const { data } = await axios.post(`${API}/api/order/status`,
        { orderId, status: e.target.value },
        { withCredentials: true });
      toast.success(data.message);
      await fetchAllOrders();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-neutral-600" />
      </div>
    );
  }
  return (
 <div className="min-h-full p-4 text-gray-800">
  <h1 className="mb-5 text-2xl font-bold">All Orders List</h1>
  <div className="hidden lg:grid grid-cols-4 gap-4 border bg-neutral-100 p-4 text-sm rounded-md font-bold">
    <p>No.</p>
    <p>Order Details</p>
    <p>Payment Details</p>
    <p>Order Status</p>
  </div>

  <div className="flex flex-col gap-4">
    {orders.map((order, index) => (
      <div
        key={order._id}
        className="grid grid-cols-1 items-center gap-4 rounded-lg border bg-white p-4 lg:grid-cols-4">
        <p className="font-semibold text-neutral-600 flex">
          {index + 1}.
        <SiEbox className="h-14 w-14 rounded bg-cyan-50 p-2 text-neutral-600" />
        </p>


        <div className="min-w-0 text-sm text-gray-700">
          {order.items.map((item, i) => (
            <p key={i}>
              {item.name?.toUpperCase()} × {item.quantity}
              {item.size && ` (${item.size})`}
              {i !== order.items.length - 1 && ","}
            </p>
          ))}

          <div className="mt-2 text-gray-600">
            <p>
              {order.address?.firstName} {order.address?.lastName}
            </p>
            <p>{order.address?.street}</p>
            <p>
              {order.address?.city}, {order.address?.state},{" "}
              {order.address?.country}, {order.address?.pinCode}
            </p>
            <p>{order.address?.phone}</p>
          </div>
        </div>

        <div className="space-y-1 text-sm text-gray-600">
          <p>Items: {order.items?.length || 0}</p>
          <p>Method: {order.paymentMethod}</p>
          <p>Payment: {order.payment ? "Done" : "Pending"}</p>
          <p>Date: {new Date(order.date).toLocaleDateString()}</p>
          <p className="text-xl font-bold text-cyan-700">
            ₹{order.amount}
          </p>
        </div>

        <select
          value={order.status}
          onChange={(e) => statusHandler(e, order._id)}
          className="w-full rounded border bg-white p-2">
          <option value="Order Placed">Order Placed</option>
          <option value="Packing">Packing</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
    ))}

    {orders.length === 0 && (
      <p className="py-10 text-center text-gray-500">
        No orders found.
      </p>
    )}
  </div>
</div>
  );
};

export default Orders;
