import { Dialog, Transition } from "@headlessui/react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Loading from "../../../components/Loading";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import {
  useDuplicateProductMutation,
  useGetSingleProductQuery,
} from "../../../redux/features/Vendor Management/VendorProduct";
import { useGetMyShopQuery } from "../../../redux/features/Vendor Management/VendorShop";
import { useAppSelector } from "../../../redux/hook";
import { Product } from "../../../Types/interface";

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
}

const DuplicateProductCreateModal = ({
  isOpen,
  onClose,
  productId,
}: CreateProductModalProps) => {
  const [selectedImages, setSelectedImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser?.userId || null;

  const { data: shopData } = useGetMyShopQuery(userId);
  const shops = shopData?.data || [];

  const {
    data: productData,
    isLoading: isProductLoading,
    isError,
  } = useGetSingleProductQuery(productId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<Product>();

  const [createProduct, { isLoading: isCreating }] =
    useDuplicateProductMutation();

  useEffect(() => {
    if (productData?.data) {
      const product = productData.data;
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("description", product.description);
      setValue("stock", product.stock);
      setValue("category", product.categoryName);
      setValue("shopId", "Select a shop");

      // Handle existing product images
      if (product.ProductImg && product.ProductImg.length > 0) {
        const imgPaths = product.ProductImg.map((img) => img.imgPath);
        setPreviewImages(imgPaths);
      }
    }
  }, [productData, setValue]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload only image files");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const updatedImages = [...selectedImages];
      updatedImages[index] = file;
      setSelectedImages(updatedImages);

      const previewUrl = URL.createObjectURL(file);
      const updatedPreviews = [...previewImages];
      updatedPreviews[index] = previewUrl;
      setPreviewImages(updatedPreviews);
    }
  };

  const handleClose = () => {
    reset();
    setSelectedImages([null, null, null, null, null]);
    setPreviewImages([]);
    onClose();
  };

 const onSubmitHandler = async (data: Product) => {
   try {
     const formData = new FormData();

     // Add the image URLs from the previewImages array instead of selected file images
     previewImages.forEach((url) => {
       formData.append("imageUrls", url); // Add each image URL
     });

     // Add the other product data to the formData
     const productData = {
       name: data.name,
       description: data.description,
       shopId: data.shopId,
       price: parseFloat(data.price.toString()),
       stock: parseInt(data.stock.toString(), 10),
       category: data.category,
       discountCode: data.discountCode || null,
       discountPercent: data.discountPercent
         ? parseInt(data.discountPercent.toString(), 10)
         : null,
       imagesURL: previewImages, // Pass the image URLs here
     };

     formData.append("data", JSON.stringify(productData)); // Append the full product data

     await createProduct({ id: productId, formData }).unwrap();
     toast.success(
       "Product duplicated successfully. Waiting for admin approval."
     );
     handleClose();
   } catch (error: any) {
     console.error("Error duplicating product:", error);
     toast.error(
       `Product duplication failed: ${error?.data?.message || error.message}`
     );
   }
 };




  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      previewImages.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewImages]);

  if (isError) {
    return null;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleClose}>
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
              {isProductLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                  <Loading />
                </div>
              )}

              <div className="flex justify-between items-center mb-4">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-gray-900">
                  Duplicate Product
                </Dialog.Title>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-500">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="space-y-4">
                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images (Max 5)
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="aspect-square relative">
                        <label className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-400">
                          {previewImages[index] ? (
                            <img
                              src={previewImages[index]}
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

                {/* Product Details Form */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <input
                      type="text"
                      {...register("name", {
                        required: "Product name is required",
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("price", { required: "Price is required" })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Stock
                    </label>
                    <input
                      type="number"
                      {...register("stock", { required: "Stock is required" })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.stock && (
                      <p className="text-red-500 text-sm">
                        {errors.stock.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      {...register("category", {
                        required: "Category is required",
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                      <option value="">Select category</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing</option>
                      <option value="books">Books</option>
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Select Shop
                  </label>
                  <select
                    {...register("shopId", {
                      required: "Shop selection is required",
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">Select a shop</option>
                    {shops.map((shop: any) => (
                      <option key={shop.shopId} value={shop.shopId}>
                        {shop.name}
                      </option>
                    ))}
                  </select>
                  {errors.shopId && (
                    <p className="text-red-500 text-sm">
                      {errors.shopId.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Discount Code (Optional)
                    </label>
                    <input
                      type="text"
                      {...register("discountCode")}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Discount Percentage (Optional)
                    </label>
                    <input
                      type="number"
                      step="1"
                      {...register("discountPercent")}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    {isCreating ? "Creating..." : "Duplicate Product"}
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

export default DuplicateProductCreateModal;
