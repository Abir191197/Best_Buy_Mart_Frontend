import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllProductWithSearchQuery } from "../../../redux/features/Vendor Management/VendorProduct";
import Loading from "../../../components/Loading";
import { Plus, Search, Copy } from "lucide-react";
import CreateProductModal from "./CreateProductModal";
import DuplicateProductCreateModal from "./DuplicateProductCreateModal";

const ProductCard = ({ product, onDuplicate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleQuickView = () => {
    navigate(`/vendor/Products/${product.productId}`);
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
        <button
          onClick={() => onDuplicate(product.productId)}
          className="mt-4 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Copy className="w-5 h-5 mr-2" />
          Duplicate Product
        </button>
      </div>
    </div>
  );
};

export default function ProductDetails() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(12); // Set your default limit for pagination
  const [sort, setSort] = useState("newest");

  const { data, isLoading, isError } = useGetAllProductWithSearchQuery({
    searchTerm,
    skip: (page - 1) * limit, // Skip logic based on page
    limit,
    sort,
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openDuplicateModal = (productId) => {
    setSelectedProductId(productId);
    setIsDuplicateModalOpen(true);
  };
  const closeDuplicateModal = () => {
    setSelectedProductId(null);
    setIsDuplicateModalOpen(false);
  };

  useEffect(() => {
    if (data?.data) {
      // If you want to set total count of products, you can update here
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (isError)
    return <div className="text-center">Failed to load products.</div>;

  const { data: products = [] } = data || {};

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSortChange = (e) => setSort(e.target.value);

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setPage(newPage);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
          
        </div>
        <button
          onClick={openCreateModal}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Create Product
        </button>
      </div>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              onDuplicate={openDuplicateModal}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">No products found.</div>
        )}
      </div>

      <div className="mt-6 flex justify-center space-x-2">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:bg-gray-100">
          Previous
        </button>
        <button
          disabled={products.length < limit}
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:bg-gray-100">
          Next
        </button>
      </div>

      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
      />
      <DuplicateProductCreateModal
        isOpen={isDuplicateModalOpen}
        onClose={closeDuplicateModal}
        productId={selectedProductId}
      />
    </div>
  );
}
