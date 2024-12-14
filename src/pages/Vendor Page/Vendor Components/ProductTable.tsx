import React from "react";

const ProductTable = () => {
  // Placeholder product data
  const productData = [
    {
      id: 1,
      image: "https://via.placeholder.com/50", // Replace with actual images later
      name: "Fake Product 1",
      price: "$100",
      brand: "happy-time",
      quantity: "500",
      srName: "mohammad ali",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/50",
      name: "Fake Product 2",
      price: "$100",
      brand: "happy-time",
      quantity: "500",
      srName: "mohammad ali",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/50",
      name: "Fake Product 3",
      price: "$100",
      brand: "happy-time",
      quantity: "500",
      srName: "mohammad ali",
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header */}
      <h3 className="text-lg font-semibold mb-4">TOP 10 List</h3>
      {/* Navigation Tabs */}
      <div className="flex border-b mb-4">
        <button className="text-blue-500 font-medium border-b-2 border-blue-500 px-4 pb-2">
          Product
        </button>
        <button className="text-gray-500 px-4 pb-2">Dealer</button>
        <button className="text-gray-500 px-4 pb-2">Retailer</button>
        <button className="text-gray-500 px-4 pb-2">SR</button>
        <button className="text-gray-500 px-4 pb-2">Union</button>
        <button className="text-gray-500 px-4 pb-2">Bazar</button>
      </div>

      {/* Table */}
      <table className="w-full table-auto">
        <thead>
          <tr className="text-gray-500 text-left border-b">
            <th className="py-2">IMAGE</th>
            <th className="py-2">NAME</th>
            <th className="py-2">PRICE</th>
            <th className="py-2">BRAND</th>
            <th className="py-2">QUANTITY</th>
            <th className="py-2">SR NAME</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="py-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 rounded"
                />
              </td>
              <td className="py-2">{product.name}</td>
              <td className="py-2">{product.price}</td>
              <td className="py-2">{product.brand}</td>
              <td className="py-2">{product.quantity}</td>
              <td className="py-2">{product.srName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
