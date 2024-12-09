import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import { adminPaths } from "./admin.route";



import ProtectedRoute from "../components/ProtectedRoute";

import Admin from "../pages/Admin Page/Admin";
import Customer from "../pages/Customer Page/Customer";
import Vendor from "../pages/Vendor Page/Vendor";
import { customerPath } from "./customer.route";
import { vendorPaths } from "./vendor.route";
import NotFoundPage from "../components/NotFoundPage";


const router = createBrowserRouter([
  {
    path: "/",
    element:<h1>home</h1>,
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
    //errorElement: <Nofound></Nofound>,
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <Admin></Admin>
      </ProtectedRoute>
    ),
    children: adminPaths,
    //errorElement: <Nofound></Nofound>,
  },

  {
    path: "/customer",

    element: (
      <ProtectedRoute role="customer">
        <Customer></Customer>
      </ProtectedRoute>
    ),
    children: customerPath,
    errorElement: <NotFoundPage></NotFoundPage>,
  },

  {
    path: "/vendor",

    element: (
      <ProtectedRoute role="vendor">
        <Vendor></Vendor>
      </ProtectedRoute>

    ),

    children: vendorPaths,
    errorElement: <NotFoundPage></NotFoundPage>,
  },
]);

export default router;
