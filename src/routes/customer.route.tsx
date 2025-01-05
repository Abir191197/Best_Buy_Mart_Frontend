import AddressLayout from "../pages/Customer Page/AddressLayout";

import OrderLayout from "../pages/Customer Page/Customer Components/OrderLayout";

export const customerPath = [
  
  {
    path: "dashboard",
    element: <h1>dashboard</h1>,
  },
  
  {
    path: "Address",
    element: <AddressLayout></AddressLayout>,
  },
  {
    path: "Orders",
    element:<OrderLayout></OrderLayout>
  }
];
