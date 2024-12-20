import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useCreateProductMutation } from "../../../redux/features/Vendor Management/VendorProduct";
import { useGetMyShopQuery } from "../../../redux/features/Vendor Management/VendorShop";
import { useAppSelector } from "../../../redux/hook";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";

const CreateProductModal = ({ isOpen, onClose }) => {
  const [selectedImages, setSelectedImages] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser?.userId || null;

  // Fetch shop data using the query
  const { data: ShopData, isLoading: isShopLoading } =
    useGetMyShopQuery(userId);

  // Check if ShopData has data (an array of shops)
  const shops = ShopData?.data || []; // Use ShopData.data if available, fallback to empty array

  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  // Handle image file selection
  const handleImageChange = (event, index) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedImages = [...selectedImages];
      updatedImages[index] = file; // Save file for upload
      setSelectedImages(updatedImages);
    }
  };

  // Form submission handler
 const onSubmitHandler = async (data) => {
   if (!selectedImages.some((img) => img)) {
     toast.error("At least one product image is required.");
     return;
   }

   const formData = new FormData();

   // Append all images in the 'images[]' array
   selectedImages.forEach((img) => {
     if (img) {
       formData.append("images", img); // Append all images under the 'images[]' array
     }
   });

   // Append product data as JSON string
   const productData = {
     name: data.name,
     description: data.description,
     shopId: data.shopId, // Updated to use selected shopId from form data
     price: parseFloat(data.price),
     stock: parseInt(data.stock, 10),
     category: data.category,
     discountCode: data.discountCode || null,
     discountPercent: data.discountPercent || null,
   };

   formData.append("data", JSON.stringify(productData)); // Attach product data

   try {
     // Make the API call with FormData
     await createProduct(formData).unwrap();
     toast.success("Product created successfully. Waiting for admin approval.");
     reset();
     setSelectedImages([null, null, null, null, null]);
     onClose();
   } catch (error) {
     console.error("Error creating product:", error);
     toast.error(
       `Product creation failed: ${error?.data?.message || error.message}`
     );
   }
 };


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <div className="inline-block w-full max-w-2xl p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-gray-900">
                  Create New Product
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images (Max 5)
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="aspect-square relative">
                        <label className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-400">
                          {image ? (
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`preview-${index}`}
                              className="absolute inset-0 w-full h-full object-cover rounded"
                            />
                          ) : (
                            <PhotoIcon className="w-24 h-24 text-gray-400" />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) =>
                              handleImageChange(event, index)
                            }
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <input
                      type="text"
                      {...register("name", {
                        required: "Product name is required.",
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("price", { required: "Price is required." })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    {...register("description", {
                      required: "Description is required.",
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Product description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Stock
                    </label>
                    <input
                      type="number"
                      {...register("stock", { required: "Stock is required." })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Available quantity"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      {...register("category", {
                        required: "Category is required.",
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                      <option value="">Select category</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing</option>
                      <option value="books">Books</option>
                    </select>
                  </div>
                </div>

                {/* Shop Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Select Shop
                  </label>
                  <select
                    {...register("shopId", {
                      required: "Shop selection is required.",
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">Select Shop</option>
                    {shops.map((shop) => (
                      <option key={shop.shopId} value={shop.shopId}>
                        {shop.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Optional Discount Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Discount Code (Optional)
                    </label>
                    <input
                      type="text"
                      {...register("discountCode")}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Discount code"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Discount Percent (Optional)
                    </label>
                    <input
                      type="number"
                      step="1"
                      {...register("discountPercent")}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                    Create Product
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateProductModal;
