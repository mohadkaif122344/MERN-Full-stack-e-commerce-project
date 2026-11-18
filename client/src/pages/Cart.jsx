import { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Title from "../components/Title";
import { cartDataContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const navigate = useNavigate();
  const { products, currency, cartItem, updateQuantity } =
    useContext(cartDataContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        const quantity = cartItem[productId][size];
        if (quantity > 0) {
          tempData.push({ _id: productId, size, quantity });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className="border-t pt-20 sm:pt-32 px-6 sm:px-8 lg:px-10">
      <div className="text-xl sm:text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div>
        {cartData.map((item) => {
          const productData = products.find(
            (product) => product._id === item._id,
          );

          if (!productData) return null;

          return (
            <div
              key={`${item._id}-${item.size}`}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
              <div className="col-span-3 sm:col-span-1 flex items-start gap-3 sm:gap-6 min-w-0">
                <img
                  src={productData.image?.[0]}
                  alt={productData.name}
                  className="w-16 sm:w-20 shrink-0 rounded-md"/>

                <div className="min-w-0 dark:text-neutral-300">
                  <p className="text-sm sm:text-lg font-medium break-words ">
                    {productData.name}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-2">
                    <p>
                      {currency} {productData.price}
                    </p>

                    <p className="px-2 sm:px-3 py-1 border  rounded-md">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-start-2 sm:col-start-2 flex items-center justify-center gap-2 sm:gap-4 dark:text-neutral-400">
                <button
                  onClick={() =>
                    updateQuantity(item._id, item.size, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  className="border px-3 py-1 rounded-md hover:shadow-md disabled:opacity-40">
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item._id, item.size, item.quantity + 1)
                  }
                  className="border px-3 py-1 rounded-md hover:shadow-md">
                  +
                </button>
              </div>
              <FaTrash
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="col-start-3 row-start-2 sm:row-start-1 justify-self-end w-4 sm:w-5 cursor-pointer text-gray-500 hover:text-red-500"/>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center sm:justify-end my-12 sm:my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-neutral-600 hover:bg-neutral-800 duration-300 text-white text-xs sm:text-sm my-8 px-5 sm:px-8 py-3 rounded-md">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
