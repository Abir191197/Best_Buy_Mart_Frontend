import { ExclamationCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ShopStatus, ShopT } from "../../../Types/interface";
import CreateShopModal from "./CreateShopModal";


interface Order {
  id: string;
  status: string;
}

// Constants
const MAX_SHOPS = 5;
const STATUS_STYLES = {
  ACTIVE: {
    bg: "bg-green-50",
    text: "text-green-700",
    dot: "bg-green-400",
  },
  PENDING: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    dot: "bg-yellow-400",
  },
  INACTIVE: {
    bg: "bg-gray-50",
    text: "text-gray-700",
    dot: "bg-gray-400",
  },
};

// Status Badge Component
const StatusBadge = ({ status }: { status: ShopStatus }) => (
  <span
    className={clsx(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
      STATUS_STYLES[status].bg,
      STATUS_STYLES[status].text
    )}>
    <span
      className={clsx("w-2 h-2 rounded-full mr-1.5", STATUS_STYLES[status].dot)}
    />
    {status.charAt(0) + status.slice(1).toLowerCase()}
  </span>
);

// Shop Card Component
const ShopCard = ({ shop, orders }: { shop: ShopT; orders: Order[] }) => {
  const isManageable = shop.status === "ACTIVE";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition duration-200 hover:shadow-md">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={shop.logoImgPath}
          alt={shop.name}
          className="w-16 h-16 rounded-full object-cover bg-gray-100"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{shop.name}</h3>
          <StatusBadge status={shop.status} />
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">{shop.description}</p>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-medium text-gray-900">Recent Orders</h4>
          <button
            onClick={() =>
              alert(
                isManageable ? `Managing ${shop.name}` : "Shop is not active"
              )
            }
            disabled={!isManageable}
            className={clsx(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              isManageable
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}>
            Manage Shop
          </button>
        </div>

        {orders.length > 0 ? (
          <ul className="space-y-2">
            {orders.map((order) => (
              <li key={order.id} className="text-sm text-gray-600">
                {order.status}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 text-center py-2">
            No orders yet
          </p>
        )}
      </div>
    </div>
  );
};

// Main ShopDetails Component
const ShopDetails = () => {
  const [shops, setShops] = useState<ShopT[]>([]);
  const [orders] = useState<Order[]>([
    { id: "1", status: "Order #1 - Pending" },
    { id: "2", status: "Order #2 - Delivered" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate API Call
    const fetchedShops: ShopT[] = [
      {
        shopId: "1",
        name: "Pusti Limited",
        description: "Food and beverages",
        status: "ACTIVE",
        logoImgPath: "https://via.placeholder.com/150",
      },
      {
        shopId: "2",
        name: "Pran Limited",
        description: "Groceries and more",
        status: "PENDING",
        logoImgPath: "https://via.placeholder.com/150",
      },
      {
        shopId: "3",
        name: "Fresh Limited",
        description: "Fresh produce and meats",
        status: "INACTIVE",
        logoImgPath: "https://via.placeholder.com/150",
      },
    ];
    setShops(fetchedShops);
  }, []);

  const handleCreateShop = (newShopData: {
    productName: string;
    category: string;
  }) => {
    const newShop: ShopT = {
      shopId: (shops.length + 1).toString(),
      name: newShopData.productName,
      description: newShopData.category,
      status: "PENDING",
      logoImgPath: "https://via.placeholder.com/150",
    };
    setShops([...shops, newShop]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Create Shop and Manage Orders
        </h1>
        <p className="text-gray-600">
          Manage your shops and track orders in one place
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={shops.length >= MAX_SHOPS}
            className={clsx(
              "inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors",
              shops.length >= MAX_SHOPS
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            )}>
            <PlusIcon className="w-5 h-5 mr-2" />
            Create Shop
          </button>

          {shops.length >= MAX_SHOPS && (
            <div className="flex items-center text-yellow-700 bg-yellow-50 px-3 py-2 rounded-md">
              <ExclamationCircleIcon className="w-5 h-5 mr-2" />
              <span className="text-sm">
                Maximum limit of {MAX_SHOPS} shops reached
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <ShopCard key={shop.shopId} shop={shop} orders={orders} />
        ))}
      </div>

      <CreateShopModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateShop}
        shopLimitReached={shops.length >= MAX_SHOPS}
      />
    </div>
  );
};

export default ShopDetails;