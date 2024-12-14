
import MyShopLayout from "../pages/Vendor Page/MyShopLayout";


import VendorHome from "../pages/Vendor Page/VendorHome";


export const vendorPaths = [
  {
    index: true,
    element: <VendorHome />,
  },
  {
    path: "MyShop",
    element: <MyShopLayout />,
  },
];
