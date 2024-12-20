import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllProductWithSearchQuery } from "../../../redux/features/Vendor Management/VendorProduct";
import Loading from "../../../components/Loading";
import { Plus, Search } from "lucide-react";
import CreateProductModal from "./CreateProductModal";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleQuickView = () => {
    navigate(`/vendor/product/${product.productId}`);
  };

  return (
    <div
      className="group relative rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg">
        <img
          src={product.ProductImg[0]?.imgPath}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300">
            <button
              className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
              onClick={handleQuickView}>
              Quick View
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">{product.categoryName}</p>
            <p className="text-sm text-blue-500">Shop: {product.shop?.name}</p>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            ${product.price}
          </span>
        </div>
        {product.discountPercent > 0 && (
          <p className="text-sm text-green-500 mt-2">
            {product.discountPercent}% Off
          </p>
        )}
        <p className="mt-2 text-sm text-gray-500">Stock: {product.stock}</p>
      </div>
    </div>
  );
};

export default function ProductDetails() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState("newest");
  const { data, isLoading, isError } = useGetAllProductWithSearchQuery({
    searchTerm,
    page,
    limit,
    sort,
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) return <Loading />;
  if (isError)
    return <div className="text-center">Failed to load products.</div>;

  const { data: products, success, message } = data;

  if (!success) return <div className="text-center">{message}</div>;

  const totalProducts = products.length;
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handlePageChange = (newPage) => setPage(newPage);
  const handleSortChange = (e) => setSort(e.target.value);

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="mt-1 text-sm text-gray-500">
              {totalProducts} products available
            </p>
          </div>
          <button
            onClick={openModal}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Create Product
          </button>
        </div>

        {/* Filters Section */}
        <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <select
            value={sort}
            onChange={handleSortChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center space-x-2">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:bg-gray-100">
            Previous
          </button>
          <span className="px-4 py-2">Page {page}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
            Next
          </button>
        </div>
      </div>

      {/* Create Product Modal */}
      <CreateProductModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
