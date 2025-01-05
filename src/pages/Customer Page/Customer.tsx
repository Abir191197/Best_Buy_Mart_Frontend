import { Outlet } from "react-router-dom";
import CustomerDashboard from "./CustomerDashboard";


const Customer = () => {
  return (
    <div className="  ">
    <CustomerDashboard></CustomerDashboard>
      <Outlet></Outlet>
    </div>
  );
};

export default Customer;
