
import { Outlet } from "react-router-dom";
import VendorDashboard from "./VendorDashboard";


const Vendor = () => {
    return (
      <div className="  ">
        <VendorDashboard></VendorDashboard>
        <Outlet></Outlet>
      </div>
    );
};

export default Vendor;