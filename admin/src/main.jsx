import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AdminContext from "./context/AdminContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContext>
      <App />
    </AdminContext>
  </BrowserRouter>,
);
