import {
  Building,
  Camera,
  Globe,
  Hash,
  Mail,
  MapPin,
  MapPinned,
  Pencil,
  Phone,
  Upload,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "../../../components/Loading";
import { useMeeMutation, useMeQuery } from "../../../redux/features/auth/meApi";

const Address = () => {
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const { data: queryData, error, isLoading } = useMeQuery(undefined);
  const [updateData] = useMeeMutation();
  console.log(queryData);
  const [details, setDetails] = useState({
    id: null,
    email: "",
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    profileImgSrc: null,
    createAt :""
  });

  // Load data from query on component mount
  useEffect(() => {
    if (queryData) {
      setDetails({
        id: queryData.id,
        email: queryData.data.email || "",
        name: queryData.data.name || "",
        phone: queryData.data.phone || "",
        street: queryData.data.street || "",
        city: queryData.data.city || "",
        state: queryData.data.state || "",
        country: queryData.data.country || "",
        postalCode: queryData.data.postalCode || "",
        profileImgSrc: queryData.data.profileImgSrc || null,
        createAt: queryData.data.createdAt,
      });
    }
  }, [queryData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newDetails = {
      email: formData.get("email"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      country: formData.get("country"),
      postalCode: formData.get("postalCode"),
    };

    formData.append("data", JSON.stringify(newDetails));
    if (file) {
      formData.append("images", file);
    }

    try {
      const response = await updateData(formData).unwrap();
      if (response.statusCode === 200) {
        toast.success("Profile updated successfully!");
      }
      setShowForm(false);
    } catch (err) {
      toast.error("Failed to update data.");
      console.error("Failed to update data:", err);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const handleFileSelect = (selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(selectedFile);
    } else {
      console.error("Invalid file type. Please upload an image.");
    }
  };

  const renderForm = () => (
    <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {details.id ? "Edit Address" : "Add Address"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              label="Email"
              type="email"
              name="email"
              icon={<Mail />}
              defaultValue={details.email}
              readOnly
            />
            <FormField
              label="Full Name"
              type="text"
              name="name"
              icon={<User />}
              defaultValue={details.name}
            />
            <FormField
              label="Phone"
              type="tel"
              name="phone"
              icon={<Phone />}
              defaultValue={details.phone}
            />
            <SelectField
              label="Country"
              name="country"
              icon={<Globe />}
              defaultValue={details.country}
              options={[
                { value: "", label: "Select country" },
                { value: "US", label: "United States" },
                { value: "CA", label: "Canada" },
                { value: "GB", label: "United Kingdom" },
              ]}
            />
          </div>

          <div className="space-y-6">
            <FormField
              label="Street Address"
              type="text"
              name="street"
              icon={<MapPin />}
              defaultValue={details.street}
            />
            <FormField
              label="City"
              type="text"
              name="city"
              icon={<Building />}
              defaultValue={details.city}
            />
            <FormField
              label="State/Province"
              type="text"
              name="state"
              icon={<MapPinned />}
              defaultValue={details.state}
            />
            <FormField
              label="Postal Code"
              type="text"
              name="postalCode"
              icon={<Hash />}
              defaultValue={details.postalCode}
            />
          </div>
        </div>

        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Image
          </label>
          <div
            className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-8"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}>
            <div className="text-center">
              {imagePreview ? (
                <div className="mb-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto h-32 w-32 object-cover rounded-full"
                  />
                </div>
              ) : (
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
              )}
              <div className="mt-4 flex text-sm text-gray-600 justify-center">
                <label className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e.target.files[0])}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 rounded-b-lg">
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save Changes
        </button>
      </div>
    </form>
  );
const renderDetails = () => (
  <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
    <div className="px-8 py-4 border-b border-gray-300 bg-gray-50">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">
          Personal Information and Shipping Address
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-semibold bg-indigo-600 text-white border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <Pencil className="w-5 h-5 mr-2" /> Edit
        </button>
      </div>
    </div>
    <div className="p-8">
      <div className="flex flex-col items-center mb-2">
        <div className="relative w-28 h-28">
          <img
            src={details.profileImgSrc}
            alt="Profile"
            className="w-full h-full rounded-full border-4 border-indigo-600 shadow-xl object-cover"
          />
        </div>
        <p className="text-gray-700 mt-4">
          Member since:{" "}
          <span className="font-medium">
            {new Date(details.createAt).toLocaleDateString()}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DetailSection
          title="Personal Information"
          items={[
            { icon: <User />, label: "Full Name", value: details.name },
            { icon: <Mail />, label: "Email", value: details.email },
            { icon: <Phone />, label: "Phone", value: details.phone },
          ]}
        />
        <DetailSection
          title="Address Details"
          items={[
            { icon: <MapPin />, label: "Street", value: details.street },
            { icon: <Building />, label: "City", value: details.city },
            { icon: <MapPinned />, label: "State", value: details.state },
            { icon: <Globe />, label: "Country", value: details.country },
            {
              icon: <Hash />,
              label: "Postal Code",
              value: details.postalCode,
            },
          ]}
        />
      </div>
    </div>
  </div>
);





  return isLoading ? (
    <Loading></Loading>
  ) : error ? (
    <p>Error loading data</p>
  ) : showForm ? (
    renderForm()
  ) : (
    renderDetails()
  );
};

const FormField = ({ label, type, name, icon, defaultValue, readOnly }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        readOnly={readOnly}
        className={`block w-full pl-10 py-2 text-sm rounded-md ${
          readOnly
            ? "bg-gray-50 text-gray-500 border-gray-200"
            : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        }`}
      />
    </div>
  </div>
);

const SelectField = ({ label, name, icon, defaultValue, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <select
        name={name}
        defaultValue={defaultValue}
        className="block w-full pl-10 py-2 text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const DetailSection = ({ title, items }) => (
  <div>
    <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            {item.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {item.value || "Not provided"}
            </p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Address;
