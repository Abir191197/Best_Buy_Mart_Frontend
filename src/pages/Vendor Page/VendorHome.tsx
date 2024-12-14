import Stats from "./Vendor Components/Stats";
import ChartsContainer from "./Vendor Components/Graph";

const VendorHome = () => {
  return (
    <div className="bg-slate-100 p-4 max-h-screen-full">
      <div className="  px-4 sm:px-6 lg:px-8 ms-52">
        <Stats></Stats>
        <ChartsContainer></ChartsContainer>
      </div>
    </div>
  );
};

export default VendorHome;
