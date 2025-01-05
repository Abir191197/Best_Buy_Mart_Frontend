import React, { useState } from "react";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { createCartAnimation } from "../../../utils/animation";
import { useGetAllProductWithSearchQuery } from "../../../redux/features/Vendor Management/VendorProduct"; // Assuming your query hook is here
import ProductSkeleton from "./ProductSkeleton";
import { useLocation } from "react-router-dom";

const AllProductCard = ({
  cartIconRef,
}: {
  cartIconRef: React.RefObject<HTMLDivElement>;
}) => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(12);
  const [sort, setSort] = useState<string>("newest");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("searchTerm") ?? "";

  const { data, isLoading, isError } = useGetAllProductWithSearchQuery({
    searchTerm,
    skip: (page - 1) * limit,
    limit,
    sort,
  });

  const products = data?.data ?? [];

  const handleAddToCart = (
    productId: number,
    buttonElement: HTMLButtonElement
  ) => {
    const product = products.find((p: any) => p.productId === productId);
    if (product && cartIconRef.current) {
      createCartAnimation(
        buttonElement,
        cartIconRef.current,
        product.ProductImg?.[0]?.imgPath ?? "/default-image.jpg"
      );
    } else {
      console.warn("Product image not found for animation.");
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Featured Products
            </h1>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="p-2 border border-gray-300 rounded-md">
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(limit)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : isError ? (
          <p className="text-red-500">
            Failed to load products. Please try again.
          </p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <div
                key={product.productId}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                <div className="relative flex-shrink-0">
                  <img
                    src={
                      product.ProductImg?.[0]?.imgPath ?? "/default-image.jpg"
                    }
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                  </button>
                </div>

                <div className="flex flex-col p-6 flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium text-indigo-600 mb-1">
                        {product.categoryName}
                      </p>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {product.name}
                      </h2>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </p>
                  </div>

                  <p className="text-gray-600 mb-4 flex-grow">
                    {product.description}
                  </p>

                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">{renderStars(4.5)}</div>
                    <p className="text-sm text-gray-600">
                      ({product.reviews} reviews)
                    </p>
                  </div>

                  <button
                    onClick={(e) =>
                      handleAddToCart(product.productId, e.currentTarget)
                    }
                    className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No products available.</p>
        )}
        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md mr-2">
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={products.length < limit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md">
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default AllProductCard;
