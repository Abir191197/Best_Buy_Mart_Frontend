import React from "react";
import { Star } from "lucide-react";

const ProductSkeleton = () => {
  const renderStars = () =>
    [...Array(5)].map((_, index) => (
      <Star key={index} className="w-4 h-4 text-gray-300 animate-pulse" />
    ));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-64 bg-gray-300"></div>

      {/* Content Placeholder */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category and Title */}
        <div className="h-4 w-32 bg-gray-300 mb-2"></div>
        <div className="h-6 w-48 bg-gray-300 mb-4"></div>

        {/* Description */}
        <div className="h-16 w-full bg-gray-300 mb-4"></div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex mr-2">{renderStars()}</div>
          <div className="h-4 w-16 bg-gray-300"></div>
        </div>

        {/* Price */}
        <div className="h-6 w-24 bg-gray-300 mb-4"></div>

        {/* Button */}
        <div className="w-full h-12 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
