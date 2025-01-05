import MyShopLayout from "../pages/Vendor Page/MyShopLayout";
import ProductsLayout from "../pages/Vendor Page/ProductsLayout";
import ProfileLayout from "../pages/Vendor Page/ProfileLayout";
import SingleProductView from "../pages/Vendor Page/Vendor Components/SingleProductView";
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
  {
    path: "Products",
    element: <ProductsLayout />,
  },
  {
    path: "Products/:productId",
    element: <SingleProductView />,
  },
  {
    path: "Profile",
    element: <ProfileLayout />,
  },
];
