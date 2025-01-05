import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {  useNavigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";
import otpApi from "../../redux/features/auth/otpApi";
interface OTPFormInputs {
  otp: string;
}

export default function OTPVerification() {
  const location = useLocation();
  const { email } = location.state || {}; // Extract email from state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormInputs>();

  const [otpDetails, { isLoading }] = otpApi.useOtpMutation();
const navigate = useNavigate();
  const handleVerify = async (data: OTPFormInputs) => {
    if (!email) {
      toast.error("Email is missing. Please register again.");
      return;
    }

    const payload = { email, otp: data.otp }; // Combine email and OTP
    console.log(payload);
    try {
      const response = await otpDetails(payload).unwrap();
      toast.success("OTP verified successfully!");
      // Redirect to the user /vendor page page
      const routeRedirect = verifyToken(response.token);
      if (routeRedirect?.role === "USER") {
        navigate("/");
      } else if (routeRedirect?.role === "VENDOR") {
        navigate("/vendor");
      }
      else if (routeRedirect?.role === "ADMIN") {
        navigate("/admin");
      } else {
        toast.error("Invalid user role. Please contact support.");
      }
      
      

    } catch (error: any) {
      toast.error(
        "OTP verification failed: " + (error?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Verify Your OTP
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter the OTP sent to your registered email.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleVerify)}
            className="space-y-6 mt-8">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="otp"
                  {...register("otp", {
                    required: "OTP is required",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "OTP must be a 6-digit number",
                    },
                  })}
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm ${
                    errors.otp
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } text-sm`}
                  placeholder="Enter your 6-digit OTP"
                />
                {errors.otp && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.otp.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
