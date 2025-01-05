
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useMeQuery } from "../redux/features/auth/meApi";
import Loading from "./Loading";

const Profile = () => {
  const { data, isLoading, error } = useMeQuery(undefined);

  if (isLoading) {
    return (
      <Loading></Loading>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading profile
      </div>
    );
  }

  const user = data?.data;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        {/* Profile Header */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
              {user?.profileImgSrc ? (
                <img
                  src={user.profileImgSrc}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {user?.name}
              </h1>
              <div className="flex items-center mt-1">
                <span className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded">
                  {user?.role}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Joined {new Date(user?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center text-sm">
              <Mail className="w-4 h-4 text-gray-400 mr-3" />
              <span className="text-gray-600">{user?.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="w-4 h-4 text-gray-400 mr-3" />
              <span className="text-gray-600">
                {user?.phone || "Not provided"}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="w-4 h-4 text-gray-400 mr-3" />
              <span className="text-gray-600">
                {user?.city && user?.country
                  ? `${user.city}, ${user.country}`
                  : "Location not set"}
              </span>
            </div>
          </div>
        </div>

        {/* Basic Stats */}
        <div className="grid grid-cols-3 border-t">
          <div className="p-4 text-center">
            <div className="text-lg font-semibold text-gray-900">
              {user?.Order?.length || 0}
            </div>
            <div className="text-sm text-gray-500">Orders</div>
          </div>
          <div className="p-4 text-center border-l border-r">
            <div className="text-lg font-semibold text-gray-900">
              {user?.Review?.length || 0}
            </div>
            <div className="text-sm text-gray-500">Reviews</div>
          </div>
          <div className="p-4 text-center">
            <div className="text-lg font-semibold text-gray-900">
              {user?.status === "ACTIVE" ? "Active" : "Inactive"}
            </div>
            <div className="text-sm text-gray-500">Status</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
