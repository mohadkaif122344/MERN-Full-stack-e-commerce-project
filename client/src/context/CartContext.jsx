import { createContext, useContext, useEffect, useState } from "react";
import { authUserDataContext } from "./AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const cartDataContext = createContext();

const CartContext = ({ children }) => {
  const navigate = useNavigate()
  const { API, userData } = useContext(authUserDataContext);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [loading, setLoading] = useState(false);

  const currency = "₹";
  const delivery_fee = 40;

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/api/product/list`);
      setProducts(data.products);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    if (!userData) {
    navigate("/login");
    return;
  }
    const cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItem(cartData);
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/api/cart/add`,{ itemId, size },{ withCredentials: true });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
      await getUserCart();
    } finally {
      setLoading(false);
    }
  };

  const getUserCart = async () => {
    try {
      const { data } = await axios.post(`${API}/api/cart/get`,
        {},
        { withCredentials: true });
      setCartItem(data.cartData);
    } catch (error) {
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);
    if (userData) {
      try {
        const {data} = await axios.post(`${API}/api/cart/update`,{ itemId, size, quantity },{ withCredentials: true });
        toast.success(data.message)
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        const quantity = cartItem[productId][size];
        if (quantity > 0) {
          totalCount += quantity;
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const productId in cartItem) {
      const productInfo = products.find((product) => product._id === productId);
      for (const size in cartItem[productId]) {
        const quantity = cartItem[productId][size];
        if (quantity > 0) {
          totalAmount += productInfo.price * quantity;
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    getProducts();
  }, []);

useEffect(() => {
  if (userData) {
    getUserCart();
  } else {
    setCartItem({});
  }
}, [userData, API]);

  const value = {
    API,
    currency,
    delivery_fee,
    products,
    setProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    setCartItem,
    loading,
    setLoading,
    getProducts,
    addToCart,
    getUserCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
  };

  return (
    <cartDataContext.Provider value={value}>
      {children}
    </cartDataContext.Provider>
  );
};

export default CartContext;
