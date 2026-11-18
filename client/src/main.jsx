import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContext from "./context/AuthContext.jsx";
import CartContext from "./context/CartContext.jsx";
import { BrowserRouter } from "react-router-dom";
import ThemeContext from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeContext>
      <AuthContext>
        <CartContext>
          <App />
        </CartContext>
      </AuthContext>
    </ThemeContext>
  </BrowserRouter>,
);
