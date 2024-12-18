import { Dialog, Transition } from "@headlessui/react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CreateShopModalProps, FormInputs } from "../../../Types/interface";
import { useCreateShopMutation } from "../../../redux/features/Vendor Management/VendorShop";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/hook";

const CreateShopModal: React.FC<CreateShopModalProps> = ({
  isOpen,
  onClose,
  shopLimitReached,
}) => {
  const [createShop] = useCreateShopMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser?.userId || null;

  const [logoFileName, setLogoFileName] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue, // To manually set file input value
  } = useForm<FormInputs>();

  const onSubmitHandler = async (data: FormInputs) => {
    if (shopLimitReached) return;

    const formData = new FormData();

    // Append image file manually
    if (data.logoImgPath) {
      formData.append("images", data.logoImgPath); // Attach the image file
    } else {
      console.error("No image selected");
      toast.error("Logo image is required.");
      return;
    }

    // Append shop data as JSON
    const shopData = {
      name: data.name,
      description: data.description,
      userId: userId,
    };
    formData.append("data", JSON.stringify(shopData));

    // Log FormData to verify its contents
    console.log("FormData before submission:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      await createShop(formData).unwrap();
      toast.success("Shop created successfully. Waiting for admin approval.");
      reset();
      setLogoFileName(null);
      onClose();
    } catch (error) {
      console.error("Error creating shop:", error);
      toast.error(`Shop creation failed: ${error?.data?.message || error}`);
    }
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogoFileName(event.target.files[0].name); // Display file name
      setValue("logoImgPath", event.target.files[0]); // Set file input manually
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
            <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900">
                  Create a New Shop
                </Dialog.Title>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={onClose}>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="space-y-6">
                {/* Shop Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700">
                    Shop Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", {
                      required: "Shop name is required",
                      minLength: {
                        value: 3,
                        message: "Shop name must be at least 3 characters",
                      },
                    })}
                    className={clsx(
                      "block w-full rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500",
                      errors.name ? "border-red-300" : "border-gray-300"
                    )}
                    placeholder="Enter your shop name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700">
                    Shop Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    {...register("description")}
                    className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Briefly describe your shop"
                  />
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Shop Logo <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4">
                    <label className="flex items-center space-x-2 cursor-pointer text-blue-600 hover:text-blue-500">
                      <PhotoIcon className="h-8 w-8" />
                      <span>Upload Logo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoChange}
                      />
                    </label>
                  </div>
                  {logoFileName && (
                    <p className="mt-2 text-sm text-gray-600">
                      File: {logoFileName}
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || shopLimitReached}
                    className={clsx(
                      "px-4 py-2 text-sm font-medium text-white rounded-md",
                      isSubmitting || shopLimitReached
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    )}>
                    {isSubmitting ? "Creating..." : "Create Shop"}
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

export default CreateShopModal;
