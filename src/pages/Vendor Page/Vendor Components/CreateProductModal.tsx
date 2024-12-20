import { Dialog, Transition } from "@headlessui/react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Loading from "../../../components/Loading";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useCreateProductMutation } from "../../../redux/features/Vendor Management/VendorProduct";
import { useGetMyShopQuery } from "../../../redux/features/Vendor Management/VendorShop";
import { useAppSelector } from "../../../redux/hook";
import { Product, ShopT } from "../../../Types/interface";

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProductModal = ({ isOpen, onClose }: CreateProductModalProps) => {
  const [selectedImages, setSelectedImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser?.userId || null;

  const { data: shopData } = useGetMyShopQuery(userId);
  const shops = shopData?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedImages = [...selectedImages];
      updatedImages[index] = file;
      setSelectedImages(updatedImages);
    }
  };

  const handleClose = () => {
    reset();
    setSelectedImages([null, null, null, null, null]);
    onClose();
  };

  const onSubmitHandler = async (data: Product) => {
    if (!selectedImages.some((img) => img)) {
      toast.error("At least one product image is required.");
      return;
    }

    const formData = new FormData();
    selectedImages.forEach((img) => {
      if (img) formData.append("images", img);
    });

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
    };

    formData.append("data", JSON.stringify(productData));

    try {
      await createProduct(formData).unwrap();
      toast.success(
        "Product created successfully. Waiting for admin approval."
      );
      reset();
      setSelectedImages([null, null, null, null, null]);
      onClose();
    } catch (error: any) {
      console.error("Error creating product:", error);
      toast.error(
        `Product creation failed: ${error?.data?.message || error.message}`
      );
    }
  };

  useEffect(() => {
    return () => {
      selectedImages.forEach((img) => {
        if (img) URL.revokeObjectURL(URL.createObjectURL(img));
      });
    };
  }, [selectedImages]);

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
              {isLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                  <Loading />
                </div>
              )}

              <div className="flex justify-between items-center mb-4">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-gray-900">
                  Create New Product
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
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                        errors.name ? "border-red-500" : "focus:border-blue-500"
                      }`}
                      placeholder="Product name"
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
                      {...register("price", { required: "Price is required." })}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                        errors.price
                          ? "border-red-500"
                          : "focus:border-blue-500"
                      }`}
                      placeholder="0.00"
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
                    rows={3}
                    {...register("description", {
                      required: "Description is required.",
                    })}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                      errors.description
                        ? "border-red-500"
                        : "focus:border-blue-500"
                    }`}
                    placeholder="Product description"
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
                      {...register("stock", { required: "Stock is required." })}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                        errors.stock
                          ? "border-red-500"
                          : "focus:border-blue-500"
                      }`}
                      placeholder="Available quantity"
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
                        required: "Category is required.",
                      })}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                        errors.category
                          ? "border-red-500"
                          : "focus:border-blue-500"
                      }`}>
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
                      required: "Shop selection is required.",
                    })}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                      errors.shopId ? "border-red-500" : "focus:border-blue-500"
                    }`}>
                    <option value="">Select Shop</option>
                    {shops.map((shop: ShopT) => (
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
                    onClick={handleClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}>
                    {isLoading ? "Creating..." : "Create Product"}
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
