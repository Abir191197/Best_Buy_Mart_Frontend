import { baseApi } from "../../api/baseApi";

const otpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    otp: builder.mutation({
      query: (otpDetails) => ({
        url: "auth/OtpVerify", // Adjust this URL based on your server's endpoint
        method: "POST",
        body: otpDetails,
      }),
      // Ensure this matches with your caching strategy
    }),
  }),
  overrideExisting: false, // Ensures existing endpoints aren't overridden
});

export default otpApi;
