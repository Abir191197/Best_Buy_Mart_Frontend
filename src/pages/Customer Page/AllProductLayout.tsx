import React, { useRef, useState } from "react";
import UserProfile from "../Landing Page/UserProfile";
import AllProductCard from "./Customer Components/AllProductCard";

const AllProductLayout = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Lifted state
  const cartIconRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-slate-100">
      <div>
        {/* Sticky User Profile */}
        <div className="sticky top-0 z-20 w-full">
          <UserProfile
            cartIconRef={cartIconRef}
            setSearchTerm={setSearchTerm}
          />{" "}
          {/* Pass setSearchTerm */}
        </div>
        <AllProductCard cartIconRef={cartIconRef} searchTerm={searchTerm} />{" "}
        {/* Pass searchTerm */}
      </div>
    </div>
  );
};

export default AllProductLayout;
