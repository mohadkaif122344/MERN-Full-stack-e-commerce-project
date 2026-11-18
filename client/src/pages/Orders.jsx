import { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import axios from 'axios';
import { cartDataContext } from '../context/CartContext';
import { toast } from 'react-toastify';

const Orders = () => {
 const { API, currency } = useContext(cartDataContext);

const [orderData, setOrderData] = useState([]);

const loadOrderData = async () => {
  try {
    const { data } = await axios.post(`${API}/api/order/userorders`,
      {},
      {withCredentials: true,}
    );
    if (data.success) {
      let allOrdersItem = [];
      data.orders.forEach((order) => {
        order.items.forEach((item) => {
          allOrdersItem.push({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
          });
        });
      });
      setOrderData(allOrdersItem.reverse());
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message);
  }
};

useEffect(() => {
  loadOrderData();
}, []);

  return (
    <div className="border-t pt-16 px-4">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {orderData.length === 0 ? (
          <p className="py-8 text-center text-gray-500 dark:text-neutral-500">
            No orders found.
          </p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 dark:text-neutral-400">
              <div className="flex items-start gap-6 text-sm dark:text-neutral-200">
                <img
                  className="w-16 sm:w-20 rounded-md"
                  src={
                    Array.isArray(item.image)
                      ? item.image[0]
                      : item.image
                  }
                  alt=""/>

                <div>
                  <p className="sm:text-base font-medium">
                    {item.name}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-1 text-base text-gray-700 dark:text-neutral-400">
                    <p>
                      {currency}
                      {item.price}
                    </p>

                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>

                  <p className="mt-1">
                    Date:
                    <span className="text-gray-500">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>

                  <p className="mt-1">
                    Payment:
                    <span className="text-gray-500">
                      {item.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>

                  <p className="text-sm md:text-base">
                    {item.status}
                  </p>
                </div>

                <button
                  onClick={loadOrderData}
                  className="border px-4 py-2 text-sm font-medium rounded-md">
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;