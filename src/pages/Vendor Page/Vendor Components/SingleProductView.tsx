import { useState } from "react";
import { useParams } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useGetSingleProductQuery } from "../../../redux/features/Vendor Management/VendorProduct";
import Loading from "../../../components/Loading";

const SingleProductView = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const { productId } = useParams();

  const { data, isLoading, isError } = useGetSingleProductQuery(productId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center ms-11">
        <Loading></Loading>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-gray-600">Error fetching product details</div>
      </div>
    );
  }

  const product = data.data;
  const discountedPrice =
    product.price - (product.price * product.discountPercent) / 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8 ms-52">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col">
            <div className="aspect-w-1 aspect-h-1 w-full">
              <img
                src={
                  product.ProductImg[selectedImageIndex]?.imgPath ||
                  "/api/placeholder/600/600"
                }
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Thumbnail gallery */}
            <div className="-my-20 grid grid-cols-4 gap-2">
              {product.ProductImg.map((img, index) => (
                <button
                  key={img.imgId}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-square overflow-hidden rounded-md ${
                    selectedImageIndex === index ? "ring-2 ring-blue-500" : ""
                  }`}>
                  <img
                    src={img.imgPath}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product details */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {product.categoryName}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-center space-x-4">
              <p className="text-3xl font-bold text-gray-900">
                ${discountedPrice.toFixed(2)}
              </p>
              {product.discountPercent > 0 && (
                <>
                  <p className="text-xl text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </p>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                    {product.discountPercent}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <div className="mt-2 text-gray-600">{product.description}</div>
            </div>

            {/* Stock info */}
            <div className="mt-6">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    product.isAvailable ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span className="text-sm text-gray-600">
                  {product.isAvailable ? "In Stock" : "Out of Stock"} (
                  {product.stock} units)
                </span>
              </div>
            </div>

            {/* Additional Details */}
            <Disclosure as="div" className="mt-6">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between items-center w-full text-gray-900 text-left">
                    <span className="text-lg font-semibold">
                      Additional Details
                    </span>
                    <span>
                      {open ? (
                        <MinusIcon className="w-5 h-5" />
                      ) : (
                        <PlusIcon className="w-5 h-5" />
                      )}
                    </span>
                  </Disclosure.Button>
                  <Disclosure.Panel className="mt-2 text-gray-700">
                    <ul className="list-disc list-inside">
                      <li>Shop Name: {product.shop.name}</li>
                      <li>Category: {product.categoryName}</li>
                      <li>Discount Code: {product.discountCode}</li>
                    </ul>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            {/* Shop info */}
            <div className="mt-8 border-t pt-8">
              <div className="flex items-center space-x-4">
                <img
                  src={product.shop.logoImgPath || "/api/placeholder/48/48"}
                  alt={product.shop.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {product.shop.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {product.shop.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductView;
