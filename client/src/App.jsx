import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Collectons from "./pages/Collectons";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import ProtectRoute from "./components/ProtectRoute";

const App = () => {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-neutral-100">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collectons />} />
        <Route path="/product/:productId" element={<ProductDetailsPage/>} />
        <Route element={<ProtectRoute />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
