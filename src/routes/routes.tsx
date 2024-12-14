import { createBrowserRouter } from "react-router-dom";



import { adminPaths } from "./admin.route";

import ProtectedRoute from "../components/ProtectedRoute";

import NotFoundPage from "../components/NotFoundPage";
import Admin from "../pages/Admin Page/Admin";
import Customer from "../pages/Customer Page/Customer";

import VendorRegister from "../pages/Auth Page/VenderRegister";

import Vendor from "../pages/Vendor Page/Vendor";
import { customerPath } from "./customer.route";
import { vendorPaths } from "./vendor.route";
import OTPVerification from "../pages/Auth Page/OtpVerification";
import Register from "../pages/Auth Page/Register";
import Login from "../pages/Auth Page/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>home</h1>,
    errorElement: <NotFoundPage></NotFoundPage>,
  },
  {
    path: "/login",
    element: <Login></Login>,
    errorElement: <NotFoundPage></NotFoundPage>,
  },
  {
    path: "/register",
    element: <Register></Register>,
    errorElement: <NotFoundPage></NotFoundPage>,
  },
  {
    path: "/OTPVerification",
    element: <OTPVerification></OTPVerification>,
    errorElement: <NotFoundPage></NotFoundPage>,
  },
  {
    path: "/VendorRegister",
    element: <VendorRegister></VendorRegister>,
    errorElement: <NotFoundPage></NotFoundPage>,
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute role="ADMIN">
        <Admin></Admin>
      </ProtectedRoute>
    ),
    children: adminPaths,
    errorElement: <NotFoundPage></NotFoundPage>,
  },

  {
    path: "/user",

    element: (
      <ProtectedRoute role="USER">
        <Customer></Customer>
      </ProtectedRoute>
    ),
    children: customerPath,
    errorElement: <NotFoundPage></NotFoundPage>,
  },

  {
    path: "/vendor",

    element: (
      <ProtectedRoute role="VENDOR">
        <Vendor></Vendor>
      </ProtectedRoute>
    ),

    children: vendorPaths,
    errorElement: <NotFoundPage></NotFoundPage>,
  },
]);

export default router;
