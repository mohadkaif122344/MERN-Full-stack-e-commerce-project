import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { cartDataContext } from "../context/CartContext";
import { authUserDataContext } from "../context/AuthContext";

const Verify = () => {
  const navigate = useNavigate();
  const { API } = useContext(authUserDataContext);
  const { setCartItem } = useContext(cartDataContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      const { data } = await axios.post(`${API}/api/order/verifyStripe`, {
        success,
        orderId,
      });
      if (data.success) {
        setCartItem({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      navigate("/cart");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <p>Verifying payment...</p>
    </div>
  );
};

export default Verify;
