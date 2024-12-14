import React from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// AnalyticsChart Component
const AnalyticsChart = () => {
  const analyticsData = [
    { name: "Sale", value: 80 },
    { name: "Cancel", value: 10 },
    { name: "Return", value: 10 },
  ];

  const COLORS = ["#0088FE", "#FFBB28", "#FF8042"];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium">Analytics</h3>
      </div>
      <div className="relative w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <linearGradient id="gradient-sale" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0088FE" />
                <stop offset="100%" stopColor="#0056B3" />
              </linearGradient>
              <linearGradient id="gradient-cancel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFBB28" />
                <stop offset="100%" stopColor="#DFA000" />
              </linearGradient>
              <linearGradient id="gradient-return" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF8042" />
                <stop offset="100%" stopColor="#D96030" />
              </linearGradient>
            </defs>
            <Pie
              data={analyticsData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              cornerRadius={10}
              paddingAngle={5}
              stroke="none">
              {analyticsData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#gradient-${entry.name.toLowerCase()})`}
                  style={{
                    filter:
                      index === 0
                        ? "drop-shadow(4px 6px 6px rgba(0, 0, 0, 0.3))"
                        : "drop-shadow(2px 3px 4px rgba(0, 0, 0, 0.2))",
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-black">80%</div>
          <div className="text-sm text-gray-500">Delivery</div>
        </div>
      </div>

      <div className="flex justify-around mt-6">
        {analyticsData.map((item, index) => (
          <div key={item.name} className="flex flex-col items-center">
            <div
              className="w-3 h-3 rounded-full mb-1"
              style={{ backgroundColor: COLORS[index] }}></div>
            <span className="text-sm">{item.name}</span>
            <span className="text-gray-500 text-xs">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// SalesChart Component
const SalesChart = () => {
  const salesData = [
    { name: "Jan", value: 10000 },
    { name: "Jul", value: 40667.88 },
    { name: "Aug", value: 34902.16 },
    { name: "Sep", value: 35727.27 },
    { name: "Oct", value: 34072.16 },
    { name: "Nov", value: 37337.91 },
    { name: "Dec", value: 48574.21 },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Sales</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              color: "black",
              border: "none",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={3}
            dot={{
              stroke: "#8884d8",
              strokeWidth: 2,
              fill: "white",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// ProductTable Component
const ProductTable = () => {
  const productData = [
    {
      id: 1,
      image: "https://via.placeholder.com/50",
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
      <h3 className="text-lg font-semibold mb-4">TOP 10 List</h3>
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

// Main ChartsContainer Component
const ChartsContainer = () => {
  return (
    <div className="grid grid-cols-3 gap-x-6 mt-6">
      <div className="col-span-2">
        <SalesChart />
      </div>
      <div>
        <AnalyticsChart />
      </div>
      <div className="col-span-2 -mt-12">
        <ProductTable />
      </div>
    </div>
  );
};

export default ChartsContainer;
