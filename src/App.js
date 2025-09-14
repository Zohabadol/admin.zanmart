
import { permittedRoutes } from "./routes";
// import { Login } from "./pages/auth/login";
import { ToastContainer } from "react-toastify";
import { Navigate, useRoutes,useNavigate } from "react-router-dom";
import { Register } from "./pages/auth/register";
import OTP from "./pages/auth/otp";
import { getToken } from "./utils/helper";
import { useEffect } from "react";
import Login from "./pages/auth/login";

export const App = () => {

  const mainRoutes = { 
    path: "/",
    element: "",
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "/", element: <Login /> },
      { path: "/otp", element: <OTP /> },
      { path: "/login", element: <Login /> },
      // { path: "/registration", element: <Register /> },
    ],
  };

  const routing = useRoutes([mainRoutes, ...permittedRoutes()]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!getToken()) {
      navigate("/");  // Move the navigation inside useEffect to avoid re-render issues
    }
  }, [navigate]);
  return (
    <>
      {routing}
      <ToastContainer />
    </>
  );
}


